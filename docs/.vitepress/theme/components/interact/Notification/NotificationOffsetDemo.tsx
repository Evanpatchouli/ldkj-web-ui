import CodeView from "../../CodeView";
import { Button, NotificationProvider, useNotification } from "@ldkj/web-ui";

const code = `import { Button, NotificationProvider, useNotification } from "@ldkj/web-ui";

function OffsetActions() {
  const api = useNotification();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button
        size="sm"
        onClick={() =>
          api.success({
            message: "距离顶部 80px",
            description: "适合避开固定 Header。",
            offset: { top: 80, right: 24 },
          })
        }
      >
        Header offset
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          api.info({
            message: "统一边距 48px",
            description: "数字 offset 会同时作用到四边。",
            placement: "leftBottom",
            offset: 48,
          })
        }
      >
        Bottom offset
      </Button>
    </div>
  );
}

const Example = () => (
  <NotificationProvider>
    <OffsetActions />
  </NotificationProvider>
);`;

function OffsetActions() {
  const api = useNotification();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button
        size="sm"
        onClick={() =>
          api.success({
            message: "距离顶部 80px",
            description: "适合避开固定 Header。",
            offset: { top: 80, right: 24 },
          })
        }
      >
        Header offset
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          api.info({
            message: "统一边距 48px",
            description: "数字 offset 会同时作用到四边。",
            placement: "leftBottom",
            offset: 48,
          })
        }
      >
        Bottom offset
      </Button>
    </div>
  );
}

const Example = () => (
  <NotificationProvider>
    <OffsetActions />
  </NotificationProvider>
);

export default function NotificationOffsetDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
