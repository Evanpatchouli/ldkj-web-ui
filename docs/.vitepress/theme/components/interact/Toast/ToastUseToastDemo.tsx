import { ToastProvider, useToast } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { ToastProvider, useToast } from "@ldkj/web-ui";

function Actions() {
  const toastApi = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => toastApi.show("普通提示")}>show</button>
      <button onClick={() => toastApi.success("保存成功")}>success</button>
      <button onClick={() => toastApi.warn("请先补充必填项")}>warn</button>
      <button onClick={() => toastApi.error("提交失败")}>error</button>
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
  const toastApi = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <ActionButton
        className="border-gray-300 text-gray-700"
        onClick={() => toastApi.show("普通提示")}
      >
        show
      </ActionButton>
      <ActionButton
        className="border-green-300 text-green-700"
        onClick={() => toastApi.success("保存成功")}
      >
        success
      </ActionButton>
      <ActionButton
        className="border-amber-300 text-amber-700"
        onClick={() => toastApi.warn("请先补充必填项")}
      >
        warn
      </ActionButton>
      <ActionButton
        className="border-red-300 text-red-700"
        onClick={() => toastApi.error("提交失败")}
      >
        error
      </ActionButton>
    </div>
  );
}

export default function ToastUseToastDemo() {
  return (
    <CodeView code={code}>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          `useToast` 适用于 React 组件内部，能直接访问当前 Provider 上下文。
        </p>
        <ToastProvider placement="top" queueLimit={8}>
          <Actions />
        </ToastProvider>
      </div>
    </CodeView>
  );
}

