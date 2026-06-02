import * as React from "react";
import { Rate } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Rate } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 14 }}>
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontSize: 14, color: "#475569" }}>只读展示</div>
      <Rate value={3} readOnly />
    </div>
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontSize: 14, color: "#475569" }}>禁用状态</div>
      <Rate value={4} disabled />
    </div>
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontSize: 14, color: "#475569" }}>更多星级</div>
      <Rate value={7} count={10} />
    </div>
  </div>
);`;

function Example() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ fontSize: 14, color: "#475569" }}>只读展示</div>
        <Rate value={3} readOnly />
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ fontSize: 14, color: "#475569" }}>禁用状态</div>
        <Rate value={4} disabled />
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ fontSize: 14, color: "#475569" }}>更多星级</div>
        <Rate value={7} count={10} />
      </div>
    </div>
  );
}

export default function RateStatesDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
