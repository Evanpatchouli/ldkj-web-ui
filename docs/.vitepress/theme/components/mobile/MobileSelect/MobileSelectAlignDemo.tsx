import CodeView from "../../CodeView";
import { MobileSelect, type SelectOptionGroup } from "@ldkj/web-ui";

const groupedOptions: SelectOptionGroup[] = [
  {
    label: "门店状态",
    options: [
      { label: "营业中", value: "open" },
      { label: "休息中", value: "resting" },
      { label: "暂停接单", value: "paused" },
    ],
  },
  {
    label: "审核状态",
    separator: true,
    options: [
      { label: "待审核", value: "pending" },
      { label: "已通过", value: "approved" },
      { label: "已驳回", value: "rejected" },
    ],
  },
];

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
    <MobileSelect
      options={groupedOptions}
      title="左对齐"
      placeholder="左对齐选项"
      align="left"
    />
    <MobileSelect
      options={groupedOptions}
      title="居中对齐"
      placeholder="居中对齐选项"
      align="center"
    />
    <MobileSelect
      options={groupedOptions}
      title="右对齐"
      placeholder="右对齐选项"
      align="right"
    />
  </div>
);

const code = `import { MobileSelect } from "@ldkj/web-ui";

const groupedOptions = [
  {
    label: "门店状态",
    options: [
      { label: "营业中", value: "open" },
      { label: "休息中", value: "resting" },
      { label: "暂停接单", value: "paused" },
    ],
  },
  {
    label: "审核状态",
    separator: true,
    options: [
      { label: "待审核", value: "pending" },
      { label: "已通过", value: "approved" },
      { label: "已驳回", value: "rejected" },
    ],
  },
];

export function Example() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <MobileSelect options={groupedOptions} title="左对齐" align="left" />
      <MobileSelect options={groupedOptions} title="居中对齐" align="center" />
      <MobileSelect options={groupedOptions} title="右对齐" align="right" />
    </div>
  );
}`;

export default function MobileSelectAlignDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
