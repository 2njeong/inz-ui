import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = "tsx" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs text-gray-300 hover:bg-white/20 transition-colors"
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            복사됨
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            복사
          </>
        )}
      </button>
      <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{ ...style, margin: 0, padding: "1rem", fontSize: "13px", lineHeight: "1.5", overflowX: "auto" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
