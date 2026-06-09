import * as React from "react";
import CodeView from "../../CodeView";
import { Uploader } from "@ldkj/web-ui";

const Example = () => {
  const [message, setMessage] = React.useState("仅允许 1MB 内的 PNG 图片，最多 2 个");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 620 }}>
      <Uploader
        accept=".png"
        maxCount={2}
        maxSize={1024 * 1024}
        multiple
        beforeUpload={(file) => {
          if (file.name.includes("ignore")) {
            setMessage(`${file.name} 已被 LIST_IGNORE 过滤`);
            return Uploader.LIST_IGNORE;
          }
          return true;
        }}
        request={async ({ file, onProgress }) => {
          await new Promise((resolve) => window.setTimeout(resolve, 160));
          onProgress(100);
          return { value: file.name, url: URL.createObjectURL(file) };
        }}
        onReject={(file, reason) => {
          setMessage(
            reason === "accept"
              ? `${file.name} 类型不符合 .png`
              : `${file.name} 超过 1MB`,
          );
        }}
        onExceed={(files) => {
          setMessage(`超过数量限制，已忽略 ${files.length} 个文件`);
        }}
      />
      <div style={{ color: "#475569", fontSize: 13 }}>{message}</div>
    </div>
  );
};

const code = `
import * as React from "react";
import { Uploader } from "@ldkj/web-ui";

const Example = () => {
  const [message, setMessage] = React.useState("仅允许 1MB 内的 PNG 图片，最多 2 个");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 620 }}>
      <Uploader
        accept=".png"
        maxCount={2}
        maxSize={1024 * 1024}
        multiple
        beforeUpload={(file) => {
          if (file.name.includes("ignore")) {
            setMessage(\`\${file.name} 已被 LIST_IGNORE 过滤\`);
            return Uploader.LIST_IGNORE;
          }
          return true;
        }}
        request={async ({ file, onProgress }) => {
          await new Promise((resolve) => window.setTimeout(resolve, 160));
          onProgress(100);
          return { value: file.name, url: URL.createObjectURL(file) };
        }}
        onReject={(file, reason) => {
          setMessage(
            reason === "accept"
              ? \`\${file.name} 类型不符合 .png\`
              : \`\${file.name} 超过 1MB\`,
          );
        }}
        onExceed={(files) => {
          setMessage(\`超过数量限制，已忽略 \${files.length} 个文件\`);
        }}
      />
      <div style={{ color: "#475569", fontSize: 13 }}>{message}</div>
    </div>
  );
};`;

export default function UploaderValidationDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
