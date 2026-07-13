import { Masonry, type MasonryVariant } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const ratios = [1, 4 / 3, 3 / 4, 16 / 9, 2 / 3, 3 / 2];
const colors = ["#dbeafe", "#e0e7ff", "#ede9fe", "#fae8ff", "#fce7f3", "#ffe4e6"];

const Layout = ({ variant }: { variant: MasonryVariant }) => (
  <div>
    <p className="mb-3 text-sm font-medium capitalize text-slate-700">{variant}</p>
    <Masonry frameWidth={120} gap={10} variant={variant} data-masonry-demo={variant}>
      {ratios.map((aspectRatio, index) => (
        <Masonry.Item
          key={`${variant}-${index}`}
          aspectRatio={aspectRatio}
          className="flex items-center justify-center rounded-lg text-sm font-semibold text-slate-700"
          style={{ backgroundColor: colors[index] }}
        >
          {index + 1}
        </Masonry.Item>
      ))}
    </Masonry>
  </div>
);

const Example = () => (
  <div className="grid gap-8 lg:grid-cols-2">
    <Layout variant="regular" />
    <Layout variant="balanced" />
  </div>
);

const code = `import { Masonry, type MasonryVariant } from "@ldkj/web-ui";

const ratios = [1, 4 / 3, 3 / 4, 16 / 9, 2 / 3, 3 / 2];
const colors = ["#dbeafe", "#e0e7ff", "#ede9fe", "#fae8ff", "#fce7f3", "#ffe4e6"];

const Layout = ({ variant }: { variant: MasonryVariant }) => (
  <div>
    <p className="mb-3 text-sm font-medium capitalize text-slate-700">{variant}</p>
    <Masonry frameWidth={120} gap={10} variant={variant} data-masonry-demo={variant}>
      {ratios.map((aspectRatio, index) => (
        <Masonry.Item
          key={\`\${variant}-\${index}\`}
          aspectRatio={aspectRatio}
          className="flex items-center justify-center rounded-lg text-sm font-semibold text-slate-700"
          style={{ backgroundColor: colors[index] }}
        >
          {index + 1}
        </Masonry.Item>
      ))}
    </Masonry>
  </div>
);

const Example = () => (
  <div className="grid gap-8 lg:grid-cols-2">
    <Layout variant="regular" />
    <Layout variant="balanced" />
  </div>
);`;

export default function MasonryVariantsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
