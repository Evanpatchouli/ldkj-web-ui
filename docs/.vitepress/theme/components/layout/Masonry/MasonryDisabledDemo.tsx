import * as React from "react";
import { Masonry } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <div className="grid gap-4">
      <button
        type="button"
        className="w-fit rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
        onClick={() => setDisabled((value) => !value)}
      >
        {disabled ? "启用 Masonry" : "切换为 CSS Grid"}
      </button>
      <Masonry frameWidth={140} gap={12} disabled={disabled} data-masonry-demo="disabled">
        {[1, 4 / 3, 3 / 4, 16 / 10, 2 / 3].map((aspectRatio, index) => (
          <Masonry.Item
            key={index}
            aspectRatio={aspectRatio}
            className="flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-600"
          >
            项目 {index + 1}
          </Masonry.Item>
        ))}
      </Masonry>
    </div>
  );
};

const code = `import * as React from "react";
import { Masonry } from "@ldkj/web-ui";

const Example = () => {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <div className="grid gap-4">
      <button
        type="button"
        className="w-fit rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
        onClick={() => setDisabled((value) => !value)}
      >
        {disabled ? "启用 Masonry" : "切换为 CSS Grid"}
      </button>
      <Masonry frameWidth={140} gap={12} disabled={disabled} data-masonry-demo="disabled">
        {[1, 4 / 3, 3 / 4, 16 / 10, 2 / 3].map((aspectRatio, index) => (
          <Masonry.Item
            key={index}
            aspectRatio={aspectRatio}
            className="flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-600"
          >
            项目 {index + 1}
          </Masonry.Item>
        ))}
      </Masonry>
    </div>
  );
};`;

export default function MasonryDisabledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
