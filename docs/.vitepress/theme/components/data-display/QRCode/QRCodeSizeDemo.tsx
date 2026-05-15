import { QRCode } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { QRCode } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex items-end gap-4">
      <QRCode value="https://ldkj.com/s" size={96} />
      <QRCode value="https://ldkj.com/m" size={140} />
      <QRCode value="https://ldkj.com/l" size="180px" />
    </div>
  );
}`;

export default function QRCodeSizeDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-end gap-4">
        <div className="space-y-2">
          <QRCode value="https://ldkj.com/s" size={96} />
          <div className="text-center text-xs text-gray-500">size=96</div>
        </div>
        <div className="space-y-2">
          <QRCode value="https://ldkj.com/m" size={140} />
          <div className="text-center text-xs text-gray-500">size=140</div>
        </div>
        <div className="space-y-2">
          <QRCode value="https://ldkj.com/l" size="180px" />
          <div className="text-center text-xs text-gray-500">size="180px"</div>
        </div>
      </div>
    </CodeView>
  );
}

