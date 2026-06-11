import Image from "next/image";

/**
 * Media slot for case studies. Renders an image or autoplaying muted video when `src`
 * is provided, otherwise a tasteful placeholder so the layout reads as intentional
 * before real screenshots/recordings are dropped in. When `href` is set, the media
 * and caption link out to the live site.
 */
export function Figure({
  src,
  alt = "",
  caption,
  href,
  video = false,
  width = 1280,
  height = 800,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  /** Live-site URL: makes the media and caption clickable. */
  href?: string;
  video?: boolean;
  width?: number;
  height?: number;
}) {
  const media = src ? (
    video ? (
      <video
        className="cs-figure-media"
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <Image
        className="cs-figure-media"
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    )
  ) : (
    <div className="cs-figure-placeholder" aria-hidden="true">
      <span>{alt || "screenshot coming soon"}</span>
    </div>
  );

  return (
    <figure className="cs-figure">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="cs-figure-link"
          aria-label={`Visit ${caption ?? href} (opens in a new tab)`}
        >
          {media}
        </a>
      ) : (
        media
      )}
      {caption && (
        <figcaption className="cs-figure-caption">
          {href ? (
            <a href={href} target="_blank" rel="noreferrer" className="cs-figure-caption-link">
              {caption}
              <span aria-hidden="true"> &#8599;</span>
            </a>
          ) : (
            caption
          )}
        </figcaption>
      )}
    </figure>
  );
}
