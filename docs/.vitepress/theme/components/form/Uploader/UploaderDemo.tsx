import * as React from "react";
import CodeView from "../../CodeView";
import { Uploader } from "@ldkj/web-ui";

const Example = () => {
  const [value, setValue] = React.useState<string>("未选择");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
      <Uploader
        accept=".pdf,.png,.jpg"
        onChange={(files) => {
          setValue(
            files?.length
              ? Array.from(files)
                  .map((file) => file.name)
                  .join("、")
              : "未选择",
          );
        }}
        onValueChange={(nextValue) => {
          if (nextValue instanceof File) {
            setValue(`表单值: ${nextValue.name}`);
          }
        }}
      />
      <div style={{ color: "#475569", fontSize: 13 }}>{value}</div>
    </div>
  );
};

const code = `
import * as React from "react";
import { Uploader } from "@ldkj/web-ui";

const Example = () => {
  const [value, setValue] = React.useState<string>("未选择");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
      <Uploader
        accept=".pdf,.png,.jpg"
        onChange={(files) => {
          setValue(
            files?.length
              ? Array.from(files)
                  .map((file) => file.name)
                  .join("、")
              : "未选择",
          );
        }}
        onValueChange={(nextValue) => {
          if (nextValue instanceof File) {
            setValue(\`表单值: \${nextValue.name}\`);
          }
        }}
      />
      <div style={{ color: "#475569", fontSize: 13 }}>{value}</div>
    </div>
  );
};`;

export default function UploaderDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
