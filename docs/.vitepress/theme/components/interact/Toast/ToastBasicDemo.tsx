import { ToastProvider, useToast } from "@/components/interact/toast";
import CodeView from "../../CodeView";

const code = `import { ToastProvider, useToast } from "@ldkj/web-ui";

function ToastActions() {
  const api = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => api.info("保存草稿成功")}>useToast.info</button>
      <button onClick={() => api.warn("请先补充必填项")}>useToast.warn</button>
      <button onClick={() => api.success("发布成功")}>toast.success</button>
      <button onClick={() => api.error("网络异常，请稍后重试")}>toast.error</button>
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
        className="border-gray-300 text-gray-700"
        onClick={() => api.info("保存草稿成功")}
      >
        useToast.info
      </ActionButton>
      <ActionButton
        className="border-amber-300 text-amber-700"
        onClick={() => api.warn("请先补充必填项")}
      >
        useToast.warn
      </ActionButton>
      <ActionButton
        className="border-green-300 text-green-700"
        onClick={() => api.success("发布成功")}
      >
        toast.success
      </ActionButton>
      <ActionButton
        className="border-red-300 text-red-700"
        onClick={() => api.error("网络异常，请稍后重试")}
      >
        toast.error
      </ActionButton>
    </div>
  );
}

export default function ToastBasicDemo() {
  return (
    <CodeView code={code}>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          已启用 <code>queueLimit=8</code>，连续点击会自动淘汰最早提示。
        </p>
        <ToastProvider placement="top" queueLimit={8}>
          <ToastActions />
        </ToastProvider>
      </div>
    </CodeView>
  );
}
