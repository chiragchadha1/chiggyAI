"use client";

import { useEffect, useState } from "react";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
  albumArt?: string;
}

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchNowPlaying() {
      try {
        const res = await fetch("/api/now-playing");
        const json = await res.json();
        if (active) setData(json);
      } catch {
        if (active) setData(null);
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  if (!data?.title) return null;

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noreferrer"
      className="now-playing"
    >
      {data.albumArt && (
        <img
          src={data.albumArt}
          alt=""
          width={32}
          height={32}
          className="now-playing-art"
        />
      )}
      <span className="now-playing-text">
        {data.isPlaying ? (
          <span className="now-playing-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        ) : (
          <span className="now-playing-paused" aria-hidden="true">♫</span>
        )}
        {data.title} — {data.artist}
      </span>
    </a>
  );
}
