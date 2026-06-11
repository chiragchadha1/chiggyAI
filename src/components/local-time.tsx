"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 15000);
  return () => clearInterval(id);
};

const formatNow = () =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

/** Live New York local time, editorial footer detail. Renders the label until mounted. */
export function LocalTime() {
  const time = useSyncExternalStore(
    subscribe,
    formatNow,
    () => null
  );

  return (
    <span className="local-time">
      New York
      {time && (
        <>
          {" "}
          <span className="local-time-dot" />
          <span className="local-time-clock">{time} ET</span>
        </>
      )}
    </span>
  );
}
