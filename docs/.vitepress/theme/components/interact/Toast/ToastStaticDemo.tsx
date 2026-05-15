import { ToastProvider, toast } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { ToastProvider, toast } from "@ldkj/web-ui";

function Actions() {
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => toast.info("静态 info")}>info</button>
      <button onClick={() => toast.success("静态 success")}>success</button>
      <button onClick={() => toast.warn("静态 warn")}>warn</button>
      <button onClick={() => toast.error("静态 error")}>error</button>
      <button
        onClick={() => {
          toast.config({ placement: "rightTop", duration: 2000 });
          toast.info("已更新全局默认配置");
        }}
      >
        config
      </button>
      <button onClick={() => toast.resetConfig()}>resetConfig</button>
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
        className="border-gray-300 text-gray-700"
        onClick={() => toast.info("静态 info")}
      >
        info
      </ActionButton>
      <ActionButton
        className="border-green-300 text-green-700"
        onClick={() => toast.success("静态 success")}
      >
        success
      </ActionButton>
      <ActionButton
        className="border-amber-300 text-amber-700"
        onClick={() => toast.warn("静态 warn")}
      >
        warn
      </ActionButton>
      <ActionButton
        className="border-red-300 text-red-700"
        onClick={() => toast.error("静态 error")}
      >
        error
      </ActionButton>
      <ActionButton
        className="border-indigo-300 text-indigo-700"
        onClick={() => {
          toast.config({ placement: "rightTop", duration: 2000 });
          toast.info("已更新全局默认配置");
        }}
      >
        config
      </ActionButton>
      <ActionButton
        className="border-gray-300 text-gray-700"
        onClick={() => toast.resetConfig()}
      >
        resetConfig
      </ActionButton>
    </div>
  );
}

export default function ToastStaticDemo() {
  return (
    <CodeView code={code}>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          静态 `toast` 适用于组件外调用（例如请求封装、工具模块、状态管理）。
        </p>
        <ToastProvider placement="top" queueLimit={8}>
          <Actions />
        </ToastProvider>
      </div>
    </CodeView>
  );
}

