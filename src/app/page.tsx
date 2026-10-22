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
import { TerminalLauncher } from "@/components/terminal";
import { XIcon, GithubIcon, LinkedInIcon, SpotifyIcon, ArrowUpRight } from "@/components/icons";

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://chiggy.ai/#profile",
  url: "https://chiggy.ai",
  name: "Chirag Chadha",
  mainEntity: { "@id": "https://chiggy.ai/#person" },
  isPartOf: { "@id": "https://chiggy.ai/#website" },
};

export default function Home() {
  return (
    <main className="home" id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <div className="home-grid">
        {/* ── Identity rail ── */}
        <aside className="rail">
          <div className="rail-top load-stagger">
            <div className="load-item" style={{ ["--i" as string]: 0 }}>
              <SiteHeader />
            </div>
            <p className="rail-kicker load-item" style={{ ["--i" as string]: 1 }}>
              Spur · New York
            </p>
          </div>

          <div className="rail-nav-wrap load-item" style={{ ["--i" as string]: 2 }}>
            <RailNav />
          </div>

          <nav className="mobile-jump-nav load-item" aria-label="Sections" style={{ ["--i" as string]: 2 }}>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#photos">Photos</a>
          </nav>

          <div className="rail-bottom load-item" style={{ ["--i" as string]: 3 }}>
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
                  I design and build <span className="highlight">developer tools</span>,{" "}
                  <span className="highlight">AI agents</span>, and whatever I can&apos;t stop thinking about.
                </h2>
                <p className="hero-intro load-item" style={{ ["--i" as string]: 2 }}>
                  I&apos;ve been building things since I was 15. Founding engineer, <HoverImage src="/images/powerlifting-deadlift.webp" alt="Chirag deadlifting">powerlifter</HoverImage>, and <HoverImage src="/images/dj-set-solo.webp" alt="Chirag DJing">DJ</HoverImage>{" "}in New York.
                </p>
                <div className="cta-row load-item" style={{ ["--i" as string]: 3 }}>
                  <CopyEmail email="hi@chiggy.ai" />
                  <span className="rail-divider" aria-hidden="true">/</span>
                  <a href="/meet" target="_blank" rel="noreferrer" className="cta-secondary">
                    meet with me
                    <ArrowUpRight />
                  </a>
                  <span className="rail-divider" aria-hidden="true">/</span>
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
                <span className="bio-emoji">&#x1F680;</span>
                <span>Founding engineer at <a href="https://spurtest.com" target="_blank" rel="noreferrer" className="inline-link text-[var(--text)]">Spur</a>, building <span className="highlight">autonomous browser agents</span> that test websites like real users</span>
              </p>
              <p className="bio-line">
                <span className="bio-emoji">&#x1F6E0;&#xFE0F;</span>
                <span>Previously built CLI tools, MCP servers, and agent infrastructure at <a href="https://hubspot.com" target="_blank" rel="noreferrer" className="inline-link text-[var(--text)]">HubSpot</a>, used by <span className="highlight">4,000+ developers</span> every week</span>
              </p>
              <p className="bio-line">
                <span className="bio-emoji">&#x1F9E0;</span>
                <span>Building <span className="highlight">chiggyOS</span>, a personal operating system where my notes, projects, and daily life feed into an AI agent that actually knows my context</span>
              </p>
              <p className="bio-line">
                <span className="bio-emoji">&#x1F3CB;&#xFE0F;</span>
                <span>Preparing for my second <span className="highlight">powerlifting competition</span></span>
              </p>
              <p className="bio-line">
                <span className="bio-emoji">&#x1F3B6;</span>
                <span>I <HoverImage src="/images/dj-set-light-trails.webp" alt="DJing">DJ</HoverImage> and go to a lot of <HoverImage src="/images/concert-blue-lights.webp" alt="Music festival">shows</HoverImage>. My favorites this year have been Fred again... and Prospa. Also went to <span className="highlight">Ultra Miami</span> for the first time.</span>
              </p>
              <div className="music-block">
                <p className="text-sm text-[var(--text-secondary)] leading-[1.75]">
                  I&apos;m rotating between{" "}
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
                <span>I&apos;m always looking for the best <HoverImage src="/images/nyc-burger-egg.webp" alt="NYC restaurant">restaurants</HoverImage> in New York. Right now it&apos;s <HoverImage src="/images/ci-siamo-birthday.webp" alt="Birthday dinner at Ci Siamo">Ci Siamo</HoverImage>. <span className="text-[var(--text-muted)]">(<a href="https://beliapp.com/app/chirag" target="_blank" rel="noreferrer" className="inline-link text-[var(--text-muted)]">@chirag on Beli</a>)</span></span>
              </p>
            </div>

            <Reveal>
              <TerminalLauncher />
            </Reveal>
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
