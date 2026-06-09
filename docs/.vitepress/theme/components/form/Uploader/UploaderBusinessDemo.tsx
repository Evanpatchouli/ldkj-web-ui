import * as React from "react";
import CodeView from "../../CodeView";
import { Uploader } from "@ldkj/web-ui";

type UploadTicket = {
  id: string;
  uploadUrl: string;
  previewUrl: string;
};

async function calcFileMd5(file: File) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest))
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");
}

async function createUploadTicket(params: { md5: string; name: string }) {
  await new Promise((resolve) => window.setTimeout(resolve, 300));
  const id = `asset_${params.md5.slice(0, 8)}`;
  return {
    id,
    previewUrl: URL.createObjectURL(new Blob([], { type: "image/png" })),
    uploadUrl: `/mock-upload/${id}`,
  } satisfies UploadTicket;
}

async function putFile(
  _url: string,
  _file: File,
  options: { onProgress: (percent: number) => void },
) {
  for (const percent of [18, 42, 67, 86, 100]) {
    await new Promise((resolve) => window.setTimeout(resolve, 180));
    options.onProgress(percent);
  }
}

const Example = () => {
  const [value, setValue] = React.useState<unknown>(null);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <Uploader
        accept="image/*"
        listType="picture"
        request={async ({ file, onProgress }) => {
          const md5 = await calcFileMd5(file);
          const ticket = await createUploadTicket({ md5, name: file.name });

          await putFile(ticket.uploadUrl, file, { onProgress });

          return {
            value: ticket.id,
            url: URL.createObjectURL(file),
            response: ticket,
          };
        }}
        onValueChange={(nextValue) => setValue(nextValue)}
      />
      <div style={{ color: "#475569", fontSize: 13 }}>
        当前表单值: {typeof value === "string" ? value : "等待上传完成"}
      </div>
    </div>
  );
};

const code = `
import * as React from "react";
import { Uploader } from "@ldkj/web-ui";

type UploadTicket = {
  id: string;
  uploadUrl: string;
  previewUrl: string;
};

async function calcFileMd5(file: File) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest))
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");
}

async function createUploadTicket(params: { md5: string; name: string }) {
  await new Promise((resolve) => window.setTimeout(resolve, 300));
  const id = \`asset_\${params.md5.slice(0, 8)}\`;
  return {
    id,
    previewUrl: URL.createObjectURL(new Blob([], { type: "image/png" })),
    uploadUrl: \`/mock-upload/\${id}\`,
  } satisfies UploadTicket;
}

async function putFile(
  _url: string,
  _file: File,
  options: { onProgress: (percent: number) => void },
) {
  for (const percent of [18, 42, 67, 86, 100]) {
    await new Promise((resolve) => window.setTimeout(resolve, 180));
    options.onProgress(percent);
  }
}

const Example = () => {
  const [value, setValue] = React.useState<unknown>(null);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <Uploader
        accept="image/*"
        listType="picture"
        request={async ({ file, onProgress }) => {
          const md5 = await calcFileMd5(file);
          const ticket = await createUploadTicket({ md5, name: file.name });

          await putFile(ticket.uploadUrl, file, { onProgress });

          return {
            value: ticket.id,
            url: URL.createObjectURL(file),
            response: ticket,
          };
        }}
        onValueChange={(nextValue) => setValue(nextValue)}
      />
      <div style={{ color: "#475569", fontSize: 13 }}>
        当前表单值: {typeof value === "string" ? value : "等待上传完成"}
      </div>
    </div>
  );
};`;

export default function UploaderBusinessDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

