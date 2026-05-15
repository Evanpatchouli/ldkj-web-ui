import { ToastProvider, toast, useToast } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { ToastProvider, toast, useToast } from "@ldkj/web-ui";

function ToastActions() {
  const api = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => api.warn("默认可关闭（显示关闭按钮）")}>
        closable=true (default)
      </button>
      <button onClick={() => toast.error("禁止手动关闭", { closable: false })}>
        closable=false
      </button>
      <button
        onClick={() => {
          toast.config({ closable: false });
          toast.info("全局默认已设为 closable=false");
        }}
      >
        toast.config closable=false
      </button>
    </div>
  );
}

export function Example() {
  return (
    <ToastProvider placement="top" queueLimit={8}>
      <ToastActions />
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

function ToastActions() {
  const api = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <ActionButton
        className="border-amber-300 text-amber-700"
        onClick={() => api.warn("默认可关闭（显示关闭按钮）")}
      >
        closable=true
      </ActionButton>
      <ActionButton
        className="border-red-300 text-red-700"
        onClick={() => toast.error("禁止手动关闭", { closable: false })}
      >
        closable=false
      </ActionButton>
      <ActionButton
        className="border-gray-300 text-gray-700"
        onClick={() => {
          toast.config({ closable: false });
          toast.info("全局默认已设为 closable=false");
        }}
      >
        toast.config closable=false
      </ActionButton>
      <ActionButton
        className="border-gray-300 text-gray-700"
        onClick={() => {
          toast.resetConfig();
          toast.success("已重置全局 toast 配置");
        }}
      >
        reset config
      </ActionButton>
    </div>
  );
}

export default function ToastClosableDemo() {
  return (
    <CodeView code={code}>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          支持单条消息配置 <code>closable</code>，也支持通过{" "}
          <code>toast.config</code> 设置全局默认值。
        </p>
        <ToastProvider placement="top" queueLimit={8}>
          <ToastActions />
        </ToastProvider>
      </div>
    </CodeView>
  );
}

