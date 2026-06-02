import * as React from "react";
import { Rate } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Rate } from "@ldkj/web-ui";

const Example = () => {
  const [value, setValue] = React.useState(4);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ fontSize: 14, color: "#475569" }}>无边框评分</div>
      <Rate value={value} onChange={setValue} borderless />
      <div style={{ fontSize: 13, color: "#64748b" }}>
        适合嵌入卡片正文或浅色背景区域，当前值：{value}
      </div>
    </div>
  );
};`;

function Example() {
  const [value, setValue] = React.useState(4);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ fontSize: 14, color: "#475569" }}>无边框评分</div>
      <Rate value={value} onChange={setValue} borderless />
      <div style={{ fontSize: 13, color: "#64748b" }}>
        适合嵌入卡片正文或浅色背景区域，当前值：{value}
      </div>
    </div>
  );
}

export default function RateBorderlessDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
