import { Slider } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `
import { Slider } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 18, maxWidth: 460 }}>
    <label style={{ display: "grid", gap: 8, fontSize: 14, color: "#334155" }}>
      默认状态
      <Slider min={0} max={100} defaultValue={42} />
    </label>
    <label style={{ display: "grid", gap: 8, fontSize: 14, color: "#334155" }}>
      自定义尺寸与强调色
      <Slider
        min={0}
        max={100}
        defaultValue={76}
        trackSize={10}
        thumbSize={22}
        sx={{
          "--ldkj-slider-fill": "#16a34a",
          "--ldkj-slider-track": "#dcfce7",
          "&::-webkit-slider-thumb": {
            backgroundColor: "#16a34a",
            boxShadow: "0 3px 10px rgba(22, 163, 74, 0.28)",
          },
          "&::-moz-range-thumb": {
            backgroundColor: "#16a34a",
            boxShadow: "0 3px 10px rgba(22, 163, 74, 0.28)",
          },
        }}
      />
    </label>
    <label style={{ display: "grid", gap: 8, fontSize: 14, color: "#94a3b8" }}>
      禁用状态
      <Slider min={0} max={100} defaultValue={72} disabled />
    </label>
  </div>
);`;

const Example = () => (
  <div style={{ display: "grid", gap: 18, maxWidth: 460 }}>
    <label style={{ display: "grid", gap: 8, fontSize: 14, color: "#334155" }}>
      默认状态
      <Slider min={0} max={100} defaultValue={42} />
    </label>
    <label style={{ display: "grid", gap: 8, fontSize: 14, color: "#334155" }}>
      自定义尺寸与强调色
      <Slider
        min={0}
        max={100}
        defaultValue={76}
        trackSize={10}
        thumbSize={22}
        sx={{
          "--ldkj-slider-fill": "#16a34a",
          "--ldkj-slider-track": "#dcfce7",
          "&::-webkit-slider-thumb": {
            backgroundColor: "#16a34a",
            boxShadow: "0 3px 10px rgba(22, 163, 74, 0.28)",
          },
          "&::-moz-range-thumb": {
            backgroundColor: "#16a34a",
            boxShadow: "0 3px 10px rgba(22, 163, 74, 0.28)",
          },
        }}
      />
    </label>
    <label style={{ display: "grid", gap: 8, fontSize: 14, color: "#94a3b8" }}>
      禁用状态
      <Slider min={0} max={100} defaultValue={72} disabled />
    </label>
  </div>
);

export default function SliderStateDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
