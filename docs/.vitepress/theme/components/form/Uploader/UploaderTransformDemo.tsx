import * as React from "react";
import CodeView from "../../CodeView";
import { Uploader } from "@ldkj/web-ui";

const Example = () => {
  const [value, setValue] = React.useState("等待上传");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <Uploader
        accept=".txt"
        transformFile={async (file) => {
          const text = await file.text();
          return new File([text.trim()], file.name, { type: file.type });
        }}
        request={async ({ file, onProgress }) => {
          onProgress(100);
          return {
            response: {
              assetId: `asset_${file.name.replace(/\W+/g, "_")}`,
            },
          };
        }}
        getValueFromResult={(result) => {
          const response = result?.response as { assetId?: string } | undefined;
          return response?.assetId ?? null;
        }}
        onValueChange={(nextValue) => setValue(String(nextValue ?? "等待上传"))}
      />
      <div style={{ color: "#475569", fontSize: 13 }}>映射值: {value}</div>
    </div>
  );
};

const code = `
import * as React from "react";
import { Uploader } from "@ldkj/web-ui";

const Example = () => {
  const [value, setValue] = React.useState("等待上传");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <Uploader
        accept=".txt"
        transformFile={async (file) => {
          const text = await file.text();
          return new File([text.trim()], file.name, { type: file.type });
        }}
        request={async ({ file, onProgress }) => {
          onProgress(100);
          return {
            response: {
              assetId: \`asset_\${file.name.replace(/\\W+/g, "_")}\`,
            },
          };
        }}
        getValueFromResult={(result) => {
          const response = result?.response as { assetId?: string } | undefined;
          return response?.assetId ?? null;
        }}
        onValueChange={(nextValue) => setValue(String(nextValue ?? "等待上传"))}
      />
      <div style={{ color: "#475569", fontSize: 13 }}>映射值: {value}</div>
    </div>
  );
};`;

export default function UploaderTransformDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
