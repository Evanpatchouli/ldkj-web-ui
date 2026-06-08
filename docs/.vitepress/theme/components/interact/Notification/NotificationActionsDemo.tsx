import CodeView from "../../CodeView";
import { Button, NotificationProvider, useNotification } from "@ldkj/web-ui";

const code = `import { Button, NotificationProvider, useNotification } from "@ldkj/web-ui";

function BusinessActions() {
  const api = useNotification();

  return (
    <Button
      size="sm"
      onClick={() => {
        const noticeId = \`approval-\${Date.now()}\`;
        api.open({
          id: noticeId,
          message: "有新的审批待处理",
          description: "客户合同变更需要在 30 分钟内确认。",
          duration: 0,
          actions: (
            <>
              <Button size="xs" variant="primary" onClick={() => api.dismiss(noticeId)}>
                查看详情
              </Button>
              <Button size="xs" variant="ghost" onClick={() => api.dismiss(noticeId)}>
                稍后处理
              </Button>
            </>
          ),
        });
      }}
    >
      打开持久通知
    </Button>
  );
}

const Example = () => (
  <NotificationProvider>
    <BusinessActions />
  </NotificationProvider>
);`;

function BusinessActions() {
  const api = useNotification();

  return (
    <Button
      size="sm"
      onClick={() => {
        const noticeId = `approval-${Date.now()}`;
        api.open({
          id: noticeId,
          message: "有新的审批待处理",
          description: "客户合同变更需要在 30 分钟内确认。",
          duration: 0,
          actions: (
            <>
              <Button
                size="xs"
                variant="primary"
                onClick={() => api.dismiss(noticeId)}
              >
                查看详情
              </Button>
              <Button
                size="xs"
                variant="ghost"
                onClick={() => api.dismiss(noticeId)}
              >
                稍后处理
              </Button>
            </>
          ),
        });
      }}
    >
      打开持久通知
    </Button>
  );
}

const Example = () => (
  <NotificationProvider>
    <BusinessActions />
  </NotificationProvider>
);

export default function NotificationActionsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
