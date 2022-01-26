import { useEffect, useState } from "react";

const DEFAULT_TIMEOUT = 5000;

export default function useCopy(text, timeout = DEFAULT_TIMEOUT) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [text]);

  useEffect(() => {
    const resetCopied = setTimeout(
      () => setCopied(false),
      timeout || DEFAULT_TIMEOUT
    );
    return () => clearTimeout(resetCopied);
  }, [copied]);

  const copy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return { copied, copy };
}
