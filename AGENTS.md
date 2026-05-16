## 代码规范

### 文档规范

编写组件文档时，必需分小节解释常用API或用法，并给出 DEMO

### DEMO 规范

DEMO 必须对其演示的 API 或用法尽可能展示全面，并且在视觉上尽可能接近真实使用场景，避免过于简化的展示。

DEMO 代码格式规范示例，要分成 Example, code 和 export default DEMO，code 内容于 DEMO 代码块（包括导入语句）完全一致：

```tsx
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
```
