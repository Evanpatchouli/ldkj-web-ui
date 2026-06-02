import * as React from "react";
import { AutoComplete } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  { label: "北京", value: "北京", description: "华北中心", keywords: ["首都", "京"] },
  { label: "上海", value: "上海", description: "华东中心", keywords: ["申", "魔都"] },
  { label: "深圳", value: "深圳", description: "华南中心", keywords: ["深", "鹏城"] },
  { label: "杭州", value: "杭州", description: "数字经济", keywords: ["杭", "西湖"] },
  { label: "成都", value: "成都", description: "西南枢纽", keywords: ["蓉", "天府"] },
];

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
    <AutoComplete options={options} placeholder="输入城市名" />
    <AutoComplete options={options} defaultValue="深圳" disabled />
  </div>
);

const code = `
import { AutoComplete } from "@ldkj/web-ui";

const options = [
  { label: "北京", value: "北京", description: "华北中心", keywords: ["首都", "京"] },
  { label: "上海", value: "上海", description: "华东中心", keywords: ["申", "魔都"] },
  { label: "深圳", value: "深圳", description: "华南中心", keywords: ["深", "鹏城"] },
  { label: "杭州", value: "杭州", description: "数字经济", keywords: ["杭", "西湖"] },
  { label: "成都", value: "成都", description: "西南枢纽", keywords: ["蓉", "天府"] },
];

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
    <AutoComplete options={options} placeholder="输入城市名" />
    <AutoComplete options={options} defaultValue="深圳" disabled />
  </div>
);`;

export default function AutoCompleteDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
