import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  { label: "短信提醒", value: "sms" },
  {
    label: "邮件日报",
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
  { label: "短信提醒", value: "sms" },
  {
    label: "邮件日报",
    value: "email",
    sx: {
      color: "#2563eb",
      fontWeight: 600,
    },
  },
  { label: "站内信", value: "message", disabled: true },
];

const Example = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-700">提醒方式</label>
      <Select defaultValue="email">
        <SelectTrigger
          className="w-64"
          aria-label="提醒方式"
          sx={{
            borderColor: "#93c5fd",
            backgroundColor: "#eff6ff",
          }}
        >
          <SelectValue placeholder="请选择提醒方式" />
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
    </div>

    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-500">审批人</label>
      <Select disabled>
        <SelectTrigger className="w-64" aria-label="审批人">
          <SelectValue placeholder="当前无可选审批人" />
        </SelectTrigger>
        <SelectContent>
          <SelectItems options={options} />
        </SelectContent>
      </Select>
    </div>
  </div>
);`;

const Example = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-700">提醒方式</label>
      <Select defaultValue="email">
        <SelectTrigger
          className="w-64"
          aria-label="提醒方式"
          sx={{
            borderColor: "#93c5fd",
            backgroundColor: "#eff6ff",
          }}
        >
          <SelectValue placeholder="请选择提醒方式" />
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
    </div>

    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-500">审批人</label>
      <Select disabled>
        <SelectTrigger className="w-64" aria-label="审批人">
          <SelectValue placeholder="当前无可选审批人" />
        </SelectTrigger>
        <SelectContent>
          <SelectItems options={options} />
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default function SelectDisabledSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

