import * as React from "react";
import CodeView from "../../CodeView";
import { Uploader } from "@ldkj/web-ui";

const Example = () => {
  const [message, setMessage] = React.useState("等待文件");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 640 }}>
      <Uploader
        accept=".pdf,.png,.jpg"
        drag
        maxCount={3}
        maxSize={2 * 1024 * 1024}
        multiple
        request={async ({ file, onProgress }) => {
          for (const percent of [20, 45, 70, 100]) {
            await new Promise((resolve) => window.setTimeout(resolve, 160));
            onProgress(percent);
          }
          return {
            value: file.name,
            url: URL.createObjectURL(file),
          };
        }}
        onReject={(file, reason) => {
          setMessage(
            reason === "maxSize"
              ? `${file.name} 超过 2MB`
              : `${file.name} 类型不支持`,
          );
        }}
        onValueChange={(value) => {
          setMessage(
            Array.isArray(value) && value.length
              ? `已完成: ${value.join("、")}`
              : "等待文件",
          );
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
  const [message, setMessage] = React.useState("等待文件");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 640 }}>
      <Uploader
        accept=".pdf,.png,.jpg"
        drag
        maxCount={3}
        maxSize={2 * 1024 * 1024}
        multiple
        request={async ({ file, onProgress }) => {
          for (const percent of [20, 45, 70, 100]) {
            await new Promise((resolve) => window.setTimeout(resolve, 160));
            onProgress(percent);
          }
          return {
            value: file.name,
            url: URL.createObjectURL(file),
          };
        }}
        onReject={(file, reason) => {
          setMessage(
            reason === "maxSize"
              ? \`\${file.name} 超过 2MB\`
              : \`\${file.name} 类型不支持\`,
          );
        }}
        onValueChange={(value) => {
          setMessage(
            Array.isArray(value) && value.length
              ? \`已完成: \${value.join("、")}\`
              : "等待文件",
          );
        }}
      />
      <div style={{ color: "#475569", fontSize: 13 }}>{message}</div>
    </div>
  );
};`;

export default function UploaderDragDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

