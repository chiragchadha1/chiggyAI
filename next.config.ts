import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let .mdx files be pages/imports alongside ts/tsx.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  async redirects() {
    return [
      // 307, not 308, so browsers don't cache it if the Cal.com link changes.
      { source: "/meet", destination: "https://cal.com/chiragchadha/30min", permanent: false },
    ];
  },
};

const withMDX = createMDX({
  // Turbopack requires string-named plugins with serializable options only.
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
