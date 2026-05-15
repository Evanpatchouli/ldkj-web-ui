import { Divider } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Divider } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex items-stretch gap-4 rounded border border-gray-100 p-4">
      <span>A</span>
      <Divider vertical />
      <span>B</span>
      <Divider vertical variant="middle" type="dashed" color="text-blue-300" />
      <span>C</span>
    </div>
  );
}`;

export default function DividerVerticalDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-stretch gap-4 rounded border border-gray-100 p-4">
        <div className="text-sm self-center text-gray-500">A</div>
        <Divider vertical />
        <div className="text-sm self-center text-gray-500">B</div>
        <Divider vertical variant="middle" type="dashed" color="text-blue-300" />
        <div className="text-sm self-center text-gray-500">C</div>
      </div>
    </CodeView>
  );
}

