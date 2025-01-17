import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "katex/dist/katex.min.css";

interface MessageProps {
  role: "user" | "system";
  content: string;
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

export const Message: React.FC<MessageProps> = ({ role, content }) => {
  const isUser = role === "user";
  const processedContent = preprocessMath(content);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <div className={`max-w-[85%] ${isUser ? "bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2" : "pr-4"}`}>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          className={`prose ${isUser ? "prose-sm" : "prose-base"} max-w-none dark:prose-invert`}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
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
      </div>
    </div>
  );
};
