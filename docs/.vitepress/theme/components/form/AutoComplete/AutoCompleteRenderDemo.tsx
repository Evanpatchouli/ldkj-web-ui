import * as React from "react";
import {
  AutoComplete,
  type AutoCompleteOption,
  type AutoCompleteRenderOptionState,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options: AutoCompleteOption[] = [
  {
    label: "上海虹桥",
    value: "SHA",
    textValue: "上海虹桥",
    description: "Shanghai Hongqiao",
    keywords: ["虹桥", "上海机场"],
  },
  {
    label: "北京首都",
    value: "PEK",
    textValue: "北京首都",
    description: "Beijing Capital",
    keywords: ["首都", "北京机场"],
  },
  {
    label: "深圳宝安",
    value: "SZX",
    textValue: "深圳宝安",
    description: "Shenzhen Bao'an",
    keywords: ["宝安", "深圳机场"],
  },
];

function renderOption(
  option: AutoCompleteOption,
  state: AutoCompleteRenderOptionState,
) {
  return (
    <div
      style={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: "minmax(0, 1fr) auto",
        alignItems: "center",
      }}
    >
      <div style={{ minWidth: 0, display: "grid", gap: 2 }}>
        <span style={{ fontWeight: 600, color: "#0f172a" }}>{option.label}</span>
        <span style={{ fontSize: 12, color: "#64748b" }}>{option.description}</span>
      </div>
      <span
        style={{
          borderRadius: 999,
          background: state.selected ? "#dbeafe" : "#f1f5f9",
          color: state.selected ? "#1d4ed8" : "#64748b",
          fontSize: 12,
          padding: "2px 8px",
        }}
      >
        {state.selected ? "已选" : state.active ? "高亮" : option.value}
      </span>
    </div>
  );
}

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 440 }}>
    <AutoComplete
      options={options}
      renderOption={renderOption}
      placeholder="搜索机场名称或代码"
    />
    <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>
      `label` 可以是 ReactNode，`textValue` 和 `keywords` 负责搜索，`renderOption`
      负责把展示层做得更丰富。
    </div>
  </div>
);

const code = `
import * as React from "react";
import {
  AutoComplete,
  type AutoCompleteOption,
  type AutoCompleteRenderOptionState,
} from "@ldkj/web-ui";

const options: AutoCompleteOption[] = [
  {
    label: "上海虹桥",
    value: "SHA",
    textValue: "上海虹桥",
    description: "Shanghai Hongqiao",
    keywords: ["虹桥", "上海机场"],
  },
  {
    label: "北京首都",
    value: "PEK",
    textValue: "北京首都",
    description: "Beijing Capital",
    keywords: ["首都", "北京机场"],
  },
  {
    label: "深圳宝安",
    value: "SZX",
    textValue: "深圳宝安",
    description: "Shenzhen Bao'an",
    keywords: ["宝安", "深圳机场"],
  },
];

function renderOption(
  option: AutoCompleteOption,
  state: AutoCompleteRenderOptionState,
) {
  return (
    <div
      style={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: "minmax(0, 1fr) auto",
        alignItems: "center",
      }}
    >
      <div style={{ minWidth: 0, display: "grid", gap: 2 }}>
        <span style={{ fontWeight: 600, color: "#0f172a" }}>{option.label}</span>
        <span style={{ fontSize: 12, color: "#64748b" }}>{option.description}</span>
      </div>
      <span
        style={{
          borderRadius: 999,
          background: state.selected ? "#dbeafe" : "#f1f5f9",
          color: state.selected ? "#1d4ed8" : "#64748b",
          fontSize: 12,
          padding: "2px 8px",
        }}
      >
        {state.selected ? "已选" : state.active ? "高亮" : option.value}
      </span>
    </div>
  );
}

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 440 }}>
    <AutoComplete
      options={options}
      renderOption={renderOption}
      placeholder="搜索机场名称或代码"
    />
    <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>
      \`label\` 可以是 ReactNode，\`textValue\` 和 \`keywords\` 负责搜索，\`renderOption\`
      负责把展示层做得更丰富。
    </div>
  </div>
);`;

export default function AutoCompleteRenderDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
