import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/form/select";
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

export function Example() {
  return (
    <Select defaultValue="wechat">
      <SelectTrigger className="w-72">
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
  );
}`;

function Example() {
  return (
    <Select defaultValue="wechat">
      <SelectTrigger className="w-72">
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
  );
}

export default function SelectGroupedDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
