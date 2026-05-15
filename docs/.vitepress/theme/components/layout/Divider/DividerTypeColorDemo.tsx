import { Divider } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Divider } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="space-y-4">
      <Divider type="solid" color="text-gray-200" />
      <Divider type="dashed" color="text-amber-300" />
      <Divider type="dotted" color="text-green-300" />
    </div>
  );
}`;

export default function DividerTypeColorDemo() {
  return (
    <CodeView code={code}>
      <div className="space-y-4">
        <Divider type="solid" color="text-gray-200" />
        <Divider type="dashed" color="text-amber-300" />
        <Divider type="dotted" color="text-green-300" />
      </div>
    </CodeView>
  );
}

