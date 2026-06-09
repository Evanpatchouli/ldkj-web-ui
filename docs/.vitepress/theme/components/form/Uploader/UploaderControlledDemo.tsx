import * as React from "react";
import CodeView from "../../CodeView";
import { Button, Uploader, type UploaderFile } from "@ldkj/web-ui";

const Example = () => {
  const [fileList, setFileList] = React.useState<UploaderFile[]>([
    {
      uid: "invoice-001",
      name: "invoice-001.pdf",
      size: 42000,
      status: "success",
      value: "asset_invoice_001",
    },
  ]);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <Uploader
        accept=".pdf"
        fileList={fileList}
        maxCount={3}
        multiple
        onFileListChange={setFileList}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setFileList([])}
        >
          清空
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            setFileList((prev) => [
              ...prev,
              {
                uid: `remote-${prev.length + 1}`,
                name: `remote-${prev.length + 1}.pdf`,
                size: 36000,
                status: "success",
                value: `asset_remote_${prev.length + 1}`,
              },
            ])
          }
        >
          追加远程文件
        </Button>
      </div>
    </div>
  );
};

const code = `
import * as React from "react";
import { Button, Uploader, type UploaderFile } from "@ldkj/web-ui";

const Example = () => {
  const [fileList, setFileList] = React.useState<UploaderFile[]>([
    {
      uid: "invoice-001",
      name: "invoice-001.pdf",
      size: 42000,
      status: "success",
      value: "asset_invoice_001",
    },
  ]);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <Uploader
        accept=".pdf"
        fileList={fileList}
        maxCount={3}
        multiple
        onFileListChange={setFileList}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setFileList([])}
        >
          清空
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            setFileList((prev) => [
              ...prev,
              {
                uid: \`remote-\${prev.length + 1}\`,
                name: \`remote-\${prev.length + 1}.pdf\`,
                size: 36000,
                status: "success",
                value: \`asset_remote_\${prev.length + 1}\`,
              },
            ])
          }
        >
          追加远程文件
        </Button>
      </div>
    </div>
  );
};`;

export default function UploaderControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

