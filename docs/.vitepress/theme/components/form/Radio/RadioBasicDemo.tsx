import { RadioGroup } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  { label: "标准版", value: "standard" },
  { label: "专业版", value: "pro" },
  { label: "企业版", value: "enterprise", disabled: true },
];

const code = `import { RadioGroup } from "@ldkj/web-ui";

const options = [
  { label: "标准版", value: "standard" },
  { label: "专业版", value: "pro" },
  { label: "企业版", value: "enterprise", disabled: true },
];

export function Example() {
  return (
    <RadioGroup
      name="plan"
      defaultValue="pro"
      options={options}
    />
  );
}`;

function Example() {
  return <RadioGroup name="plan" defaultValue="pro" options={options} />;
}

export default function RadioBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

