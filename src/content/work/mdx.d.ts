declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { CaseStudyMeta } from "@/content/work/types";
  export const meta: CaseStudyMeta;
  const Component: ComponentType;
  export default Component;
}
