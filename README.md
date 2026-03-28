# Feel Special - Personalized Greeting Card Generator ✨

A beautiful Next.js web application that creates personalized, heartfelt greeting messages for users. Enter your name and receive a unique, sincere greeting designed to make you feel special.

## Features

- 🎨 **Dynamic Greeting Generation**: Personalized messages for each user
- 💬 **Interactive Review System**: Share your experience and feedback
- ✨ **Beautiful Animations**: Smooth transitions powered by Framer Motion
- 🎯 **Modern UI**: Clean, responsive design with Tailwind CSS
- 💾 **Supabase Integration**: Persistent data storage for greetings and reviews

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase
- **UI Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd fell-special
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase database:
   - Run `supabase-setup.sql` in your Supabase SQL editor
   - Run `supabase-add-review-choice.sql` to add review functionality

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

This app is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

## Project Structure

```
fell-special/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions and database logic
├── scripts/         # Helper scripts
└── public/          # Static assets
```

## License

MIT

## Author

Built with 💖
