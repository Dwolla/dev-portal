import highlightJs from "highlight.js";

import languageJavaScript from "highlight.js/lib/languages/javascript";
import languageRuby from "highlight.js/lib/languages/ruby";
import languagePhp from "highlight.js/lib/languages/php";
import languagePython from "highlight.js/lib/languages/python";
import languageKotlin from "highlight.js/lib/languages/kotlin";
import languageJson from "highlight.js/lib/languages/json";
import languageBash from "highlight.js/lib/languages/bash";
import languagePlaintext from "highlight.js/lib/languages/plaintext";
import languageXml from "highlight.js/lib/languages/xml";
import languageCss from "highlight.js/lib/languages/css";

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
  | "xml"
  | "css";

const registerLanguage = (language: Language | Language[], hljsLanguage: any) =>
  Array.isArray(language)
    ? language.map((lang) => registerLanguage(lang, hljsLanguage))
    : highlightJs.registerLanguage(language, hljsLanguage);

registerLanguage("javascript", languageJavaScript);
registerLanguage("ruby", languageRuby);
registerLanguage("php", languagePhp);
registerLanguage("python", languagePython);
registerLanguage("kotlin", languageKotlin);
registerLanguage("json", languageJson);
registerLanguage(["bash", "raw"], languageBash);
registerLanguage("plaintext", languagePlaintext);
registerLanguage(["html", "xml"], languageXml);
registerLanguage("css", languageCss);

export default function highlight(code: string, language: string) {
  return highlightJs.highlight(code, { language: language || "plaintext" })
    .value;
}
