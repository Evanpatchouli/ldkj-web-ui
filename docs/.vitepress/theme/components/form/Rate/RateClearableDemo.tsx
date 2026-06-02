import * as React from "react";
import { Rate } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Rate } from "@ldkj/web-ui";

const Example = () => {
  const [value, setValue] = React.useState(3);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ fontSize: 14, color: "#475569" }}>可清空评分</div>
      <Rate value={value} onChange={setValue} allowClear />
      <div style={{ fontSize: 13, color: "#64748b" }}>
        再次点击当前星级即可清空，当前值：{value}
      </div>
    </div>
  );
};`;

function Example() {
  const [value, setValue] = React.useState(3);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ fontSize: 14, color: "#475569" }}>可清空评分</div>
      <Rate value={value} onChange={setValue} allowClear />
      <div style={{ fontSize: 13, color: "#64748b" }}>
        再次点击当前星级即可清空，当前值：{value}
      </div>
    </div>
  );
}

export default function RateClearableDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
