import CodeView from "../../CodeView";
import { Image } from "@ldkj/web-ui";

const stateImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='540' viewBox='0 0 900 540'%3E%3Crect width='900' height='540' fill='%23dbeafe'/%3E%3Cpath d='M0 420 160 260 320 340 500 220 900 470v70H0z' fill='%230f766e' opacity='.75'/%3E%3Ctext x='56' y='104' fill='%230f172a' font-family='Arial' font-size='42' font-weight='700'%3EState Overlay%3C/text%3E%3C/svg%3E";

const code = `import { Image } from "@ldkj/web-ui";

const stateImage = "data:image/svg+xml,...";

export function Example() {
  return (
    <Image
      src={stateImage}
      alt="状态叠加图"
      aspectRatio="16/9"
      fit="cover"
      className="w-full rounded-lg"
      sx={{ maxWidth: 560 }}
    >
      {({ loading, error, loaded }) => (
        <div className="flex h-full w-full items-start justify-end p-3">
          <span className="rounded bg-black/65 px-2 py-1 text-xs text-white">
            {loading ? "loading" : error ? "error" : loaded ? "loaded" : "idle"}
          </span>
        </div>
      )}
    </Image>
  );
}`;

const Example = () => (
  <Image
    src={stateImage}
    alt="状态叠加图"
    aspectRatio="16/9"
    fit="cover"
    className="w-full rounded-lg"
    sx={{ maxWidth: 560 }}
  >
    {({ loading, error, loaded }) => (
      <div className="flex h-full w-full items-start justify-end p-3">
        <span className="rounded bg-black/65 px-2 py-1 text-xs text-white">
          {loading ? "loading" : error ? "error" : loaded ? "loaded" : "idle"}
        </span>
      </div>
    )}
  </Image>
);

export default function ImageStateDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
