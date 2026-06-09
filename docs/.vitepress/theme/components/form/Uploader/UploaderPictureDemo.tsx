import CodeView from "../../CodeView";
import { Uploader, type UploaderFile } from "@ldkj/web-ui";

const cover =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='320' viewBox='0 0 480 320'%3E%3Crect width='480' height='320' fill='%23e0f2fe'/%3E%3Ccircle cx='360' cy='92' r='54' fill='%230ea5e9'/%3E%3Cpath d='M0 254 90 178 176 218 282 128 480 264v56H0z' fill='%230f766e'/%3E%3Ctext x='32' y='58' font-family='Arial' font-size='28' font-weight='700' fill='%230f172a'%3E门店封面%3C/text%3E%3C/svg%3E";

const defaultFileList: UploaderFile[] = [
  {
    uid: "store-cover",
    name: "store-cover.png",
    size: 128000,
    status: "success",
    thumbUrl: cover,
    url: cover,
    value: "asset_store_cover",
  },
];

const Example = () => (
  <Uploader
    accept="image/*"
    defaultFileList={defaultFileList}
    listType="picture-card"
    maxCount={6}
    multiple
  />
);

const code = `
import { Uploader, type UploaderFile } from "@ldkj/web-ui";

const cover =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='320' viewBox='0 0 480 320'%3E%3Crect width='480' height='320' fill='%23e0f2fe'/%3E%3Ccircle cx='360' cy='92' r='54' fill='%230ea5e9'/%3E%3Cpath d='M0 254 90 178 176 218 282 128 480 264v56H0z' fill='%230f766e'/%3E%3Ctext x='32' y='58' font-family='Arial' font-size='28' font-weight='700' fill='%230f172a'%3E门店封面%3C/text%3E%3C/svg%3E";

const defaultFileList: UploaderFile[] = [
  {
    uid: "store-cover",
    name: "store-cover.png",
    size: 128000,
    status: "success",
    thumbUrl: cover,
    url: cover,
    value: "asset_store_cover",
  },
];

const Example = () => (
  <Uploader
    accept="image/*"
    defaultFileList={defaultFileList}
    listType="picture-card"
    maxCount={6}
    multiple
  />
);`;

export default function UploaderPictureDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

