import * as React from "react";
import { Cascader, type CascaderOption } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const areaOptions: CascaderOption[] = [
  {
    label: "浙江",
    value: "zhejiang",
    children: [
      { label: "杭州", value: "hangzhou" },
      { label: "宁波", value: "ningbo" },
      { label: "温州", value: "wenzhou" },
      { label: "绍兴", value: "shaoxing" },
      { label: "湖州", value: "huzhou" },
      { label: "嘉兴", value: "jiaxing" },
      { label: "台州", value: "taizhou-zj" },
      { label: "丽水", value: "lishui" },
    ],
  },
  {
    label: "江苏",
    value: "jiangsu",
    children: [
      { label: "南京", value: "nanjing" },
      { label: "苏州", value: "suzhou" },
      { label: "无锡", value: "wuxi" },
      { label: "常州", value: "changzhou" },
      { label: "镇江", value: "zhenjiang" },
      { label: "南通", value: "nantong" },
      { label: "泰州", value: "taizhou-js" },
      { label: "盐城", value: "yancheng" },
    ],
  },
  {
    label: "广东",
    value: "guangdong",
    children: [
      { label: "广州", value: "guangzhou" },
      { label: "深圳", value: "shenzhen" },
      { label: "佛山", value: "foshan" },
      { label: "东莞", value: "dongguan" },
      { label: "中山", value: "zhongshan" },
      { label: "珠海", value: "zhuhai" },
      { label: "江门", value: "jiangmen" },
      { label: "惠州", value: "huizhou" },
    ],
  },
];

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
    <Cascader
      options={areaOptions}
      defaultValue={["zhejiang", "hangzhou"]}
      placeholder="请选择所在地区"
      clearable
    />
    <Cascader options={areaOptions} placeholder="请选择所在地区" />
  </div>
);

const code = `import { Cascader } from "@ldkj/web-ui";

const areaOptions = [
  {
    label: "浙江",
    value: "zhejiang",
    children: [
      { label: "杭州", value: "hangzhou" },
      { label: "宁波", value: "ningbo" },
      { label: "温州", value: "wenzhou" },
      { label: "绍兴", value: "shaoxing" },
      { label: "湖州", value: "huzhou" },
      { label: "嘉兴", value: "jiaxing" },
      { label: "台州", value: "taizhou-zj" },
      { label: "丽水", value: "lishui" },
    ],
  },
  {
    label: "江苏",
    value: "jiangsu",
    children: [
      { label: "南京", value: "nanjing" },
      { label: "苏州", value: "suzhou" },
      { label: "无锡", value: "wuxi" },
      { label: "常州", value: "changzhou" },
      { label: "镇江", value: "zhenjiang" },
      { label: "南通", value: "nantong" },
      { label: "泰州", value: "taizhou-js" },
      { label: "盐城", value: "yancheng" },
    ],
  },
  {
    label: "广东",
    value: "guangdong",
    children: [
      { label: "广州", value: "guangzhou" },
      { label: "深圳", value: "shenzhen" },
      { label: "佛山", value: "foshan" },
      { label: "东莞", value: "dongguan" },
      { label: "中山", value: "zhongshan" },
      { label: "珠海", value: "zhuhai" },
      { label: "江门", value: "jiangmen" },
      { label: "惠州", value: "huizhou" },
    ],
  },
];

export function Example() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <Cascader
        options={areaOptions}
        defaultValue={["zhejiang", "hangzhou"]}
        placeholder="请选择所在地区"
        clearable
      />
      <Cascader options={areaOptions} placeholder="请选择所在地区" />
    </div>
  );
}`;

export default function CascaderDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
