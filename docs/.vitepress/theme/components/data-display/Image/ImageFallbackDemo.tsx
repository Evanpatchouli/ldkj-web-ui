import CodeView from "../../CodeView";
import { Image } from "@ldkj/web-ui";

const code = `import { Image } from "@ldkj/web-ui";

export function Example() {
  return (
    <Image
      src="data:image/png;base64,not-a-valid-image"
      alt="加载失败示例"
      aspectRatio="16/9"
      fallback={
        <div className="grid h-full place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm font-medium text-slate-600">
          图片加载失败
        </div>
      }
    />
  );
}`;

function Example() {
  return (
    <Image
      src="data:image/png;base64,not-a-valid-image"
      alt="加载失败示例"
      aspectRatio="16/9"
      fallback={
        <div className="grid h-full place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm font-medium text-slate-600">
          图片加载失败
        </div>
      }
    />
  );
}

export default function ImageFallbackDemo() {
  return (
    <CodeView code={code}>
      <div className="max-w-xl">
        <Example />
      </div>
    </CodeView>
  );
}
