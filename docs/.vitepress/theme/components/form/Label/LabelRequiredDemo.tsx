import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import CodeView from "../../CodeView";

const code = `import { Input, Label } from "@ldkj/web-ui";

export function Example() {
  return (
    <Label
      htmlFor="contactPhone"
      label="联系电话"
      required
      colon
      labelWidth={120}
    >
      <Input id="contactPhone" placeholder="请输入联系电话" />
    </Label>
  );
}`;

function Example() {
  return (
    <Label
      htmlFor="contactPhone"
      label="联系电话"
      required
      colon
      labelWidth={120}
    >
      <Input id="contactPhone" placeholder="请输入联系电话" />
    </Label>
  );
}

export default function LabelRequiredDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
