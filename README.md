# chiggy.ai

My personal website. Built with Next.js, Tailwind CSS, and deployed on Vercel.

**Live at [chiggy.ai](https://chiggy.ai)**

## Features

- Hover-to-reveal images on desktop, tap-to-reveal on mobile
- Spotify "Now Playing" integration via the Spotify Web API
- Bento photo gallery with lightbox and 3D tilt on hover
- Animated CC monogram logo
- Click-to-copy email with toast confirmation
- Responsive availability badge
- External link arrows
- Custom 404 with redirect home
- SEO with JSON-LD structured data

## Setup

```bash
bun install
bun dev
```

Open [localhost:3000](http://localhost:3000).

For the Spotify "Now Playing" widget, set the following in `.env.local`:

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

Without these the widget silently no-ops.

## Stack

- [Next.js](https://nextjs.org) 16
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) v4
- [Vercel](https://vercel.com) for hosting
- [Spotify Web API](https://developer.spotify.com/documentation/web-api) for now playing
