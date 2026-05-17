import CodeView from "../../CodeView";
import { Image } from "@ldkj/web-ui";

const previewImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='960' height='540' viewBox='0 0 960 540'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23dbeafe'/%3E%3Cstop offset='1' stop-color='%23a7f3d0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='960' height='540' fill='url(%23bg)'/%3E%3Cpath d='M0 420 170 280 320 352 470 232 960 470v70H0z' fill='%230f766e' opacity='.72'/%3E%3Ccircle cx='760' cy='130' r='84' fill='%230ea5e9' opacity='.85'/%3E%3Ctext x='56' y='116' fill='%230f172a' font-family='Arial' font-size='42' font-weight='700'%3EPreview Demo%3C/text%3E%3C/svg%3E";

const code = `import { Image } from "@ldkj/web-ui";

export function Example() {
  return (
    <Image
      src={previewImage}
      alt="可点击预览图"
      preview
      aspectRatio="16/9"
      fit="cover"
      className="w-full rounded-lg"
      sx={{
        maxWidth: 560,
        border: "2px solid #38bdf8",
      }}
    />
  );
}`;

function Example() {
  return (
    <Image
      src={previewImage}
      alt="可点击预览图"
      preview
      aspectRatio="16/9"
      fit="cover"
      className="w-full rounded-lg"
      sx={{
        maxWidth: 560,
        border: "2px solid #38bdf8",
      }}
    />
  );
}

export default function ImagePreviewDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
