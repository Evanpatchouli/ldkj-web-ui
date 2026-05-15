import { CheckboxGroup } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  {
    label: "高优先级告警",
    value: "critical",
    description: "发送到值班群并触发电话提醒",
  },
  {
    label: "普通告警",
    value: "normal",
    description: "仅发送到通知中心",
  },
];

const code = `import { CheckboxGroup } from "@ldkj/web-ui";

export function Example() {
  return (
    <CheckboxGroup
      name="alerts"
      defaultValue={["critical"]}
      options={options}
      sx={{
        padding: 12,
        border: "1px solid #bae6fd",
        borderRadius: 12,
        backgroundColor: "#f0f9ff",
      }}
    />
  );
}`;

function Example() {
  return (
    <CheckboxGroup
      name="alerts"
      defaultValue={["critical"]}
      options={options}
      sx={{
        padding: 12,
        border: "1px solid #bae6fd",
        borderRadius: 12,
        backgroundColor: "#f0f9ff",
      }}
    />
  );
}

export default function CheckboxGroupSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

