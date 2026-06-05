import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";

const Example = () => (
  <div className="grid gap-2">
    <label className="text-sm font-medium text-slate-700">通知渠道</label>
    <Select defaultValue="wechat">
      <SelectTrigger className="w-72" aria-label="通知渠道">
        <SelectValue placeholder="请选择通知渠道" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>即时通知</SelectLabel>
          <SelectItem value="sms">短信</SelectItem>
          <SelectItem value="wechat">企业微信</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>异步通知</SelectLabel>
          <SelectItem value="email">邮件</SelectItem>
          <SelectItem value="message">站内信</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);`;

const Example = () => (
  <div className="grid gap-2">
    <label className="text-sm font-medium text-slate-700">通知渠道</label>
    <Select defaultValue="wechat">
      <SelectTrigger className="w-72" aria-label="通知渠道">
        <SelectValue placeholder="请选择通知渠道" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>即时通知</SelectLabel>
          <SelectItem value="sms">短信</SelectItem>
          <SelectItem value="wechat">企业微信</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>异步通知</SelectLabel>
          <SelectItem value="email">邮件</SelectItem>
          <SelectItem value="message">站内信</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export default function SelectGroupedDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

