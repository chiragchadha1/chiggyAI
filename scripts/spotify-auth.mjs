#!/usr/bin/env node
/**
 * One-shot helper to mint the SPOTIFY_REFRESH_TOKEN the now-playing API needs.
 *
 * 1. Create an app at https://developer.spotify.com/dashboard
 *    and add http://127.0.0.1:8888/callback as a Redirect URI.
 * 2. Run: SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-auth.mjs
 * 3. Approve in the browser. The script prints the .env.local lines to copy.
 *    Add the same three vars to Vercel project env for production.
 */
import { createServer } from "node:http";
import { exec } from "node:child_process";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT = "http://127.0.0.1:8888/callback";
const SCOPE = "user-read-currently-playing";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars first.");
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT,
  });

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://127.0.0.1:8888");
  if (url.pathname !== "/callback") return res.end();
  const code = url.searchParams.get("code");
  if (!code) {
    res.end("No code in callback. Check the dashboard redirect URI.");
    return;
  }
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT,
    }),
  });
  const data = await tokenRes.json();
  if (!data.refresh_token) {
    res.end("Token exchange failed: " + JSON.stringify(data));
    console.error(data);
    process.exit(1);
  }
  res.end("Done. Go back to the terminal.");
  console.log("\nAdd these to .env.local (and to Vercel env for production):\n");
  console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
  console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
  server.close();
  process.exit(0);
});

server.listen(8888, () => {
  console.log("Opening Spotify consent page…");
  exec(`open "${authUrl}"`);
});
