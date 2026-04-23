# chiggy.ai

My personal website. Built with Next.js, Tailwind CSS, and deployed on Vercel.

**Live at [chiggy.ai](https://chiggy.ai)**

## Features

- Hover-to-reveal images on desktop, tap-to-reveal on mobile
- Spotify "Now Playing" integration via the Spotify API
- Bento photo gallery with lightbox and 3D tilt on hover
- Animated CC monogram logo
- SEO with JSON-LD structured data

## Setup

```bash
npm install
cp .env.local.example .env.local
# Fill in Spotify credentials (see .env.local.example for instructions)
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Stack

- [Next.js](https://nextjs.org) 16
- [Tailwind CSS](https://tailwindcss.com) v4
- [Vercel](https://vercel.com) for hosting
- [Spotify Web API](https://developer.spotify.com/documentation/web-api) for now playing
