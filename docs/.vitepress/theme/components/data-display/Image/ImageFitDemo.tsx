import CodeView from "../../CodeView";
import { Image } from "@ldkj/web-ui";

const portraitImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='520' viewBox='0 0 360 520'%3E%3Crect width='360' height='520' fill='%23fef3c7'/%3E%3Crect x='58' y='64' width='244' height='392' rx='34' fill='%23f59e0b' opacity='.28'/%3E%3Ccircle cx='180' cy='182' r='74' fill='%23f97316' opacity='.82'/%3E%3Cpath d='M42 440c64-96 132-146 203-150 44-3 70 13 95 50v180H42z' fill='%237c2d12' opacity='.66'/%3E%3C/svg%3E";

const wideImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='720' height='360' viewBox='0 0 720 360'%3E%3Crect width='720' height='360' fill='%23dcfce7'/%3E%3Cpath d='M0 230 150 122l94 76 118-110 358 170v102H0z' fill='%2316a34a' opacity='.65'/%3E%3Ccircle cx='590' cy='92' r='58' fill='%23facc15'/%3E%3C/svg%3E";

const code = `import { Image } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Image
        src={portraitImage}
        alt="纵向图片裁剪"
        aspectRatio="4/3"
        fit="cover"
        className="w-full rounded-lg"
      />
      <Image
        src={wideImage}
        alt="横向图片裁剪"
        aspectRatio="4/3"
        fit="cover"
        position="center"
        className="w-full rounded-lg"
      />
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Image
        src={portraitImage}
        alt="纵向图片裁剪"
        aspectRatio="4/3"
        fit="cover"
        className="w-full rounded-lg"
      />
      <Image
        src={wideImage}
        alt="横向图片裁剪"
        aspectRatio="4/3"
        fit="cover"
        position="center"
        className="w-full rounded-lg"
      />
    </div>
  );
}

export default function ImageFitDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
