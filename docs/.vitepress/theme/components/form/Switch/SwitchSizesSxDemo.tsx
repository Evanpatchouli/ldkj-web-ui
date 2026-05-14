import { Switch } from "@/components/form/switch";
import CodeView from "../../CodeView";

const code = `import { Switch } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Switch size="sm" defaultChecked label="Small" />
      <Switch size="md" defaultChecked label="Medium" />
      <Switch size="lg" defaultChecked label="Large" />
      <Switch
        defaultChecked
        label="自定义强调色"
        sx={{
          backgroundColor: "#cbd5e1",
          "&[data-state=checked]": {
            backgroundColor: "#10b981",
          },
        }}
        containerSx={{
          padding: 8,
          borderRadius: 8,
          backgroundColor: "#f8fafc",
        }}
      />
    </div>
  );
}`;

function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Switch size="sm" defaultChecked label="Small" />
      <Switch size="md" defaultChecked label="Medium" />
      <Switch size="lg" defaultChecked label="Large" />
      <Switch
        defaultChecked
        label="自定义强调色"
        sx={{
          backgroundColor: "#cbd5e1",
          "&[data-state=checked]": {
            backgroundColor: "#10b981",
          },
        }}
        containerSx={{
          padding: 8,
          borderRadius: 8,
          backgroundColor: "#f8fafc",
        }}
      />
    </div>
  );
}

export default function SwitchSizesSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
