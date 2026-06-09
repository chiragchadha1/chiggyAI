import Image from "next/image";

/**
 * Media slot for case studies. Renders an image or autoplaying muted video when `src`
 * is provided, otherwise a tasteful placeholder so the layout reads as intentional
 * before real screenshots/recordings are dropped in.
 */
export function Figure({
  src,
  alt = "",
  caption,
  video = false,
  width = 1280,
  height = 800,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  video?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="cs-figure">
      {src ? (
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
      )}
      {caption && <figcaption className="cs-figure-caption">{caption}</figcaption>}
    </figure>
  );
}
