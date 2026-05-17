import CodeView from "../../CodeView";
import { Image } from "@ldkj/web-ui";

const demoImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='720' height='360' viewBox='0 0 720 360'%3E%3Crect width='720' height='360' fill='%23e0f2fe'/%3E%3Ccircle cx='540' cy='110' r='72' fill='%230ea5e9' opacity='.85'/%3E%3Cpath d='M0 280 160 165 285 250 410 145 720 315v45H0z' fill='%230f766e' opacity='.75'/%3E%3Ctext x='42' y='82' fill='%230f172a' font-family='Arial' font-size='36' font-weight='700'%3EImage Preview%3C/text%3E%3C/svg%3E";

const code = `import { Image } from "@ldkj/web-ui";

const demoImage = "data:image/svg+xml,...";

export function Example() {
  return (
    <Image
      src={demoImage}
      alt="山景插画"
      className="w-full rounded-lg"
      loading="lazy"
    />
  );
}`;

function Example() {
  return (
    <Image
      src={demoImage}
      alt="山景插画"
      className="w-full rounded-lg"
      loading="lazy"
    />
  );
}

export default function ImageBasicDemo() {
  return (
    <CodeView code={code}>
      <div className="max-w-xl">
        <Example />
      </div>
    </CodeView>
  );
}
