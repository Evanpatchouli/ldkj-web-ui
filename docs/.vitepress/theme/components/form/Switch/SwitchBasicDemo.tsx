import { Switch } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Switch } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Switch defaultChecked label="接收系统通知" />
      <Switch label="订阅产品更新" />
      <Switch disabled label="维护模式" />
    </div>
  );
}`;

function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Switch defaultChecked label="接收系统通知" />
      <Switch label="订阅产品更新" />
      <Switch disabled label="维护模式" />
    </div>
  );
}

export default function SwitchBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

