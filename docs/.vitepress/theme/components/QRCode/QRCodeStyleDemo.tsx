import { QRCode } from "@/index";
import CodeView from "../CodeView";

const code = `import { QRCode } from "@ldkj/web-ui";

export function Example() {
  return (
    <QRCode
      value="https://ldkj.com/brand"
      size={160}
      foregroundColor="#0f766e"
      backgroundColor="#ecfeff"
      errorCorrectionLevel="high"
      margin={1}
    />
  );
}`;

export default function QRCodeStyleDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center gap-4">
        <QRCode
          value="https://ldkj.com/brand"
          size={160}
          foregroundColor="#0f766e"
          backgroundColor="#ecfeff"
          errorCorrectionLevel="high"
          margin={1}
        />
        <div className="text-xs text-gray-500">自定义前景色、背景色与纠错级别</div>
      </div>
    </CodeView>
  );
}
