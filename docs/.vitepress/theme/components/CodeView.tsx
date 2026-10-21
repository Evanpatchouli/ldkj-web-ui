import * as React from "react";

type CodeViewProps = {
  code: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  allowOverflow?: boolean;
};

export default function CodeView(props: CodeViewProps) {
  const { code, children, initiallyExpanded = false, allowOverflow = false } = props;
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
    <div
      className={`${allowOverflow ? "overflow-visible" : "overflow-hidden"} rounded-lg border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-card)] text-[color:var(--ldkj-color-card-foreground)]`}
    >
      <div className={allowOverflow ? "relative z-20 p-4" : "p-4"}>
        {children}
      </div>

      {expanded ? (
        <pre className="relative z-0 overflow-x-auto border-t border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-muted)] p-4 text-xs leading-5 text-[color:var(--ldkj-color-foreground)]">
          <code>{code}</code>
        </pre>
      ) : null}

      <div className="relative z-0 flex items-center justify-end gap-0 border-t border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-card)] px-3 py-2">
        <button
          type="button"
          className="rounded-md border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-background)] px-3 py-1.5 text-xs text-[color:var(--ldkj-color-foreground)] transition-colors hover:bg-[color:var(--ldkj-color-accent)] hover:text-[color:var(--ldkj-color-accent-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)]"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "隐藏" : "显示"}
        </button>
        <button
          type="button"
          className="rounded-md border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-background)] px-3 py-1.5 text-xs text-[color:var(--ldkj-color-foreground)] transition-colors hover:bg-[color:var(--ldkj-color-accent)] hover:text-[color:var(--ldkj-color-accent-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)]"
          onClick={handleCopy}
        >
          {copied ? "已复制 ✅" : "复制"}
        </button>
      </div>
    </div>
  );
}
