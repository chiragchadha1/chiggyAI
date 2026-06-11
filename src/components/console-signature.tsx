"use client";

import { useEffect } from "react";

/** A note for the engineers who open devtools. They always do. */
export function ConsoleSignature() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    console.log(
      "%cchiggy.ai" +
        "%c\n\nHand-built with Next 16, MDX, and native cross-document view transitions." +
        "\nNo template, no cookies, cookieless analytics only." +
        "\nThere is a working terminal here, by the way. Ctrl+` opens it." +
        "\n\nSay hi: hi@chiggy.ai · github.com/chiragchadha1\n",
      "font-size:16px;font-weight:600;",
      "font-size:12px;color:#797368;"
    );
  }, []);
  return null;
}
