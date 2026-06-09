import Image from "next/image";
import { PHOTOS, PLAYLISTS } from "@/data/content";
import { projects, experience } from "@/content/work";
import { NowPlaying } from "@/components/now-playing";
import { PhotoGallery } from "@/components/photo-lightbox";
import { SiteHeader } from "@/components/site-header";
import { HoverImage } from "@/components/hover-image";
import { CopyEmail } from "@/components/copy-email";
import { CaseStudyLink } from "@/components/case-study-link";
import { LocalTime } from "@/components/local-time";
import { RailNav } from "@/components/rail-nav";
import { Reveal } from "@/components/reveal";
import { XIcon, GithubIcon, LinkedInIcon, SpotifyIcon, ArrowUpRight } from "@/components/icons";

export default function Home() {
  return (
    <main className="home">
      <div className="home-grid">
        {/* ── Identity rail ── */}
        <aside className="rail">
          <div className="rail-top load-stagger">
            <div className="load-item" style={{ ["--i" as string]: 0 }}>
              <SiteHeader />
            </div>
            <p className="rail-kicker load-item" style={{ ["--i" as string]: 1 }}>
              Software Engineer · Founder · NYC
            </p>
            <div className="load-item" style={{ ["--i" as string]: 2 }}>
              <div className="availability">
                <span className="availability-main">
                  <span className="availability-dot" />
                  Open to new opportunities
                </span>
                <span className="availability-detail">in-person or hybrid in NYC</span>
              </div>
            </div>
          </div>

          <div className="rail-nav-wrap load-item" style={{ ["--i" as string]: 3 }}>
            <RailNav />
          </div>

          <div className="rail-bottom load-item" style={{ ["--i" as string]: 4 }}>
            <div className="rail-socials">
              <a href="https://x.com/chiggyio" target="_blank" rel="noreferrer" className="social-icon" title="X" aria-label="X"><XIcon /></a>
              <a href="https://github.com/chiragchadha1" target="_blank" rel="noreferrer" className="social-icon" title="GitHub" aria-label="GitHub"><GithubIcon /></a>
              <a href="https://linkedin.com/in/chiragkchadha" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn" aria-label="LinkedIn"><LinkedInIcon /></a>
              <span className="rail-divider">/</span>
              <a href="/chirag-chadha-resume.pdf" target="_blank" rel="noreferrer" className="rail-resume">Resume</a>
            </div>
            <div className="rail-time"><LocalTime /></div>
          </div>
        </aside>

        {/* ── Content column ── */}
        <div className="content">
          {/* About */}
          <section id="about" className="content-section">
            <div className="about-hero">
              <div className="about-hero-text load-stagger">
                <h2 className="hero-title load-item" style={{ ["--i" as string]: 1 }}>
                  I build <span className="highlight">developer tools</span> and{" "}
                  <span className="highlight">AI-native products</span>, and I ship them fast.
                </h2>
                <p className="hero-intro load-item" style={{ ["--i" as string]: 2 }}>
                  Software engineer, founder, <HoverImage src="/images/dj-set-solo.webp" alt="Chirag DJing">DJ</HoverImage>, and <HoverImage src="/images/powerlifting-deadlift.webp" alt="Chirag deadlifting">powerlifter</HoverImage> in New York. I&apos;ve been designing and building things since I was 15.
                </p>
                <div className="cta-row load-item" style={{ ["--i" as string]: 3 }}>
                  <CopyEmail email="hi@chiggy.ai" />
                  <span className="text-xs text-[var(--text-muted)]">or</span>
                  <a href="https://x.com/chiggyio" target="_blank" rel="noreferrer" className="cta-secondary">
                    find me on X
                    <ArrowUpRight />
                  </a>
                </div>
              </div>
              <div className="about-hero-portrait load-item" style={{ ["--i" as string]: 2 }}>
                <Image
                  src="/images/santorini-portrait.webp"
                  alt="Chirag Chadha"
                  width={360}
                  height={460}
                  priority
                  className="about-hero-portrait-img"
                />
              </div>
            </div>

            <div className="about-details load-item" style={{ ["--i" as string]: 4 }}>
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
                      <a href={playlist.href} target="_blank" rel="noreferrer" className="inline-link text-[var(--text)]">{playlist.name}</a>
                    </span>
                  ))}{" "}
                  on Spotify.
                  <span className="inline-flex items-center gap-1 ml-1 text-[var(--text-muted)]"><SpotifyIcon /></span>
                </p>
                <NowPlaying />
              </div>
              <p className="bio-line">
                <span className="bio-emoji">&#x1F35C;</span>
                <span>Always hunting for the best <HoverImage src="/images/nyc-burger-egg.webp" alt="NYC restaurant">restaurants</HoverImage> in New York. Right now it&apos;s <HoverImage src="/images/ci-siamo-birthday.webp" alt="Birthday dinner at Ci Siamo">Ci Siamo</HoverImage>. <span className="text-[var(--text-muted)]">(<a href="https://beliapp.com/app/chirag" target="_blank" rel="noreferrer" className="inline-link text-[var(--text-muted)]">@chirag on Beli</a>)</span></span>
              </p>
            </div>
          </section>

          {/* Experience */}
          <Reveal as="section" id="experience" className="content-section">
            <h2 className="section-heading">Experience</h2>
            <div className="rows">
              {experience().map(({ meta }) => (
                <CaseStudyLink key={meta.slug} meta={meta} />
              ))}
            </div>
          </Reveal>

          {/* Projects */}
          <Reveal as="section" id="projects" className="content-section">
            <h2 className="section-heading">Projects</h2>
            <div className="rows">
              {projects().map(({ meta }) => (
                <CaseStudyLink key={meta.slug} meta={meta} />
              ))}
            </div>
          </Reveal>

          {/* Photos */}
          <Reveal as="section" id="photos" className="content-section">
            <h2 className="section-heading">Photos</h2>
            <div className="gallery-wrap">
              <PhotoGallery photos={PHOTOS} />
            </div>
          </Reveal>

          <footer className="content-footer">
            <span>Chirag Chadha</span>
            <span>New York · 2026</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
