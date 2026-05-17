import CodeView from "../../CodeView";
import { Image } from "@ldkj/web-ui";

const ossImage = "https://example-bucket.oss-cn-hangzhou.aliyuncs.com/banner.jpg";

const code = `import { Image } from "@ldkj/web-ui";

const ossImage = "https://example-bucket.oss-cn-hangzhou.aliyuncs.com/banner.jpg";

export function Example() {
  return (
    <Image
      src={ossImage}
      alt="OSS 裁剪图"
      width={320}
      height={180}
      crop
      fit="cover"
      loadingFallback={<div>加载中...</div>}
      fallback={
        <div className="flex h-full w-full items-center justify-center text-sm text-slate-600">
          OSS 示例地址不可访问，仅演示 URL 裁剪参数生成
        </div>
      }
      sx={{ border: "1px solid #cbd5e1", borderRadius: 12 }}
    />
  );
}`;

const Example = () => (
  <Image
    src={ossImage}
    alt="OSS 裁剪图"
    width={320}
    height={180}
    crop
    fit="cover"
    loadingFallback={<div>加载中...</div>}
    fallback={
      <div className="flex h-full w-full items-center justify-center text-sm text-slate-600">
        OSS 示例地址不可访问，仅演示 URL 裁剪参数生成
      </div>
    }
    sx={{ border: "1px solid #cbd5e1", borderRadius: 12 }}
  />
);

export default function ImageCropDemo() {
  return (
    <CodeView code={code}>
      <div className="grid gap-3">
        <Example />
        <div className="text-xs text-slate-500">
          开启 <code>crop</code> 且传入数值型 <code>width/height</code> 时，默认会在 URL 后拼接
          <code>x-oss-process=image/resize,m_fill,w_320,h_180</code>。
        </div>
      </div>
    </CodeView>
  );
}
