import CodeView from "../../CodeView";
import { Uploader, type UploaderFile } from "@ldkj/web-ui";

const image =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200' viewBox='0 0 320 200'%3E%3Crect width='320' height='200' fill='%23f0fdf4'/%3E%3Ccircle cx='246' cy='62' r='36' fill='%2322c55e'/%3E%3Cpath d='M0 156 82 96 142 126 210 86 320 160v40H0z' fill='%2315803d'/%3E%3C/svg%3E";

const defaultFileList: UploaderFile[] = [
  {
    uid: "list-type-demo",
    name: "store-image.png",
    size: 58000,
    status: "success",
    thumbUrl: image,
    url: image,
    value: "asset_store_image",
  },
];

const Example = () => (
  <div style={{ display: "grid", gap: 18, maxWidth: 760 }}>
    <Uploader defaultFileList={defaultFileList} listType="text" />
    <Uploader defaultFileList={defaultFileList} listType="picture" />
    <Uploader defaultFileList={defaultFileList} listType="picture-card" />
    <Uploader showFileList={false} />
  </div>
);

const code = `
import { Uploader, type UploaderFile } from "@ldkj/web-ui";

const image = "...";

const defaultFileList: UploaderFile[] = [
  {
    uid: "list-type-demo",
    name: "store-image.png",
    size: 58000,
    status: "success",
    thumbUrl: image,
    url: image,
    value: "asset_store_image",
  },
];

const Example = () => (
  <div style={{ display: "grid", gap: 18, maxWidth: 760 }}>
    <Uploader defaultFileList={defaultFileList} listType="text" />
    <Uploader defaultFileList={defaultFileList} listType="picture" />
    <Uploader defaultFileList={defaultFileList} listType="picture-card" />
    <Uploader showFileList={false} />
  </div>
);`;

export default function UploaderListTypesDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
