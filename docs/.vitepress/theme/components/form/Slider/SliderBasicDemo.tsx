import { Slider } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `
import { Slider } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 10, maxWidth: 420 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
      <span>完成进度</span>
      <span>35%</span>
    </div>
    <Slider min={0} max={100} defaultValue={35} aria-label="完成进度" />
  </div>
);`;

const Example = () => (
  <div style={{ display: "grid", gap: 10, maxWidth: 420 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
      <span>完成进度</span>
      <span>35%</span>
    </div>
    <Slider min={0} max={100} defaultValue={35} aria-label="完成进度" />
  </div>
);

export default function SliderBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
