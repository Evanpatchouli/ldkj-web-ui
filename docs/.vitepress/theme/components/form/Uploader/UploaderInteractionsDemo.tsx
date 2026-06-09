import CodeView from "../../CodeView";
import { Uploader } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 16, maxWidth: 680 }}>
    <Uploader drag pastable directory multiple accept="image/*" />
    <Uploader openFileDialogOnClick={false}>
      {({ open }) => (
        <button type="button" onClick={open}>
          外部按钮打开文件选择
        </button>
      )}
    </Uploader>
    <Uploader disabled />
  </div>
);

const code = `
import { Uploader } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 16, maxWidth: 680 }}>
    <Uploader drag pastable directory multiple accept="image/*" />
    <Uploader openFileDialogOnClick={false}>
      {({ open }) => (
        <button type="button" onClick={open}>
          外部按钮打开文件选择
        </button>
      )}
    </Uploader>
    <Uploader disabled />
  </div>
);`;

export default function UploaderInteractionsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
