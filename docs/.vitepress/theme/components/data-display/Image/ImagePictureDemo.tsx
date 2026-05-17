import CodeView from "../../CodeView";
import { Image } from "@ldkj/web-ui";

const jpegHero = "https://cdn.example.com/assets/banner.jpg";

const code = `import { Image } from "@ldkj/web-ui";

const jpegHero = "https://cdn.example.com/assets/banner.jpg";

export const Example = () => (
  <Image
    src={jpegHero}
    alt="活动横幅"
    aspectRatio="16/9"
    fit="cover"
    sizes="(max-width: 768px) 100vw, 680px"
    formats={["avif", "webp"]}
    responsiveWidths={[360, 640, 960, 1360]}
    loader={(src, options) => {
      const params = new URLSearchParams();
      if (options.width) params.set("w", String(options.width));
      if (options.quality) params.set("q", String(options.quality));
      if (options.format) params.set("fmt", options.format);
      return params.size ? \`\${src}?\${params.toString()}\` : src;
    }}
    sources={[
      {
        media: "(min-width: 1024px)",
        srcSet:
          "https://cdn.example.com/assets/banner-desktop.webp 1x, https://cdn.example.com/assets/banner-desktop@2x.webp 2x",
        type: "image/webp",
      },
    ]}
    sx={{ maxWidth: 680 }}
    className="w-full rounded-lg"
  />
);`;

const Example = () => (
  <Image
    src={jpegHero}
    alt="活动横幅"
    aspectRatio="16/9"
    fit="cover"
    sizes="(max-width: 768px) 100vw, 680px"
    formats={["avif", "webp"]}
    responsiveWidths={[360, 640, 960, 1360]}
    loader={(src, options) => {
      const params = new URLSearchParams();
      if (options.width) params.set("w", String(options.width));
      if (options.quality) params.set("q", String(options.quality));
      if (options.format) params.set("fmt", options.format);
      return params.size ? `${src}?${params.toString()}` : src;
    }}
    sources={[
      {
        media: "(min-width: 1024px)",
        srcSet:
          "https://cdn.example.com/assets/banner-desktop.webp 1x, https://cdn.example.com/assets/banner-desktop@2x.webp 2x",
        type: "image/webp",
      },
    ]}
    sx={{ maxWidth: 680 }}
    className="w-full rounded-lg"
  />
);

export default function ImagePictureDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
