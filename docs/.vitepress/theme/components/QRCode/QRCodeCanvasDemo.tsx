import { QRCode } from "@/index";
import CodeView from "../CodeView";

const code = `import { QRCode } from "@ldkj/web-ui";

export function Example() {
  return <QRCode canvas value="https://ldkj.com/docs" />;
}`;

export default function QRCodeCanvasDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center gap-4">
        <QRCode canvas value="https://ldkj.com/docs" />
        <div className="text-xs text-gray-500">
          canvas 模式，适合动态重绘场景
        </div>
      </div>
    </CodeView>
  );
}
