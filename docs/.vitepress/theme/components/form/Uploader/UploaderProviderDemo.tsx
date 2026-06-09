import * as React from "react";
import CodeView from "../../CodeView";
import { Form, Uploader, UploaderProvider } from "@ldkj/web-ui";

async function calcFileMd5(file: File) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest))
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");
}

async function createUploadTicket(params: { md5: string; name: string }) {
  await new Promise((resolve) => window.setTimeout(resolve, 240));
  const id = `asset_${params.md5.slice(0, 8)}`;

  return {
    id,
    previewUrl: `/assets/${params.name}`,
    uploadUrl: `/mock-upload/${id}`,
  };
}

async function putFile(
  _url: string,
  _file: File,
  options: { onProgress: (percent: number) => void },
) {
  for (const percent of [24, 55, 78, 100]) {
    await new Promise((resolve) => window.setTimeout(resolve, 160));
    options.onProgress(percent);
  }
}

const Example = () => {
  const [values, setValues] = React.useState("{}");

  return (
    <UploaderProvider
      accept="image/*"
      listType="picture"
      maxSize={5 * 1024 * 1024}
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
    >
      <Form
        onFinish={(nextValues) => setValues(JSON.stringify(nextValues, null, 2))}
        style={{ display: "grid", gap: 16, maxWidth: 620 }}
      >
        <Form.Item label="门店门头" name="storefront">
          <Uploader />
        </Form.Item>
        <Form.Item label="环境照片" name="gallery">
          <Uploader maxCount={3} multiple />
        </Form.Item>
        <button
          type="submit"
          style={{
            background: "#2563eb",
            border: 0,
            borderRadius: 6,
            color: "#fff",
            height: 32,
            padding: "0 14px",
            width: 96,
          }}
        >
          提交
        </button>
        <pre style={{ color: "#475569", fontSize: 12, margin: 0 }}>{values}</pre>
      </Form>
    </UploaderProvider>
  );
};

const code = `
import * as React from "react";
import { Form, Uploader, UploaderProvider } from "@ldkj/web-ui";

async function calcFileMd5(file: File) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest))
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");
}

async function createUploadTicket(params: { md5: string; name: string }) {
  await new Promise((resolve) => window.setTimeout(resolve, 240));
  const id = \`asset_\${params.md5.slice(0, 8)}\`;

  return {
    id,
    previewUrl: \`/assets/\${params.name}\`,
    uploadUrl: \`/mock-upload/\${id}\`,
  };
}

async function putFile(
  _url: string,
  _file: File,
  options: { onProgress: (percent: number) => void },
) {
  for (const percent of [24, 55, 78, 100]) {
    await new Promise((resolve) => window.setTimeout(resolve, 160));
    options.onProgress(percent);
  }
}

const Example = () => {
  const [values, setValues] = React.useState("{}");

  return (
    <UploaderProvider
      accept="image/*"
      listType="picture"
      maxSize={5 * 1024 * 1024}
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
    >
      <Form
        onFinish={(nextValues) => setValues(JSON.stringify(nextValues, null, 2))}
        style={{ display: "grid", gap: 16, maxWidth: 620 }}
      >
        <Form.Item label="门店门头" name="storefront">
          <Uploader />
        </Form.Item>
        <Form.Item label="环境照片" name="gallery">
          <Uploader maxCount={3} multiple />
        </Form.Item>
        <button
          type="submit"
          style={{
            background: "#2563eb",
            border: 0,
            borderRadius: 6,
            color: "#fff",
            height: 32,
            padding: "0 14px",
            width: 96,
          }}
        >
          提交
        </button>
        <pre style={{ color: "#475569", fontSize: 12, margin: 0 }}>{values}</pre>
      </Form>
    </UploaderProvider>
  );
};`;

export default function UploaderProviderDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
