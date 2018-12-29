import * as Prism from "prismjs";
const langDepMap: { [key: string]: string | string[] } = {
  javascript: "clike",
  actionscript: "javascript",
  arduino: "cpp",
  aspnet: ["markup", "csharp"],
  bison: "c",
  c: "clike",
  csharp: "clike",
  cpp: "c",
  coffeescript: "javascript",
  crystal: "ruby",
  "css-extras": "css",
  d: "clike",
  dart: "clike",
  django: "markup",
  erb: ["ruby", "markup-templating"],
  fsharp: "clike",
  flow: "javascript",
  glsl: "clike",
  go: "clike",
  groovy: "clike",
  haml: "ruby",
  handlebars: "markup-templating",
  haxe: "clike",
  java: "clike",
  jolie: "clike",
  kotlin: "clike",
  less: "css",
  markdown: "markup",
  "markup-templating": "markup",
  n4js: "javascript",
  nginx: "clike",
  objectivec: "c",
  opencl: "cpp",
  parser: "markup",
  php: ["clike", "markup-templating"],
  "php-extras": "php",
  plsql: "sql",
  processing: "clike",
  protobuf: "clike",
  pug: "javascript",
  qore: "clike",
  jsx: ["markup", "javascript"],
  tsx: ["jsx", "typescript"],
  reason: "clike",
  ruby: "clike",
  sass: "css",
  scss: "css",
  scala: "java",
  smarty: "markup-templating",
  soy: "markup-templating",
  swift: "clike",
  tap: "yaml",
  textile: "markup",
  tt2: ["clike", "markup-templating"],
  twig: "markup",
  typescript: "javascript",
  vbnet: "basic",
  velocity: "markup",
  wiki: "markup",
  xeora: "markup",
  xquery: "markup",
};

export const loadLanguage = async (lang: string) => {
  const deps = langDepMap[lang];
  if (deps) {
    if (typeof deps === "string") {
      await loadLanguage(deps);
    } else {
      await Promise.all(deps.map(loadLanguage));
    }
  }

  if (lang in Prism.languages) {
    return null;
  }

  return import(`prismjs/components/prism-${lang}`);
};
