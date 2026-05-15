import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  { label: "标准版", value: "standard" },
  { label: "专业版", value: "pro" },
  { label: "企业版", value: "enterprise", disabled: true },
];

const code = `import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";

const options = [
  { label: "标准版", value: "standard" },
  { label: "专业版", value: "pro" },
  { label: "企业版", value: "enterprise", disabled: true },
];

export function Example() {
  return (
    <Select defaultValue="pro">
      <SelectTrigger className="w-64">
        <SelectValue placeholder="请选择版本" />
      </SelectTrigger>
      <SelectContent>
        <SelectItems options={options} />
      </SelectContent>
    </Select>
  );
}`;

function Example() {
  return (
    <Select defaultValue="pro">
      <SelectTrigger className="w-64">
        <SelectValue placeholder="请选择版本" />
      </SelectTrigger>
      <SelectContent>
        <SelectItems options={options} />
      </SelectContent>
    </Select>
  );
}

export default function SelectBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

