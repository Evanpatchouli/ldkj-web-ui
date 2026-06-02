import * as React from "react";
import { Rate } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Rate } from "@ldkj/web-ui";

const Example = () => {
  const [value, setValue] = React.useState(4);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ fontSize: 14, color: "#475569" }}>服务满意度</div>
      <Rate value={value} onChange={setValue} size="lg" />
      <div style={{ fontSize: 13, color: "#64748b" }}>
        当前评分：{value} / 5
      </div>
    </div>
  );
};`;

function Example() {
  const [value, setValue] = React.useState(4);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ fontSize: 14, color: "#475569" }}>服务满意度</div>
      <Rate value={value} onChange={setValue} size="lg" />
      <div style={{ fontSize: 13, color: "#64748b" }}>
        当前评分：{value} / 5
      </div>
    </div>
  );
}

export default function RateBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
