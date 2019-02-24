declare module "hast-to-hyperscript";
declare module "rehype";
declare module "refractor/core.js" {
  import PrismLib from "prismjs";

  export type HastNode = {
    type: "element" | "text";
    tagName?: string;
    properties?: any;
    children?: Array<HastNode>;
    value?: string;
  };

  export function highlight(
    value: string,
    name: string | PrismLib.LanguageDefinition
  ): Array<HastNode>;

  export function register(grammar: PrismLib.LanguageDefinition): void;

  export function registered(language: string): boolean;
}
