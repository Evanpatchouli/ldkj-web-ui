import * as React from "react";
import CodeView from "../../CodeView";
import { Button, Loading } from "@ldkj/web-ui";

const code = `import * as React from "react";
import { Button, Loading } from "@ldkj/web-ui";

const Example = () => {
  const [spinning, setSpinning] = React.useState(true);

  return (
    <div className="grid gap-4">
      <Button size="sm" onClick={() => setSpinning((value) => !value)}>
        {spinning ? "停止加载" : "开始加载"}
      </Button>
      <Loading variant="block" delay={200} spinning={spinning} text="延迟 200ms 后显示" />
    </div>
  );
};`;

const Example = () => {
  const [spinning, setSpinning] = React.useState(true);

  return (
    <div className="grid gap-4">
      <Button size="sm" onClick={() => setSpinning((value) => !value)}>
        {spinning ? "停止加载" : "开始加载"}
      </Button>
      <Loading variant="block" delay={200} spinning={spinning} text="延迟 200ms 后显示" />
    </div>
  );
};

export default function LoadingStateDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
