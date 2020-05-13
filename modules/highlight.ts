import hljs from "highlight.js/lib/core";

hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript")
);

hljs.registerLanguage("ruby", require("highlight.js/lib/languages/ruby"));

hljs.registerLanguage("php", require("highlight.js/lib/languages/php"));

hljs.registerLanguage("python", require("highlight.js/lib/languages/python"));

hljs.registerLanguage("json", require("highlight.js/lib/languages/json"));

hljs.registerLanguage("bash", require("highlight.js/lib/languages/bash"));

hljs.registerLanguage(
  "plaintext",
  require("highlight.js/lib/languages/plaintext")
);

export default function highlight(code: string, language: string) {
  return hljs.highlight(language, code).value;
}
