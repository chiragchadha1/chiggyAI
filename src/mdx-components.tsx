import type { MDXComponents } from "mdx/types";
import { Code } from "@/components/case-study/code";
import { Diagram } from "@/components/case-study/diagram";
import { Figure } from "@/components/case-study/figure";
import { Callout } from "@/components/case-study/callout";

const components: MDXComponents = {
  h2: ({ children }) => <h2 className="cs-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="cs-h3">{children}</h3>,
  p: ({ children }) => <p className="cs-p">{children}</p>,
  ul: ({ children }) => <ul className="cs-ul">{children}</ul>,
  ol: ({ children }) => <ol className="cs-ol">{children}</ol>,
  li: ({ children }) => <li className="cs-li">{children}</li>,
  blockquote: ({ children }) => <blockquote className="cs-quote">{children}</blockquote>,
  strong: ({ children }) => <strong className="cs-strong">{children}</strong>,
  a: ({ href, children }) => {
    const external = !!href && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="inline-link"
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  // Custom components available in every .mdx case study:
  Code,
  Diagram,
  Figure,
  Callout,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
