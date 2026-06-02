import * as React from "react";
import { Slider } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `
import * as React from "react";
import { Slider } from "@ldkj/web-ui";

const Example = () => {
  const [budget, setBudget] = React.useState(450);

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 480 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
        <span style={{ color: "#334155", fontWeight: 600 }}>预算上限</span>
        <strong style={{ color: "#0f172a" }}>{budget} 元</strong>
      </div>
      <Slider
        min={0}
        max={1000}
        step={50}
        value={budget}
        onValueChange={setBudget}
        aria-label="预算上限"
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b" }}>
        <span>0 元</span>
        <span>500 元</span>
        <span>1000 元</span>
      </div>
    </div>
  );
};`;

const Example = () => {
  const [budget, setBudget] = React.useState(450);

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 480 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
        <span style={{ color: "#334155", fontWeight: 600 }}>预算上限</span>
        <strong style={{ color: "#0f172a" }}>{budget} 元</strong>
      </div>
      <Slider
        min={0}
        max={1000}
        step={50}
        value={budget}
        onValueChange={setBudget}
        aria-label="预算上限"
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b" }}>
        <span>0 元</span>
        <span>500 元</span>
        <span>1000 元</span>
      </div>
    </div>
  );
};

export default function SliderStepDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
