import CodeView from "../../CodeView";
import { Collapse } from "@ldkj/web-ui";

const code = `import { Collapse } from "@ldkj/web-ui";

function HeavyContent() {
  return (
    <div className="grid gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded bg-slate-50 px-3 py-2">
          明细行 {index + 1}: 仅在面板首次展开后挂载。
        </div>
      ))}
    </div>
  );
}

export function Example() {
  return (
    <Collapse
      lazyMount
      items={[
        {
          key: "lazy",
          label: "懒挂载内容",
          children: <HeavyContent />,
        },
        {
          key: "destroy",
          label: "关闭后卸载内容",
          destroyOnHidden: true,
          children: <HeavyContent />,
        },
        {
          key: "force",
          label: "始终挂载内容",
          forceRender: true,
          children: <HeavyContent />,
        },
      ]}
    />
  );
}`;

function HeavyContent() {
  return (
    <div className="grid gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded bg-slate-50 px-3 py-2">
          明细行 {index + 1}: 仅在面板首次展开后挂载。
        </div>
      ))}
    </div>
  );
}

function Example() {
  return (
    <Collapse
      lazyMount
      items={[
        {
          key: "lazy",
          label: "懒挂载内容",
          children: <HeavyContent />,
        },
        {
          key: "destroy",
          label: "关闭后卸载内容",
          destroyOnHidden: true,
          children: <HeavyContent />,
        },
        {
          key: "force",
          label: "始终挂载内容",
          forceRender: true,
          children: <HeavyContent />,
        },
      ]}
    />
  );
}

export default function CollapseLazyDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

