import CodeView from "../../CodeView";
import { Spin } from "@ldkj/web-ui";

const code = `import { Spin } from "@ldkj/web-ui";

const Example = () => (
  <div className="flex items-center gap-4">
    <Spin size={16} />
    <Spin size={24} />
    <Spin size={32} strokeWidth={3} label="加载指标" />
  </div>
);`;

const Example = () => (
  <div className="flex items-center gap-4">
    <Spin size={16} />
    <Spin size={24} />
    <Spin size={32} strokeWidth={3} label="加载指标" />
  </div>
);

export default function SpinDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
