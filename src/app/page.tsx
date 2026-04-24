import { PROJECTS, EXPERIENCE, PHOTOS, PLAYLISTS } from "@/data/content";
import { NowPlaying } from "@/components/now-playing";
import { PhotoGallery } from "@/components/photo-lightbox";
import { Logo } from "@/components/logo";
import { HoverImage } from "@/components/hover-image";
import { CopyEmail } from "@/components/copy-email";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function NpmIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323h13.837v13.548H12.06v-10.5h-3.5v10.5H5.13z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function GithubIconSmall() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function NpmIconSmall() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323h13.837v13.548H12.06v-10.5h-3.5v10.5H5.13z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 15 15" fill="none" className="w-3 h-3" aria-hidden="true">
      <path d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      <path d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      <path d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998C11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998ZM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.7528C5.46186 3.17323 4.69969 5.32389 4.69969 7.5C4.69969 9.67611 5.46186 11.8268 6.94177 13.2472L6.45768 13.7528C4.80786 12.1732 3.99969 9.82389 3.99969 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 15 15" fill="none" className="w-3 h-3" aria-hidden="true">
      <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9L11 4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

function RepoLinks({ repos }: { repos: import("@/data/content").RepoLink[] }) {
  if (repos.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {repos.map((repo) => (
        <span key={repo.name} className="repo-group">
          {repo.github && (
            <a href={repo.github} target="_blank" rel="noreferrer" className="repo-link">
              <GithubIconSmall />
              {repo.name}
              <ArrowUpRight />
            </a>
          )}
          {repo.npm && (
            <a href={repo.npm} target="_blank" rel="noreferrer" className="repo-link">
              <NpmIconSmall />
              {repo.name}
              <ArrowUpRight />
            </a>
          )}
          {repo.link && (
            <a href={repo.link} target="_blank" rel="noreferrer" className="repo-link">
              <GlobeIcon />
              {repo.name}
              <ArrowUpRight />
            </a>
          )}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 md:py-24 text-[15px] leading-relaxed">
      {/* ── Header ── */}
      <header>
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-semibold tracking-tight">
            Chirag Chadha
          </h1>
        </div>

        <div className="availability">
          <span className="availability-main">
            <span className="availability-dot" />
            Open to new opportunities
          </span>
          <span className="availability-detail">in-person or hybrid in NYC</span>
        </div>

        <p className="mt-4 text-[var(--text-secondary)] leading-[1.75]">
          Software engineer, founder, <HoverImage src="/images/dj-set-solo.webp" alt="Chirag DJing">DJ</HoverImage>, and <HoverImage src="/images/powerlifting-deadlift.webp" alt="Chirag deadlifting">powerlifter</HoverImage> in <span className="highlight">New York</span>. I&apos;ve been designing and building things since I was 15.
        </p>

        <div className="mt-5 space-y-2">
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
          {EXPERIENCE.map((entry) => (
            <div key={`${entry.org}-${entry.when}`} className="project-row">
              <div className="flex items-baseline gap-2.5">
                <h3 className="project-name">{entry.org}</h3>
                {entry.status && (
                  <span className={`project-badge project-badge-${entry.status}`}>
                    {entry.status}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-[var(--text-muted)] font-mono tracking-tight">
                {entry.role} · {entry.when}
              </p>
              <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-[1.7]">
                {entry.description}
              </p>
              <RepoLinks repos={entry.repos} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="mt-14">
        <h2 className="section-heading">Projects</h2>
        <div>
          {PROJECTS.map((project) => (
            <div key={project.name} className="project-row">
              <div className="flex items-baseline gap-2.5">
                <h3 className="project-name">{project.name}</h3>
                {project.status && (
                  <span className={`project-badge project-badge-${project.status}`}>
                    {project.status}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-[1.7]">
                {project.description}
              </p>
              <RepoLinks repos={project.repos} />
            </div>
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
