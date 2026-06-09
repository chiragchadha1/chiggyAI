import { codeToHtml } from "shiki";

/**
 * Build-time syntax highlighting via Shiki. Server component, zero runtime JS.
 * Usage in MDX: <Code lang="ts" file="absorb.ts">{`...code...`}</Code>
 */
export async function Code({
  children,
  lang = "ts",
  file,
}: {
  children: string;
  lang?: string;
  file?: string;
}) {
  const html = await codeToHtml(children.trim(), {
    lang,
    theme: "github-light",
  });

  return (
    <figure className="cs-code">
      {file && <figcaption className="cs-code-file">{file}</figcaption>}
      <div className="cs-code-body" dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
