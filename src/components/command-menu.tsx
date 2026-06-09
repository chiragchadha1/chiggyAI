import { projects, experience } from "@/content/work";
import { CommandPalette, type CommandItem } from "@/components/command-palette";

const EMAIL = "hi@chiggy.ai";

/** Server wrapper: assembles command items from the content layer + static links. */
export function CommandMenu() {
  const items: CommandItem[] = [
    { id: "home", label: "Home", group: "Pages", href: "/", keywords: "start index" },
    ...experience().map(({ meta }) => ({
      id: `exp-${meta.slug}`,
      label: meta.title,
      hint: meta.role ?? meta.org,
      group: "Experience",
      href: `/work/${meta.slug}`,
      keywords: `${meta.tagline} ${meta.stack?.join(" ") ?? ""}`,
    })),
    ...projects().map(({ meta }) => ({
      id: `proj-${meta.slug}`,
      label: meta.title,
      hint: meta.role,
      group: "Projects",
      href: `/work/${meta.slug}`,
      keywords: `${meta.tagline} ${meta.stack?.join(" ") ?? ""}`,
    })),
    { id: "email", label: "Copy email", hint: EMAIL, group: "Actions", action: "copy-email", keywords: "contact reach" },
    { id: "resume", label: "Resume", group: "Actions", href: "/chirag-chadha-resume.pdf", external: true, keywords: "cv pdf" },
    { id: "x", label: "X / Twitter", group: "Connect", href: "https://x.com/chiggyio", external: true, keywords: "twitter social" },
    { id: "github", label: "GitHub", group: "Connect", href: "https://github.com/chiragchadha1", external: true, keywords: "code repos" },
    { id: "linkedin", label: "LinkedIn", group: "Connect", href: "https://linkedin.com/in/chiragkchadha", external: true, keywords: "social professional" },
  ];

  return <CommandPalette items={items} email={EMAIL} />;
}
