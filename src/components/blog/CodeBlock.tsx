"use client";

import Prism from "prismjs";
import { useEffect, useMemo, useRef } from "react";

import styles from "./CodeBlock.module.css";

type SupportedLanguage =
  | "text"
  | "bash"
  | "css"
  | "markup"
  | "javascript"
  | "json"
  | "jsx"
  | "typescript"
  | "tsx";

export type CodeBlockProps = {
  code: string;
  language?: SupportedLanguage | string;
  filename?: string;
};

function normalizeLanguage(lang?: string): SupportedLanguage {
  switch ((lang || "").toLowerCase()) {
    case "bash":
    case "sh":
    case "shell":
      return "bash";
    case "css":
      return "css";
    case "html":
    case "markup":
      return "markup";
    case "js":
    case "javascript":
      return "javascript";
    case "json":
      return "json";
    case "jsx":
      return "jsx";
    case "ts":
    case "typescript":
      return "typescript";
    case "tsx":
      return "tsx";
    case "text":
    case "plaintext":
    default:
      return "text";
  }
}

async function ensurePrismLanguage(lang: SupportedLanguage): Promise<void> {
  // Prism core ships without most languages. Load on-demand on the client.
  // Note: some languages depend on others; we load what we need explicitly.
  switch (lang) {
    case "bash":
      await import("prismjs/components/prism-bash");
      return;
    case "css":
      await import("prismjs/components/prism-css");
      return;
    case "markup":
      await import("prismjs/components/prism-markup");
      return;
    case "json":
      await import("prismjs/components/prism-json");
      return;
    case "jsx":
      await import("prismjs/components/prism-javascript");
      await import("prismjs/components/prism-jsx");
      return;
    case "typescript":
      await import("prismjs/components/prism-typescript");
      return;
    case "tsx":
      await import("prismjs/components/prism-typescript");
      await import("prismjs/components/prism-tsx");
      return;
    case "javascript":
      await import("prismjs/components/prism-javascript");
      return;
    case "text":
    default:
      return;
  }
}

const CodeBlock = ({ code, language, filename }: CodeBlockProps) => {
  const codeRef = useRef<HTMLElement | null>(null);
  const lang = useMemo(() => normalizeLanguage(language), [language]);

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      try {
        await ensurePrismLanguage(lang);
      } catch {
        // If a language chunk fails to load, fall back to plain text.
      }

      if (cancelled) return;
      if (!codeRef.current) return;

      try {
        Prism.highlightElement(codeRef.current);
      } catch {
        // no-op
      }
    }

    highlight();
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <section
      className={`my-10 rounded-xl overflow-hidden ${styles.root}`}
      dir="ltr"
    >
      {filename ? (
        <div className={`px-4 py-2 text-xs font-mono ${styles.header}`}>
          {filename}
        </div>
      ) : null}

      <pre className={`p-4 text-sm font-mono leading-6 ${styles.pre}`}>
        <code ref={codeRef} className={`language-${lang} ${styles.code}`}>
          {code}
        </code>
      </pre>
    </section>
  );
};

export default CodeBlock;
