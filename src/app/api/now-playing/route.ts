const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  return response.json();
}

export const dynamic = "force-dynamic";

export async function GET() {
  if (
    !process.env.SPOTIFY_CLIENT_ID ||
    !process.env.SPOTIFY_CLIENT_SECRET ||
    !process.env.SPOTIFY_REFRESH_TOKEN
  ) {
    return Response.json({ isPlaying: false });
  }

  try {
    const tokenData = await getAccessToken();

    if (!tokenData.access_token) {
      return Response.json({ isPlaying: false });
    }

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (response.status === 204 || response.status > 400) {
      return Response.json({ isPlaying: false });
    }

    const data = await response.json();

    if (data.currently_playing_type !== "track" || !data.item) {
      return Response.json({ isPlaying: false });
    }

    return Response.json({
      isPlaying: data.is_playing === true,
      title: data.item.name,
      artist: data.item.artists
        .map((a: { name: string }) => a.name)
        .join(", "),
      albumArt: data.item.album.images[0]?.url,
      songUrl: data.item.external_urls.spotify,
    });
  } catch {
    return Response.json({ isPlaying: false });
  }
}
