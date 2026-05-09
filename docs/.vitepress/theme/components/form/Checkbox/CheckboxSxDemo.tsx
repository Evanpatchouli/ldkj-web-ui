import { Checkbox } from "@/components/form/checkbox";
import CodeView from "../../CodeView";

const code = `import { Checkbox } from "@ldkj/web-ui";

export function Example() {
  return (
    <label className="flex items-center gap-3 text-sm text-slate-700">
      <Checkbox
        defaultChecked
        sx={{
          width: 22,
          height: 22,
          borderRadius: "100%",
          borderColor: "#10b981",
          "&[data-state=checked]": {
            backgroundColor: "#10b981",
            borderColor: "#10b981",
          },
        }}
      />
      使用 sx 定制尺寸、圆角与选中颜色
    </label>
  );
}`;

function Example() {
  return (
    <label className="flex items-center gap-3 text-sm text-slate-700">
      <Checkbox
        defaultChecked
        sx={{
          width: 22,
          height: 22,
          borderRadius: "100%",
          borderColor: "#10b981",
          "&[data-state=checked]": {
            backgroundColor: "#10b981",
            borderColor: "#10b981",
          },
        }}
      />
      使用 sx 定制尺寸、圆角与选中颜色
    </label>
  );
}

export default function CheckboxSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
