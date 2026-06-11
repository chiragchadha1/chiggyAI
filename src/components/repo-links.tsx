import type { RepoLink } from "@/data/content";
import { GithubIconSmall, NpmIconSmall, GlobeIcon, ArrowUpRight } from "@/components/icons";

export function RepoLinks({ repos }: { repos: RepoLink[] }) {
  if (repos.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
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
