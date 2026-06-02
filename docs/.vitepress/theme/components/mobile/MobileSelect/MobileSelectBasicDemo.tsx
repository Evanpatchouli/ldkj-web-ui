import CodeView from "../../CodeView";
import { MobileSelect, type SelectOption } from "@ldkj/web-ui";

const options: SelectOption[] = [
  { label: "标准洗车", value: "wash" },
  { label: "精致美容", value: "beauty" },
  { label: "轮胎养护", value: "tire" },
  { label: "漆面修复", value: "paint", disabled: true },
];

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
    <MobileSelect
      options={options}
      defaultValue="beauty"
      title="选择服务"
      placeholder="请选择服务项目"
      clearable
    />
  </div>
);

const code = `import { MobileSelect } from "@ldkj/web-ui";

const options = [
  { label: "标准洗车", value: "wash" },
  { label: "精致美容", value: "beauty" },
  { label: "轮胎养护", value: "tire" },
  { label: "漆面修复", value: "paint", disabled: true },
];

export function Example() {
  return (
    <MobileSelect
      options={options}
      defaultValue="beauty"
      title="选择服务"
      placeholder="请选择服务项目"
      clearable
    />
  );
}`;

export default function MobileSelectBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
