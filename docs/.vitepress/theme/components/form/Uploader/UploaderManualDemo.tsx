import CodeView from "../../CodeView";
import { Uploader } from "@ldkj/web-ui";

const Example = () => (
  <Uploader
    autoUpload={false}
    accept=".pdf,.doc,.docx"
    request={async ({ file, onProgress }) => {
      for (const percent of [30, 65, 100]) {
        await new Promise((resolve) => window.setTimeout(resolve, 180));
        onProgress(percent);
      }
      return {
        value: `manual_${file.name}`,
        response: { uploadedAt: new Date().toISOString() },
      };
    }}
  />
);

const code = `
import { Uploader } from "@ldkj/web-ui";

const Example = () => (
  <Uploader
    autoUpload={false}
    accept=".pdf,.doc,.docx"
    request={async ({ file, onProgress }) => {
      for (const percent of [30, 65, 100]) {
        await new Promise((resolve) => window.setTimeout(resolve, 180));
        onProgress(percent);
      }
      return {
        value: \`manual_\${file.name}\`,
        response: { uploadedAt: new Date().toISOString() },
      };
    }}
  />
);`;

export default function UploaderManualDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
