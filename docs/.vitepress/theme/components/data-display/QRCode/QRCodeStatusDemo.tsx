import { QRCode } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { QRCode } from "@ldkj/web-ui";

export function Example() {
  return (
    <QRCode
      value="https://ldkj.com/expired-ticket"
      size={160}
      useful={false}
      uselessElem={<span>已失效</span>}
    />
  );
}`;

export default function QRCodeStatusDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center gap-4">
        <QRCode
          value="https://ldkj.com/expired-ticket"
          size={160}
          useful={false}
          uselessElem={<span className="text-sm font-medium">已失效</span>}
        />
        <div className="text-xs text-gray-500">可用于票据过期、二维码不可用等状态</div>
      </div>
    </CodeView>
  );
}

