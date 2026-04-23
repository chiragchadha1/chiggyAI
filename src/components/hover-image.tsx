"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export function HoverImage({
  children,
  src,
  alt = "",
}: {
  children: React.ReactNode;
  src: string;
  alt?: string;
}) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch || !imgRef.current) return;
      const imgH = 280;
      const spaceAbove = e.clientY;
      const showBelow = spaceAbove < imgH + 20;

      imgRef.current.style.left = `${e.clientX}px`;
      imgRef.current.style.top = showBelow
        ? `${e.clientY + 24}px`
        : `${e.clientY - imgH - 16}px`;
    },
    [isTouch]
  );

  const handleClick = useCallback(() => {
    if (isTouch) setVisible((v) => !v);
  }, [isTouch]);

  useEffect(() => {
    if (!visible || !isTouch) return;

    function close() {
      setVisible(false);
    }

    const timer = setTimeout(() => {
      document.addEventListener("touchstart", close, { once: true });
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("touchstart", close);
    };
  }, [visible, isTouch]);

  return (
    <span
      className="hover-reveal"
      onMouseEnter={() => !isTouch && setVisible(true)}
      onMouseLeave={() => !isTouch && setVisible(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {children}
      {visible && !isTouch && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="hover-reveal-img"
        />
      )}
      {visible && isTouch && (
        <div
          className="hover-reveal-backdrop"
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
          }}
        >
          <img src={src} alt={alt} className="hover-reveal-img-touch" />
        </div>
      )}
    </span>
  );
}
