import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import CodeView from "../../CodeView";

const code = `import { Input, Label } from "@ldkj/web-ui";

export function Example() {
  return (
    <Label
      htmlFor="department"
      label="所属部门"
      required
      colon="："
      labelWidth={120}
      containerSx={{
        padding: 12,
        border: "1px solid #dbeafe",
        borderRadius: 8,
        backgroundColor: "#eff6ff",
      }}
      sx={{
        color: "#1d4ed8",
      }}
    >
      <Input id="department" placeholder="请输入所属部门" />
    </Label>
  );
}`;

function Example() {
  return (
    <Label
      htmlFor="department"
      label="所属部门"
      required
      colon="："
      labelWidth={120}
      containerSx={{
        padding: 12,
        border: "1px solid #dbeafe",
        borderRadius: 8,
        backgroundColor: "#eff6ff",
      }}
      sx={{
        color: "#1d4ed8",
      }}
    >
      <Input id="department" placeholder="请输入所属部门" />
    </Label>
  );
}

export default function LabelSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
