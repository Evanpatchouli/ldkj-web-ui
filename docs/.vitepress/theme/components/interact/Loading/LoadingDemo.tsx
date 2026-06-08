import CodeView from "../../CodeView";
import { Loading } from "@ldkj/web-ui";

const code = `import { Loading } from "@ldkj/web-ui";

const Example = () => (
  <div className="grid gap-4">
    <Loading />
    <Loading text="数据加载中..." size={22} tone="muted" />
    <Loading text={null} size={28} />
  </div>
);`;

const Example = () => (
  <div className="grid gap-4">
    <Loading />
    <Loading text="数据加载中..." size={22} tone="muted" />
    <Loading text={null} size={28} />
  </div>
);

export default function LoadingDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
