import CodeView from "../../CodeView";
import { Uploader } from "@ldkj/web-ui";

const Example = () => (
  <Uploader
    action={async (file) => `/api/upload/${encodeURIComponent(file.name)}`}
    autoUpload={false}
    data={(file) => ({
      bizType: "contract",
      fileSize: file.size,
    })}
    headers={{
      "X-Upload-Source": "web-ui-docs",
    }}
    method="PUT"
    name="attachment"
    withCredentials
  />
);

const code = `
import { Uploader } from "@ldkj/web-ui";

const Example = () => (
  <Uploader
    action={async (file) => \`/api/upload/\${encodeURIComponent(file.name)}\`}
    autoUpload={false}
    data={(file) => ({
      bizType: "contract",
      fileSize: file.size,
    })}
    headers={{
      "X-Upload-Source": "web-ui-docs",
    }}
    method="PUT"
    name="attachment"
    withCredentials
  />
);`;

export default function UploaderXhrDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
