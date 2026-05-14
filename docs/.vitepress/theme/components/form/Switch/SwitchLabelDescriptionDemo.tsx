import { Switch } from "@/components/form/switch";
import CodeView from "../../CodeView";

const code = `import { Switch } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Switch
        defaultChecked
        label="营销消息"
        description="开启后会通过短信或站内信接收活动提醒。"
      />
      <Switch
        label="公开资料"
        description="允许团队成员查看你的基础资料。"
        labelPosition="left"
      />
    </div>
  );
}`;

function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Switch
        defaultChecked
        label="营销消息"
        description="开启后会通过短信或站内信接收活动提醒。"
      />
      <Switch
        label="公开资料"
        description="允许团队成员查看你的基础资料。"
        labelPosition="left"
      />
    </div>
  );
}

export default function SwitchLabelDescriptionDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
