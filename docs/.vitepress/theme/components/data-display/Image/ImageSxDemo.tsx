import CodeView from "../../CodeView";
import { Image } from "@ldkj/web-ui";

const demoImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='720' height='360' viewBox='0 0 720 360'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23f0f9ff'/%3E%3Cstop offset='1' stop-color='%23bae6fd'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='720' height='360' fill='url(%23g)'/%3E%3Crect x='72' y='70' width='576' height='220' rx='32' fill='%230284c7' opacity='.18'/%3E%3Cpath d='M90 252c72-64 148-88 228-72 56 11 94 42 150 42 48 0 92-24 162-78v146H90z' fill='%230369a1' opacity='.72'/%3E%3C/svg%3E";

const code = `import { Image } from "@ldkj/web-ui";

export function Example() {
  return (
    <Image
      src={demoImage}
      alt="sx 样式示例"
      sx={{
        width: "100%",
        maxWidth: 560,
        aspectRatio: "16/9",
        borderRadius: 16,
        border: "4px solid #0ea5e9",
        boxShadow: "0 18px 45px rgba(14, 165, 233, 0.28)",
      }}
      fit="cover"
    />
  );
}`;

function Example() {
  return (
    <Image
      src={demoImage}
      alt="sx 样式示例"
      sx={{
        width: "100%",
        maxWidth: 560,
        aspectRatio: "16/9",
        borderRadius: 16,
        border: "4px solid #0ea5e9",
        boxShadow: "0 18px 45px rgba(14, 165, 233, 0.28)",
      }}
      fit="cover"
    />
  );
}

export default function ImageSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
