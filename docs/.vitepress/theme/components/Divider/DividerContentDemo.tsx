import { Divider } from "@/index";
import CodeView from "../CodeView";

const code = `import { Divider } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="space-y-4">
      <Divider align="left">Left</Divider>
      <Divider align="center">Center</Divider>
      <Divider align="right">Right</Divider>
    </div>
  );
}`;

export default function DividerContentDemo() {
  return (
    <CodeView code={code}>
      <div className="space-y-4">
        <Divider align="left">
          <span className="text-xs text-gray-500">Left</span>
        </Divider>
        <Divider align="center">
          <span className="text-xs text-gray-500">Center</span>
        </Divider>
        <Divider align="right">
          <span className="text-xs text-gray-500">Right</span>
        </Divider>
      </div>
    </CodeView>
  );
}
