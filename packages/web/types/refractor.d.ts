declare module "hast-to-hyperscript";
declare module "rehype";
declare module "refractor/core.js" {
  import PrismLib from "prismjs";

  interface Properties {
    [k: string]: string | string[] | number | boolean;
  }
  export interface HastNode {
    type: "element" | "text";
    tagName?: string;
    properties?: Properties;
    children?: HastNode[];
    value?: string;
  }

  export function highlight(
    value: string,
    name: string | PrismLib.LanguageDefinition
  ): HastNode[];

  export function register(grammar: PrismLib.LanguageDefinition): void;

  export function registered(language: string): boolean;
}
