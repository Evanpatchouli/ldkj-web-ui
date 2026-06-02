import * as React from "react";
import { AutoComplete, type AutoCompleteValueChangeMeta } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  { label: "北京", value: "北京", description: "华北中心" },
  { label: "上海", value: "上海", description: "华东中心" },
  { label: "深圳", value: "深圳", description: "华南中心" },
  { label: "杭州", value: "杭州", description: "数字经济" },
  { label: "成都", value: "成都", description: "西南枢纽" },
];

const Example = () => {
  const [value, setValue] = React.useState("上海");
  const [meta, setMeta] = React.useState<AutoCompleteValueChangeMeta | null>(null);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <AutoComplete
        value={value}
        options={options}
        placeholder="搜索城市"
        onValueChange={(nextValue, nextMeta) => {
          setValue(nextValue);
          setMeta(nextMeta);
        }}
      />
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          background: "#f8fafc",
          display: "grid",
          gap: 6,
          padding: 12,
          fontSize: 13,
          lineHeight: 1.6,
          color: "#334155",
        }}
      >
        <div>当前值：{value || "空"}</div>
        <div>变化原因：{meta ? meta.reason : "尚未变化"}</div>
        <div>选中建议：{meta?.option ? meta.option.label : "无"}</div>
      </div>
    </div>
  );
};

const code = `
import * as React from "react";
import { AutoComplete } from "@ldkj/web-ui";

const options = [
  { label: "北京", value: "北京", description: "华北中心" },
  { label: "上海", value: "上海", description: "华东中心" },
  { label: "深圳", value: "深圳", description: "华南中心" },
  { label: "杭州", value: "杭州", description: "数字经济" },
  { label: "成都", value: "成都", description: "西南枢纽" },
];

const Example = () => {
  const [value, setValue] = React.useState("上海");
  const [meta, setMeta] = React.useState(null);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <AutoComplete
        value={value}
        options={options}
        placeholder="搜索城市"
        onValueChange={(nextValue, nextMeta) => {
          setValue(nextValue);
          setMeta(nextMeta);
        }}
      />
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          background: "#f8fafc",
          display: "grid",
          gap: 6,
          padding: 12,
          fontSize: 13,
          lineHeight: 1.6,
          color: "#334155",
        }}
      >
        <div>当前值：{value || "空"}</div>
        <div>变化原因：{meta ? meta.reason : "尚未变化"}</div>
        <div>选中建议：{meta?.option ? meta.option.label : "无"}</div>
      </div>
    </div>
  );
};`;

export default function AutoCompleteControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
