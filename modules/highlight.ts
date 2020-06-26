import hljs from "highlight.js/lib/core";

export type Language =
  | "javascript"
  | "ruby"
  | "php"
  | "python"
  | "json"
  | "bash"
  | "raw"
  | "plaintext"
  | "html"
  | "kotlin"
  | "csharp"
  | "xml";

const registerLanguage = (language: Language, hljsLanguage: any) =>
  hljs.registerLanguage(language, hljsLanguage);

registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript")
);

registerLanguage("ruby", require("highlight.js/lib/languages/ruby"));

registerLanguage("php", require("highlight.js/lib/languages/php"));

registerLanguage("python", require("highlight.js/lib/languages/python"));

registerLanguage("kotlin", require("highlight.js/lib/languages/kotlin"));

registerLanguage("csharp", require("highlight.js/lib/languages/csharp"));

registerLanguage("json", require("highlight.js/lib/languages/json"));

registerLanguage("bash", require("highlight.js/lib/languages/bash"));

registerLanguage("raw", require("highlight.js/lib/languages/bash"));

registerLanguage("plaintext", require("highlight.js/lib/languages/plaintext"));

registerLanguage("html", require("highlight.js/lib/languages/xml"));

registerLanguage("xml", require("highlight.js/lib/languages/xml"));

hljs.registerLanguage("css", require("highlight.js/lib/languages/css"));

export default function highlight(code: string, language: string) {
  return hljs.highlight(language || "plaintext", code).value;
}
