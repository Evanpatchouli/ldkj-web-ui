import { ToastProvider, toast } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const brandIconSrc =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%230f766e"/><path d="M8 12h8" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>';

const code = `import { ToastProvider, toast } from "@ldkj/web-ui";

const brandIconSrc = "data:image/svg+xml;utf8,...";

function Actions() {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() =>
          toast.success("自定义名称图标", {
            icon: "favorite",
            iconColor: "#db2777",
          })
        }
      >
        icon name
      </button>
      <button
        onClick={() =>
          toast.info("自定义 src 图标", {
            icon: { src: brandIconSrc },
          })
        }
      >
        icon src
      </button>
    </div>
  );
}

export function Example() {
  return (
    <ToastProvider placement="top" queueLimit={8}>
      <Actions />
    </ToastProvider>
  );
}`;

function ActionButton(props: {
  children: string;
  onClick: () => void;
  className?: string;
}) {
  const { children, onClick, className } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-3 py-1.5 text-sm transition hover:opacity-90 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

function Actions() {
  return (
    <div className="flex flex-wrap gap-2">
      <ActionButton
        className="border-pink-300 text-pink-700"
        onClick={() =>
          toast.success("自定义名称图标", {
            icon: "favorite",
            iconColor: "#db2777",
          })
        }
      >
        icon name
      </ActionButton>
      <ActionButton
        className="border-teal-300 text-teal-700"
        onClick={() =>
          toast.info("自定义 src 图标", {
            icon: { src: brandIconSrc },
          })
        }
      >
        icon src
      </ActionButton>
    </div>
  );
}

export default function ToastCustomIconDemo() {
  return (
    <CodeView code={code}>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          图标优先级：<code>options.icon</code> &gt; <code>type</code> 默认图标。
        </p>
        <ToastProvider placement="top" queueLimit={8}>
          <Actions />
        </ToastProvider>
      </div>
    </CodeView>
  );
}

