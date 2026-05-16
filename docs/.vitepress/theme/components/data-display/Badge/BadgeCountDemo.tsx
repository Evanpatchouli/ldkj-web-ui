import CodeView from "../../CodeView";
import { Badge, Button } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
    <Badge badgeContent={8}>
      <Button size="sm">待办</Button>
    </Badge>
    <Badge badgeContent={99}>
      <Button size="sm">消息中心</Button>
    </Badge>
    <Badge badgeContent={128} max={99}>
      <Button size="sm">系统通知</Button>
    </Badge>
    <Badge badgeContent={0} showZero>
      <Button size="sm">审批提醒</Button>
    </Badge>
  </div>
);

const code = `
import { Badge, Button } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
    <Badge badgeContent={8}>
      <Button size="sm">待办</Button>
    </Badge>
    <Badge badgeContent={99}>
      <Button size="sm">消息中心</Button>
    </Badge>
    <Badge badgeContent={128} max={99}>
      <Button size="sm">系统通知</Button>
    </Badge>
    <Badge badgeContent={0} showZero>
      <Button size="sm">审批提醒</Button>
    </Badge>
  </div>
);`;

export default function BadgeCountDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
