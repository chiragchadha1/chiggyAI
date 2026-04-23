import { LINKS, PROJECTS, EXPERIENCE, PHOTOS, PLAYLISTS } from "@/data/content";
import { NowPlaying } from "@/components/now-playing";
import { PhotoGallery } from "@/components/photo-lightbox";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
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

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 md:py-24 text-[15px] leading-relaxed">
      {/* ── Header ── */}
      <header>
        <h1 className="text-xl font-semibold tracking-tight">
          Chirag Chadha
        </h1>
        <p className="mt-3 text-[var(--text-secondary)] leading-[1.75]">
          Software engineer, founder, DJ, and powerlifter in{" "}
          <span className="text-[var(--text)]">New York</span>. I&apos;ve
          been designing and building things since I was 15. I started with
          graphic and motion design, and over the years it turned into
          production-grade software. I currently work at{" "}
          <a
            href="https://hubspot.com"
            target="_blank"
            rel="noreferrer"
            className="inline-link text-[var(--text)]"
          >
            HubSpot
          </a>{" "}
          on developer tooling during the day. After hours, I&apos;m usually
          building something of my own. I love EDM, pretty much every genre
          from Afrohouse to techno, and I&apos;m always looking to try new
          restaurants around the city{" "}
          <span className="text-[var(--text-muted)]">
            (
            <a
              href="https://beliapp.com"
              target="_blank"
              rel="noreferrer"
              className="inline-link"
            >
              find me on Beli
            </a>
            )
          </span>
          . Currently training for my first powerlifting competition.
        </p>
        <div className="mt-4 flex gap-5 text-sm text-[var(--text-muted)]">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="hover:text-[var(--text)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      {/* ── Building ── */}
      <section className="mt-16">
        <h2 className="section-heading">Building</h2>
        <div>
          {PROJECTS.map((project) => (
            <div key={project.name} className="project-row">
              <h3 className="font-medium text-[15px]">{project.name}</h3>
              <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-[1.7]">
                {project.description}
              </p>
              {project.repos.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
                  {project.repos.map((repo) => (
                    <div
                      key={repo.name}
                      className="flex items-center gap-2 text-xs text-[var(--text-muted)]"
                    >
                      <span className="font-medium text-[var(--text-secondary)]">
                        {repo.name}
                      </span>
                      {repo.npm && (
                        <a
                          href={repo.npm}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[var(--text)] transition-colors"
                          title={`${repo.name} on npm`}
                        >
                          <NpmIcon />
                        </a>
                      )}
                      {repo.github && (
                        <a
                          href={repo.github}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[var(--text)] transition-colors"
                          title={`${repo.name} on GitHub`}
                        >
                          <GithubIcon />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="mt-14">
        <h2 className="section-heading">Experience</h2>
        <div>
          {EXPERIENCE.map((entry, i) => (
            <div key={i} className="exp-row">
              <span className="font-medium w-40 shrink-0 text-sm">
                {entry.org}
              </span>
              <span className="text-[var(--text-secondary)] text-sm flex-1">
                {entry.role}
              </span>
              <span className="text-[var(--text-muted)] text-xs shrink-0">
                {entry.when}
              </span>
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

      {/* ── Into ── */}
      <section className="mt-14">
        <h2 className="section-heading">Into</h2>
        <div className="space-y-4">
          <div>
            <p className="text-[var(--text-secondary)] leading-[1.75]">
              Currently rotating between{" "}
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
          <p className="text-[var(--text-secondary)] leading-[1.75]">
            My current favorite meal in New York is{" "}
            <a
              href="https://www.cisiamonyd.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-link text-[var(--text)]"
            >
              Ci Siamo
            </a>
            . I had my birthday dinner here and absolutely loved the
            ambiance, the red wine, and the pasta. I&apos;ve had plenty of
            mid pasta in this city, and this one really blew me out of the
            water.
          </p>
        </div>
      </section>

      {/* ── Now ── */}
      <section className="mt-14">
        <h2 className="section-heading">Now</h2>
        <p className="text-[var(--text-secondary)] leading-[1.75]">
          Training for my first{" "}
          <a
            href="https://www.usapowerlifting.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-link text-[var(--text)]"
          >
            USAPL
          </a>{" "}
          powerlifting meet on May 31. DJing whenever I have free time{" "}
          <span className="text-[var(--text-muted)]">(rarely)</span>.
          Building{" "}
          <span className="text-[var(--text)]">chiggyOS</span>, an
          AI-native second brain on top of Obsidian. Open to new
          opportunities, ideally in-person or hybrid at a smaller company
          where I can be a multifunctional builder.
        </p>
      </section>

      {/* ── Connect ── */}
      <section className="mt-14">
        <h2 className="section-heading">Connect</h2>
        <p className="text-[var(--text-secondary)] leading-[1.75]">
          Say hi at{" "}
          <a
            href="mailto:hi@chiggy.ai"
            className="inline-link text-[var(--text)]"
          >
            hi@chiggy.ai
          </a>{" "}
          or find me on{" "}
          <a
            href="https://x.com/chiggyio"
            target="_blank"
            rel="noreferrer"
            className="inline-link text-[var(--text)]"
          >
            X
          </a>
          .
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-14 pt-5 border-t border-[var(--divider)] text-xs text-[var(--text-muted)]">
        Chirag Chadha · NYC · 2026
      </footer>
    </main>
  );
}
