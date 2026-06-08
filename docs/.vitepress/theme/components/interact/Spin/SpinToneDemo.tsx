import CodeView from "../../CodeView";
import { Spin } from "@ldkj/web-ui";

const code = `import { Spin } from "@ldkj/web-ui";

const Example = () => (
  <div className="flex flex-wrap items-center gap-5">
    <Spin tone="primary" label="主色加载" />
    <Spin tone="muted" label="弱提示加载" />
    <Spin tone="success" label="成功态加载" />
    <Spin tone="warning" label="警告态加载" />
    <Spin tone="danger" label="危险态加载" />
  </div>
);`;

const Example = () => (
  <div className="flex flex-wrap items-center gap-5">
    <Spin tone="primary" label="主色加载" />
    <Spin tone="muted" label="弱提示加载" />
    <Spin tone="success" label="成功态加载" />
    <Spin tone="warning" label="警告态加载" />
    <Spin tone="danger" label="危险态加载" />
  </div>
);

export default function SpinToneDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
