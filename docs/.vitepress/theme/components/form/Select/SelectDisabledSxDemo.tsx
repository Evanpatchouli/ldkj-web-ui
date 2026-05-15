import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  { label: "短信", value: "sms" },
  {
    label: "邮件",
    value: "email",
    sx: {
      color: "#2563eb",
      fontWeight: 600,
    },
  },
  { label: "站内信", value: "message", disabled: true },
];

const code = `import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";

const options = [
  { label: "短信", value: "sms" },
  {
    label: "邮件",
    value: "email",
    sx: {
      color: "#2563eb",
      fontWeight: 600,
    },
  },
  { label: "站内信", value: "message", disabled: true },
];

export function Example() {
  return (
    <div className="grid gap-3">
      <Select defaultValue="email">
        <SelectTrigger
          className="w-64"
          sx={{
            borderColor: "#93c5fd",
            backgroundColor: "#eff6ff",
          }}
        >
          <SelectValue placeholder="请选择通知方式" />
        </SelectTrigger>
        <SelectContent
          sx={{
            borderColor: "#bfdbfe",
            boxShadow: "0 12px 32px rgba(37, 99, 235, 0.16)",
          }}
        >
          <SelectItems options={options} />
        </SelectContent>
      </Select>

      <Select disabled>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="已禁用" />
        </SelectTrigger>
        <SelectContent>
          <SelectItems options={options} />
        </SelectContent>
      </Select>
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-3">
      <Select defaultValue="email">
        <SelectTrigger
          className="w-64"
          sx={{
            borderColor: "#93c5fd",
            backgroundColor: "#eff6ff",
          }}
        >
          <SelectValue placeholder="请选择通知方式" />
        </SelectTrigger>
        <SelectContent
          sx={{
            borderColor: "#bfdbfe",
            boxShadow: "0 12px 32px rgba(37, 99, 235, 0.16)",
          }}
        >
          <SelectItems options={options} />
        </SelectContent>
      </Select>

      <Select disabled>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="已禁用" />
        </SelectTrigger>
        <SelectContent>
          <SelectItems options={options} />
        </SelectContent>
      </Select>
    </div>
  );
}

export default function SelectDisabledSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

