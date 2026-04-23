import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    if (!clientId) {
      return new Response("Set SPOTIFY_CLIENT_ID in .env.local first", {
        status: 400,
      });
    }

    const redirectUri = `${request.nextUrl.origin}/api/spotify-callback`;
    const scope = "user-read-currently-playing";
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", scope);

    return Response.redirect(authUrl.toString());
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const redirectUri = `${request.nextUrl.origin}/api/spotify-callback`;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await tokenResponse.json();

  if (data.error) {
    return new Response(
      `Error: ${data.error}\n${data.error_description}\n\nTry again: ${request.nextUrl.origin}/api/spotify-callback`,
      { status: 400, headers: { "Content-Type": "text/plain" } }
    );
  }

  return new Response(
    [
      "Success! Add this to your .env.local:\n",
      `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`,
      "\n\nThen restart your dev server (Ctrl+C, npm run dev).",
      "\n\nYou can delete this route after setup.",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
}
