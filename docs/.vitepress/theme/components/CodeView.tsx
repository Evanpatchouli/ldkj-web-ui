import * as React from "react";

type CodeViewProps = {
  code: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
};

export default function CodeView(props: CodeViewProps) {
  const { code, children, initiallyExpanded = false } = props;
  const [expanded, setExpanded] = React.useState(initiallyExpanded);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
      return;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  }, [code]);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="p-4">{children}</div>

      {expanded ? (
        <pre className="overflow-x-auto border-t border-gray-200 bg-gray-50 p-4 text-xs leading-5 text-gray-700">
          <code>{code}</code>
        </pre>
      ) : null}

      <div className="flex items-center justify-end gap-0 border-t border-gray-200 bg-white px-3 py-2">
        <button
          type="button"
          className="rounded-md border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "隐藏" : "显示"}
        </button>
        <button
          type="button"
          className="rounded-md border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
          onClick={handleCopy}
        >
          {copied ? "已复制 ✅" : "复制"}
        </button>
      </div>
    </div>
  );
}
