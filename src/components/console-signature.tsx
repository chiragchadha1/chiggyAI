"use client";

import { useEffect } from "react";

/** A note for the engineers who open devtools. They always do. */
export function ConsoleSignature() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    console.log(
      "%cchiggy.ai" +
        "%c\n\nHand-built with Next 16, MDX, and native cross-document view transitions." +
        "\nNo template. No tracker. The homepage has a working terminal, by the way." +
        "\n\nSay hi: hi@chiggy.ai · github.com/chiragchadha1\n",
      "font-size:16px;font-weight:600;",
      "font-size:12px;color:#797368;"
    );
  }, []);
  return null;
}
