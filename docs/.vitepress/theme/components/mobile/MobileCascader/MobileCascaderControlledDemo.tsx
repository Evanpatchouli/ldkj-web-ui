import * as React from "react";
import CodeView from "../../CodeView";
import { MobileCascader, type CascaderOption } from "@ldkj/web-ui";

const categoryOptions: CascaderOption[] = [
  {
    label: "车辆服务",
    value: "vehicle",
    children: [
      { label: "洗车美容", value: "wash" },
      { label: "保养维修", value: "repair" },
      { label: "轮胎服务", value: "tire" },
    ],
  },
  {
    label: "门店运营",
    value: "store",
    children: [
      { label: "营业配置", value: "business" },
      { label: "人员排班", value: "schedule" },
      { label: "价格策略", value: "price" },
    ],
  },
];

const Example = () => {
  const [value, setValue] = React.useState<string[]>(["vehicle", "wash"]);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <MobileCascader
        options={categoryOptions}
        value={value}
        onValueChange={setValue}
        title="业务分类"
        placeholder="请选择业务分类"
        levelLabels={["一级", "二级"]}
        changeOnSelect
        align="center"
      />
      <div style={{ color: "#475569", fontSize: 13 }}>
        当前值: {value.length > 0 ? value.join(" / ") : "未选择"}
      </div>
    </div>
  );
};

const code = `import * as React from "react";
import { MobileCascader } from "@ldkj/web-ui";

const categoryOptions = [
  {
    label: "车辆服务",
    value: "vehicle",
    children: [
      { label: "洗车美容", value: "wash" },
      { label: "保养维修", value: "repair" },
      { label: "轮胎服务", value: "tire" },
    ],
  },
  {
    label: "门店运营",
    value: "store",
    children: [
      { label: "营业配置", value: "business" },
      { label: "人员排班", value: "schedule" },
      { label: "价格策略", value: "price" },
    ],
  },
];

export function Example() {
  const [value, setValue] = React.useState(["vehicle", "wash"]);

  return (
    <MobileCascader
      options={categoryOptions}
      value={value}
      onValueChange={setValue}
      title="业务分类"
      placeholder="请选择业务分类"
      levelLabels={["一级", "二级"]}
      changeOnSelect
      align="center"
    />
  );
}`;

export default function MobileCascaderControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
