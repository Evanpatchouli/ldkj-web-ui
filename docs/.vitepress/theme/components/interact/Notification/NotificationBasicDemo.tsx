import CodeView from "../../CodeView";
import { Button, NotificationProvider, useNotification } from "@ldkj/web-ui";

const code = `import { Button, NotificationProvider, useNotification } from "@ldkj/web-ui";

function NoticeActions() {
  const api = useNotification();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button size="sm" variant="outline" onClick={() => api.info({ message: "系统消息", description: "任务已进入后台处理队列。" })}>
        Info
      </Button>
      <Button size="sm" variant="success" onClick={() => api.success({ message: "保存成功", description: "客户资料已同步到最新版本。" })}>
        Success
      </Button>
      <Button size="sm" variant="warning" onClick={() => api.warn({ message: "额度接近上限", description: "建议检查当前套餐余量。" })}>
        Warn
      </Button>
      <Button size="sm" variant="danger" onClick={() => api.error({ message: "提交失败", description: "网络异常，请稍后重试。" })}>
        Error
      </Button>
    </div>
  );
}

const Example = () => (
  <NotificationProvider>
    <NoticeActions />
  </NotificationProvider>
);`;

function NoticeActions() {
  const api = useNotification();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          api.info({
            message: "系统消息",
            description: "任务已进入后台处理队列。",
          })
        }
      >
        Info
      </Button>
      <Button
        size="sm"
        variant="success"
        onClick={() =>
          api.success({
            message: "保存成功",
            description: "客户资料已同步到最新版本。",
          })
        }
      >
        Success
      </Button>
      <Button
        size="sm"
        variant="warning"
        onClick={() =>
          api.warn({
            message: "额度接近上限",
            description: "建议检查当前套餐余量。",
          })
        }
      >
        Warn
      </Button>
      <Button
        size="sm"
        variant="danger"
        onClick={() =>
          api.error({
            message: "提交失败",
            description: "网络异常，请稍后重试。",
          })
        }
      >
        Error
      </Button>
    </div>
  );
}

const Example = () => (
  <NotificationProvider>
    <NoticeActions />
  </NotificationProvider>
);

export default function NotificationBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
