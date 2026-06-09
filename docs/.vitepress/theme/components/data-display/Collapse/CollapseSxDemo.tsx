import CodeView from "../../CodeView";
import { Collapse } from "@ldkj/web-ui";

const code = `import { Collapse } from "@ldkj/web-ui";

export function Example() {
  return (
    <Collapse
      defaultActiveKey="brand"
      expandIcon={({ active }) => (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-700">
          {active ? "-" : "+"}
        </span>
      )}
      sx={{
        borderColor: "#bfdbfe",
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
      }}
      items={[
        {
          key: "brand",
          label: "品牌化面板",
          children: "通过 sx 控制边框和阴影，通过 expandIcon 自定义展开图标。",
        },
        {
          key: "slot",
          label: "局部样式",
          bodyProps: {
            className: "rounded bg-blue-50 p-3 text-blue-800",
          },
          children: "bodyProps 可用于定制某个面板的内容区域。",
        },
      ]}
    />
  );
}`;

function Example() {
  return (
    <Collapse
      defaultActiveKey="brand"
      expandIcon={({ active }) => (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-700">
          {active ? "-" : "+"}
        </span>
      )}
      sx={{
        borderColor: "#bfdbfe",
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
      }}
      items={[
        {
          key: "brand",
          label: "品牌化面板",
          children: "通过 sx 控制边框和阴影，通过 expandIcon 自定义展开图标。",
        },
        {
          key: "slot",
          label: "局部样式",
          bodyProps: {
            className: "rounded bg-blue-50 p-3 text-blue-800",
          },
          children: "bodyProps 可用于定制某个面板的内容区域。",
        },
      ]}
    />
  );
}

export default function CollapseSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

