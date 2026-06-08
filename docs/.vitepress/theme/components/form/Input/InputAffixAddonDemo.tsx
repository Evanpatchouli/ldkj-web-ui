import { Input } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Input } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="grid max-w-md gap-4">
      <Input
        prefix="￥"
        suffix="RMB"
        addonBefore="单价"
        placeholder="请输入金额"
      />

      <Input addonBefore="https://" addonAfter=".com" placeholder="example" />

      <Input placeholder="请输入手机号">
        <Input.AddonBefore>+86</Input.AddonBefore>
        <Input.Prefix>手机</Input.Prefix>
        <Input.Suffix>必填</Input.Suffix>
      </Input>

      <Input placeholder="请输入折扣">
        <Input.Addon position="before">折扣</Input.Addon>
        <Input.Suffix>%</Input.Suffix>
        <Input.Addon position="after">OFF</Input.Addon>
      </Input>
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid max-w-md gap-4">
      <Input
        prefix="￥"
        suffix="RMB"
        addonBefore="单价"
        placeholder="请输入金额"
      />

      <Input addonBefore="https://" addonAfter=".com" placeholder="example" />

      <Input placeholder="请输入手机号">
        <Input.AddonBefore>+86</Input.AddonBefore>
        <Input.Prefix>手机</Input.Prefix>
        <Input.Suffix>必填</Input.Suffix>
      </Input>

      <Input placeholder="请输入折扣">
        <Input.Addon position="before">折扣</Input.Addon>
        <Input.Suffix>%</Input.Suffix>
        <Input.Addon position="after">OFF</Input.Addon>
      </Input>
    </div>
  );
}

export default function InputAffixAddonDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
