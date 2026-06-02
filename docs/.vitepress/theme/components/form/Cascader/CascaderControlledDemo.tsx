import * as React from "react";
import { Cascader, type CascaderOption } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options: CascaderOption[] = [
  {
    label: "华东",
    value: "east",
    children: [
      {
        label: "浙江",
        value: "zhejiang",
        children: [
          { label: "杭州", value: "hangzhou" },
          { label: "宁波", value: "ningbo" },
        ],
      },
      {
        label: "江苏",
        value: "jiangsu",
        children: [
          { label: "南京", value: "nanjing" },
          { label: "苏州", value: "suzhou" },
        ],
      },
    ],
  },
  {
    label: "华南",
    value: "south",
    children: [
      {
        label: "广东",
        value: "guangdong",
        children: [
          { label: "广州", value: "guangzhou" },
          { label: "深圳", value: "shenzhen" },
        ],
      },
    ],
  },
];

const Example = () => {
  const [value, setValue] = React.useState<string[]>(["east", "zhejiang", "hangzhou"]);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 460 }}>
      <Cascader
        options={options}
        value={value}
        onValueChange={setValue}
        clearable
        placeholder="请选择组织层级"
      />
      <div style={{ fontSize: 12, color: "#64748b" }}>
        当前路径：{value.length > 0 ? value.join(" / ") : "-"}
      </div>
    </div>
  );
};

const code = `import * as React from "react";
import { Cascader } from "@ldkj/web-ui";

const options = [
  {
    label: "华东",
    value: "east",
    children: [
      {
        label: "浙江",
        value: "zhejiang",
        children: [
          { label: "杭州", value: "hangzhou" },
          { label: "宁波", value: "ningbo" },
        ],
      },
      {
        label: "江苏",
        value: "jiangsu",
        children: [
          { label: "南京", value: "nanjing" },
          { label: "苏州", value: "suzhou" },
        ],
      },
    ],
  },
  {
    label: "华南",
    value: "south",
    children: [
      {
        label: "广东",
        value: "guangdong",
        children: [
          { label: "广州", value: "guangzhou" },
          { label: "深圳", value: "shenzhen" },
        ],
      },
    ],
  },
];

export function Example() {
  const [value, setValue] = React.useState(["east", "zhejiang", "hangzhou"]);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 460 }}>
      <Cascader
        options={options}
        value={value}
        onValueChange={setValue}
        clearable
        placeholder="请选择组织层级"
      />
      <div style={{ fontSize: 12, color: "#64748b" }}>
        当前路径：{value.length > 0 ? value.join(" / ") : "-"}
      </div>
    </div>
  );
}`;

export default function CascaderControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
