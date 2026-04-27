import { QRCode } from "@/index";
import CodeView from "../../CodeView";

const code = `import { QRCode } from "@ldkj/web-ui";

export function Example() {
  return <QRCode value="https://ldkj.com" />;
}`;

export default function QRCodeBasicDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center gap-4">
        <QRCode value="https://ldkj.com" />
        <div className="text-xs text-gray-500">默认使用图片模式渲染</div>
      </div>
    </CodeView>
  );
}
