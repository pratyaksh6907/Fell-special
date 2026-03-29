"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
};

type Bloom = {
  position: [number, number, number];
  color: string;
  scale: number;
};

const BLOOMS: Bloom[] = [
  { position: [0, 0.75, 0.1], color: "#f36fa2", scale: 0.36 },
  { position: [-0.5, 0.52, 0.08], color: "#f5ad7c", scale: 0.31 },
  { position: [0.52, 0.54, 0.05], color: "#ff9a67", scale: 0.29 },
  { position: [-0.28, 0.2, 0.14], color: "#f89bc3", scale: 0.22 },
  { position: [0.3, 0.18, 0.12], color: "#cfb6f8", scale: 0.18 },
  { position: [0.08, 0.36, 0.18], color: "#ffe5f1", scale: 0.19 },
];

function BouquetModel() {
  const groupRef = useRef<THREE.Group>(null);

  const petals = useMemo(
    () =>
      Array.from({ length: 28 }, (_, idx) => ({
        x: Math.cos((idx / 28) * Math.PI * 2) * 0.14,
        y: Math.sin((idx / 28) * Math.PI * 2) * 0.14,
        z: ((idx % 5) - 2) * 0.015,
      })),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const targetX = state.pointer.y * 0.35;
    const targetY = state.pointer.x * 0.5;

    if (!groupRef.current) return;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.08
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.08
    );
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, -0.35, 0]}>
      <mesh position={[0, -0.95, -0.15]} rotation={[-0.25, 0, 0]}>
        <circleGeometry args={[0.95, 48]} />
        <meshStandardMaterial color="#4f845e" transparent opacity={0.18} />
      </mesh>

      <mesh position={[0, -0.58, 0]}>
        <coneGeometry args={[0.58, 1.1, 5, 1, true]} />
        <meshStandardMaterial color="#f5ece3" roughness={0.92} metalness={0.04} />
      </mesh>

      <mesh position={[0, -0.73, 0.22]} rotation={[0.08, 0, 0]}>
        <torusGeometry args={[0.24, 0.03, 16, 48]} />
        <meshStandardMaterial color="#e57aaa" roughness={0.36} metalness={0.24} />
      </mesh>

      <group>
        {[-0.13, -0.04, 0.05, 0.15].map((x, idx) => (
          <mesh key={`stem-${idx}`} position={[x, -0.3 + idx * 0.06, -0.02]} rotation={[0.12, x * 1.3, 0]}>
            <cylinderGeometry args={[0.018, 0.022, 1.12, 12]} />
            <meshStandardMaterial color="#4f845e" roughness={0.78} />
          </mesh>
        ))}
      </group>

      {BLOOMS.map((bloom, bloomIdx) => (
        <group key={`bloom-${bloomIdx}`} position={bloom.position} scale={bloom.scale}>
          {petals.map((petal, idx) => (
            <mesh key={`petal-${bloomIdx}-${idx}`} position={[petal.x, petal.y, petal.z]} rotation={[0, 0, (idx / petals.length) * Math.PI * 2]}>
              <sphereGeometry args={[0.085, 16, 16]} />
              <meshStandardMaterial color={bloom.color} roughness={0.4} metalness={0.12} />
            </mesh>
          ))}
          <mesh>
            <sphereGeometry args={[0.09, 20, 20]} />
            <meshStandardMaterial color="#ffeabf" roughness={0.38} metalness={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function Bouquet3DScene({ className }: Props) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0.2, 2.75], fov: 43 }} dpr={[1, 2]}>
        <ambientLight intensity={0.9} color="#ffe9f3" />
        <directionalLight position={[2.5, 3.2, 2.5]} intensity={1.35} color="#fff1df" />
        <directionalLight position={[-2, 1.5, -2]} intensity={0.45} color="#d4f0dc" />
        <BouquetModel />
      </Canvas>
    </div>
  );
}
