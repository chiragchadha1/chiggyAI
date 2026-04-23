"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { Photo } from "@/data/content";

function GalleryItem({
  photo,
  index,
  onClick,
}: {
  photo: Photo;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) scale(1.02)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }

  const sizeClass =
    photo.size === "wide"
      ? " gallery-wide"
      : photo.size === "tall"
        ? " gallery-tall"
        : "";

  return (
    <button
      ref={ref}
      type="button"
      className={`gallery-item${sizeClass}${visible ? " gallery-item-visible" : ""}`}
      style={{ transitionDelay: `${(index % 6) * 80}ms` }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={`/images/${photo.src}`}
        alt={photo.alt}
        fill
        sizes={
          photo.size === "wide"
            ? "(max-width: 768px) 100vw, 640px"
            : "(max-width: 768px) 50vw, 320px"
        }
        quality={75}
        {...(index === 0 ? { priority: true, loading: "eager" as const } : {})}
      />
    </button>
  );
}

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [fadeKey, setFadeKey] = useState(0);
  const touchStartX = useRef(0);

  const close = useCallback(() => setActiveIndex(null), []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i !== null ? (i + 1) % photos.length : null));
    setFadeKey((k) => k + 1);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) =>
      i !== null ? (i - 1 + photos.length) % photos.length : null
    );
    setFadeKey((k) => k + 1);
  }, [photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, goNext, goPrev]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  }

  const prevIndex =
    activeIndex !== null
      ? (activeIndex - 1 + photos.length) % photos.length
      : null;
  const nextIndex =
    activeIndex !== null ? (activeIndex + 1) % photos.length : null;

  return (
    <>
      <div className="gallery">
        {photos.map((photo, i) => (
          <GalleryItem
            key={`photo-${i}`}
            photo={photo}
            index={i}
            onClick={() => {
              setActiveIndex(i);
              setFadeKey((k) => k + 1);
            }}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            key={fadeKey}
            className="lightbox-content lightbox-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/images/${photos[activeIndex].src}`}
              alt={photos[activeIndex].alt}
              fill
              sizes="90vw"
              quality={75}
              priority
              style={{ objectFit: "contain" }}
            />
          </div>

          {prevIndex !== null && (
            <div className="lightbox-preload">
              <Image
                src={`/images/${photos[prevIndex].src}`}
                alt=""
                fill
                sizes="90vw"
                quality={75}
              />
            </div>
          )}
          {nextIndex !== null && (
            <div className="lightbox-preload">
              <Image
                src={`/images/${photos[nextIndex].src}`}
                alt=""
                fill
                sizes="90vw"
                quality={75}
              />
            </div>
          )}

          <div className="lightbox-counter">
            {activeIndex + 1} / {photos.length}
          </div>

          <button
            type="button"
            className="lightbox-close"
            onClick={close}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>

          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
