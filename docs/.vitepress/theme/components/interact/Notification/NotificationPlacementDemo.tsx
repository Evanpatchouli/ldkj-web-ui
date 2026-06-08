import CodeView from "../../CodeView";
import {
  Button,
  NotificationProvider,
  type NotificationPlacement,
  useNotification,
} from "@ldkj/web-ui";

const code = `import { Button, NotificationProvider, useNotification } from "@ldkj/web-ui";

function PlacementActions() {
  const api = useNotification();
  const placements = ["rightTop", "rightBottom", "leftTop", "leftBottom", "center"];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {placements.map((placement) => (
        <Button
          key={placement}
          size="sm"
          variant="outline"
          onClick={() =>
            api.info({
              message: placement,
              description: "通知会出现在指定位置。",
              placement,
            })
          }
        >
          {placement}
        </Button>
      ))}
    </div>
  );
}

const Example = () => (
  <NotificationProvider>
    <PlacementActions />
  </NotificationProvider>
);`;

const placements: NotificationPlacement[] = [
  "rightTop",
  "rightBottom",
  "leftTop",
  "leftBottom",
  "center",
];

function PlacementActions() {
  const api = useNotification();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {placements.map((placement) => (
        <Button
          key={placement}
          size="sm"
          variant="outline"
          onClick={() =>
            api.info({
              message: placement,
              description: "通知会出现在指定位置。",
              placement,
            })
          }
        >
          {placement}
        </Button>
      ))}
    </div>
  );
}

const Example = () => (
  <NotificationProvider>
    <PlacementActions />
  </NotificationProvider>
);

export default function NotificationPlacementDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
