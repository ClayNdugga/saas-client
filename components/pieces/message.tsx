import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "katex/dist/katex.min.css";
import { Citation } from "@/models/firebase";
import { useDashboard } from "@/contexts/DashboardContext";

interface MessageProps {
  role: "user" | "system";
  content: string;
  references?: Citation[];
}

const CodeBlock = ({ language, value }: { language: string; value: string }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={atomDark}
      // customStyle={{
      //   borderRadius: '0.5rem',
      //   margin: '1rem 0',
      // }}
    >
      {value}
    </SyntaxHighlighter>
  );
};

function preprocessMath(content: string) {
  return content.replace(/\\\(/g, "$").replace(/\\\)/g, "$").replace(/\\\[/g, "$$").replace(/\\\]/g, "$$");
}

export const Message: React.FC<MessageProps> = ({ role, content, references }) => {
  const isUser = role === "user";
  const processedContent = preprocessMath(content);
  const { setReference, setFileId, fileId, setIsPdfLoaded } = useDashboard();

  function handleReferenceClick(reference: Citation) {
    if (fileId !== reference.fileId) {
      setIsPdfLoaded(false);
      setFileId(reference.fileId);
    }
    setReference(reference);
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      {!isUser && (
        <div className="w-6 h-6 mr-2 flex-shrink-0 mt-1">
          <svg viewBox="0 0 24 24" className="w-full h-full text-blue-500" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </svg>
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? "bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2" : "pr-4"}`}>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          className={`prose ${isUser ? "prose-sm" : "prose-base"} max-w-none dark:prose-invert`}
          components={{
            code({ node, className, children, ...props }) {
            // code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} {...props} />
              ) : (
                <code className={`${className} px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700`} {...props}>
                  {children}
                </code>
              );
            },
            ol: ({ children }) => <ol className="list-decimal space-y-1 ml-4">{children}</ol>,
            ul: ({ children }) => <ul className="list-disc space-y-1 ml-4">{children}</ul>,
            p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
          }}
        >
          {processedContent}
        </ReactMarkdown>

        {references && references.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {references.map((ref, index) => {
              return (
                <button
                  key={index}
                  className="w-6 h-6 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors "
                  onClick={() => handleReferenceClick(ref)}
                  title={`Reference from ${ref.fileName} page ${ref.pageNumber}`}
                >
                  <span className="text-white">{index + 1}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
