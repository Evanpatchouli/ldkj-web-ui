import { Input } from "@ldkj/web-ui";
import { Label } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Input, Label } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="grid gap-4">
      <Label
        htmlFor="owner"
        label="负责人"
        colon
        labelWidth={88}
        labelAlign="right"
      >
        <Input id="owner" placeholder="请输入负责人" />
      </Label>

      <Label
        htmlFor="remark"
        label="备注"
        position="top"
        colon
      >
        <Input id="remark" placeholder="请输入备注" />
      </Label>
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-4">
      <Label
        htmlFor="owner"
        label="负责人"
        colon
        labelWidth={88}
        labelAlign="right"
      >
        <Input id="owner" placeholder="请输入负责人" />
      </Label>

      <Label htmlFor="remark" label="备注" position="top" colon>
        <Input id="remark" placeholder="请输入备注" />
      </Label>
    </div>
  );
}

export default function LabelLayoutDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

