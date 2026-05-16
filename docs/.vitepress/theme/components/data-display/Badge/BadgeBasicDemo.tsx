import CodeView from "../../CodeView";
import { Badge, Button } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 16 }}>
    <div style={{ display: "flex", gap: 16 }}>
      <Badge badgeContent={8}>
        <Button size="sm">消息</Button>
      </Badge>
      <Badge badgeContent={120} max={99}>
        <Button size="sm">系统</Button>
      </Badge>
      <Badge badgeContent={0} showZero>
        <Button size="sm">通知</Button>
      </Badge>
    </div>
    <div style={{ display: "flex", gap: 16 }}>
      <Badge dot variant="danger">
        <Button size="sm">更新</Button>
      </Badge>
      <Badge badgeContent="NEW" variant="success">
        <Button size="sm">活动</Button>
      </Badge>
    </div>
  </div>
);

const code = `
import { Badge, Button } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 16 }}>
    <div style={{ display: "flex", gap: 16 }}>
      <Badge badgeContent={8}>
        <Button size="sm">消息</Button>
      </Badge>
      <Badge badgeContent={120} max={99}>
        <Button size="sm">系统</Button>
      </Badge>
      <Badge badgeContent={0} showZero>
        <Button size="sm">通知</Button>
      </Badge>
    </div>
    <div style={{ display: "flex", gap: 16 }}>
      <Badge dot variant="danger">
        <Button size="sm">更新</Button>
      </Badge>
      <Badge badgeContent="NEW" variant="success">
        <Button size="sm">活动</Button>
      </Badge>
    </div>
  </div>
);`;

export default function BadgeBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
