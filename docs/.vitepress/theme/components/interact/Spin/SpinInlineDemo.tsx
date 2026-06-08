import CodeView from "../../CodeView";
import { Button, Spin } from "@ldkj/web-ui";

const code = `import { Button, Spin } from "@ldkj/web-ui";

const Example = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="sm">
      <span className="inline-flex items-center gap-2">
        <Spin size={14} strokeWidth={2} label="提交中" />
        提交中
      </span>
    </Button>
    <span className="inline-flex items-center gap-2 text-sm text-slate-600">
      <Spin size="1em" tone="muted" label="同步中" />
      同步后台状态
    </span>
  </div>
);`;

const Example = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="sm">
      <span className="inline-flex items-center gap-2">
        <Spin size={14} strokeWidth={2} label="提交中" />
        提交中
      </span>
    </Button>
    <span className="inline-flex items-center gap-2 text-sm text-slate-600">
      <Spin size="1em" tone="muted" label="同步中" />
      同步后台状态
    </span>
  </div>
);

export default function SpinInlineDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
