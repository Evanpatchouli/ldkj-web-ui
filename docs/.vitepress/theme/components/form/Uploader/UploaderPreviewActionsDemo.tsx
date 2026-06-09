import * as React from "react";
import CodeView from "../../CodeView";
import { Uploader, type UploaderFile } from "@ldkj/web-ui";

const image =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23ecfeff'/%3E%3Ccircle cx='248' cy='52' r='32' fill='%2306b6d4'/%3E%3Cpath d='M0 146 70 88 132 118 198 72 320 150v30H0z' fill='%230f766e'/%3E%3Ctext x='20' y='42' font-family='Arial' font-size='22' font-weight='700' fill='%230f172a'%3EPreview%3C/text%3E%3C/svg%3E";

const files: UploaderFile[] = [
  {
    uid: "preview-demo",
    name: "preview-demo.png",
    size: 36000,
    status: "success",
    thumbUrl: image,
    url: image,
    value: "asset_preview_demo",
  },
];

const Example = () => {
  const [message, setMessage] = React.useState("等待操作");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <Uploader
        defaultFileList={files}
        listType="picture"
        preview
        onPreview={(file) => setMessage(`预览: ${file.name}`)}
        onDownload={(file) => setMessage(`下载: ${file.value}`)}
        beforeRemove={async (file) => {
          setMessage(`确认删除: ${file.name}`);
          return true;
        }}
        onRemove={(file) => setMessage(`已删除: ${file.name}`)}
      />
      <div style={{ color: "#475569", fontSize: 13 }}>{message}</div>
    </div>
  );
};

const code = `
import * as React from "react";
import { Uploader, type UploaderFile } from "@ldkj/web-ui";

const image = "...";

const files: UploaderFile[] = [
  {
    uid: "preview-demo",
    name: "preview-demo.png",
    size: 36000,
    status: "success",
    thumbUrl: image,
    url: image,
    value: "asset_preview_demo",
  },
];

const Example = () => {
  const [message, setMessage] = React.useState("等待操作");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <Uploader
        defaultFileList={files}
        listType="picture"
        preview
        onPreview={(file) => setMessage(\`预览: \${file.name}\`)}
        onDownload={(file) => setMessage(\`下载: \${file.value}\`)}
        beforeRemove={async (file) => {
          setMessage(\`确认删除: \${file.name}\`);
          return true;
        }}
        onRemove={(file) => setMessage(\`已删除: \${file.name}\`)}
      />
      <div style={{ color: "#475569", fontSize: 13 }}>{message}</div>
    </div>
  );
};`;

export default function UploaderPreviewActionsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
