import Image from "next/image";
import { PHOTOS, PLAYLISTS } from "@/data/content";
import { projects, experience } from "@/content/work";
import { NowPlaying } from "@/components/now-playing";
import { PhotoGallery } from "@/components/photo-lightbox";
import { SiteHeader } from "@/components/site-header";
import { HoverImage } from "@/components/hover-image";
import { CopyEmail } from "@/components/copy-email";
import { CaseStudyLink } from "@/components/case-study-link";
import { XIcon, GithubIcon, LinkedInIcon, SpotifyIcon, ArrowUpRight } from "@/components/icons";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 md:py-24 text-[15px] leading-relaxed">
      {/* ── Header ── */}
      <header>
        <SiteHeader />

        {/* ── Hero ── */}
        <div className="hero">
          <div className="hero-text">
            <p className="hero-kicker">Software Engineer · Founder · NYC</p>
            <h2 className="hero-title">
              I build <span className="highlight">developer tools</span> and{" "}
              <span className="highlight">AI-native products</span>, and I ship them fast.
            </h2>
            <p className="hero-intro">
              Software engineer, founder, <HoverImage src="/images/dj-set-solo.webp" alt="Chirag DJing">DJ</HoverImage>, and <HoverImage src="/images/powerlifting-deadlift.webp" alt="Chirag deadlifting">powerlifter</HoverImage> in New York. I&apos;ve been designing and building things since I was 15.
            </p>
            <div className="availability">
              <span className="availability-main">
                <span className="availability-dot" />
                Open to new opportunities
              </span>
              <span className="availability-detail">in-person or hybrid in NYC</span>
            </div>
          </div>
          <div className="hero-portrait">
            <Image
              src="/images/santorini-portrait.webp"
              alt="Chirag Chadha"
              width={320}
              height={400}
              priority
              className="hero-portrait-img"
            />
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <p className="bio-line">
            <span className="bio-emoji">&#x1F6E0;&#xFE0F;</span>
            <span>Building developer tools at <a href="https://hubspot.com" target="_blank" rel="noreferrer" className="inline-link text-[var(--text)]">HubSpot</a> that <span className="highlight">4,000+ developers</span> use every week</span>
          </p>
          <p className="bio-line">
            <span className="bio-emoji">&#x1F9E0;</span>
            <span>Creating <span className="highlight">chiggyOS</span>, an AI-native second brain on Obsidian</span>
          </p>
          <p className="bio-line">
            <span className="bio-emoji">&#x1F3B6;</span>
            <span>I love <HoverImage src="/images/concert-blue-lights.webp" alt="Music festival">EDM</HoverImage> and catching shows across the city. <HoverImage src="/images/dj-set-light-trails.webp" alt="DJing">DJing</HoverImage> whenever I get the chance.</span>
          </p>
          <div className="music-block">
            <p className="text-sm text-[var(--text-secondary)] leading-[1.75]">
              Rotating between{" "}
              {PLAYLISTS.map((playlist, i) => (
                <span key={`playlist-${i}`}>
                  {i > 0 && i < PLAYLISTS.length - 1 && ", "}
                  {i === PLAYLISTS.length - 1 && ", and "}
                  <a
                    href={playlist.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-link text-[var(--text)]"
                  >
                    {playlist.name}
                  </a>
                </span>
              ))}{" "}
              on Spotify.
              <span className="inline-flex items-center gap-1 ml-1 text-[var(--text-muted)]">
                <SpotifyIcon />
              </span>
            </p>
            <NowPlaying />
          </div>
          <p className="bio-line">
            <span className="bio-emoji">&#x1F35C;</span>
            <span>Always hunting for the best <HoverImage src="/images/nyc-burger-egg.webp" alt="NYC restaurant">restaurants</HoverImage> in New York. Right now it&apos;s <HoverImage src="/images/ci-siamo-birthday.webp" alt="Birthday dinner at Ci Siamo">Ci Siamo</HoverImage>. <span className="text-[var(--text-muted)]">(<a href="https://beliapp.com/app/chirag" target="_blank" rel="noreferrer" className="inline-link text-[var(--text-muted)]">@chirag on Beli</a>)</span></span>
          </p>
        </div>

        {/* ── CTA ── */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <CopyEmail email="hi@chiggy.ai" />
          <span className="text-xs text-[var(--text-muted)]">or</span>
          <a href="https://x.com/chiggyio" target="_blank" rel="noreferrer" className="cta-secondary">
            find me on X
            <ArrowUpRight />
          </a>
        </div>

        {/* ── Social + Resume ── */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <a href="https://x.com/chiggyio" target="_blank" rel="noreferrer" className="social-icon" title="X" aria-label="X">
              <XIcon />
            </a>
            <a href="https://github.com/chiragchadha1" target="_blank" rel="noreferrer" className="social-icon" title="GitHub" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href="https://linkedin.com/in/chiragkchadha" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
          <span className="text-[var(--divider)]">|</span>
          <a href="/chirag-chadha-resume.pdf" target="_blank" rel="noreferrer" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            Resume
          </a>
        </div>
      </header>

      {/* ── Experience ── */}
      <section className="mt-16">
        <h2 className="section-heading">Experience</h2>
        <div>
          {experience().map(({ meta }) => (
            <CaseStudyLink key={meta.slug} meta={meta} />
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="mt-14">
        <h2 className="section-heading">Projects</h2>
        <div>
          {projects().map(({ meta }) => (
            <CaseStudyLink key={meta.slug} meta={meta} />
          ))}
        </div>
      </section>

      {/* ── Photos ── */}
      <section className="mt-14">
        <h2 className="section-heading">Photos</h2>
      </section>

      <div className="gallery-wrap">
        <PhotoGallery photos={PHOTOS} />
      </div>

      {/* ── Footer ── */}
      <footer className="mt-14 pt-5 border-t border-[var(--divider)] text-xs text-[var(--text-muted)]">
        Chirag Chadha · NYC · 2026
      </footer>
    </main>
  );
}
