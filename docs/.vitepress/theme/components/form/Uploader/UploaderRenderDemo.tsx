import CodeView from "../../CodeView";
import { Uploader } from "@ldkj/web-ui";

const Example = () => (
  <Uploader
    accept="image/*"
    className="uploader-render-demo"
    class="legacy-uploader-class"
    style={{ maxWidth: 640 }}
    sx={{
      border: "1px solid #dbeafe",
      borderRadius: 8,
      padding: 12,
    }}
    request={async ({ file, onProgress }) => {
      onProgress(100);
      return { value: file.name, url: URL.createObjectURL(file) };
    }}
    renderTrigger={({ open, uploading }) => (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          open();
        }}
        style={{
          background: uploading ? "#94a3b8" : "#0f766e",
          border: 0,
          borderRadius: 6,
          color: "#fff",
          height: 34,
          padding: "0 14px",
        }}
      >
        {uploading ? "上传中" : "选择业务图片"}
      </button>
    )}
    renderItem={(file, originNode) => (
      <div style={{ display: "grid", gap: 6 }}>
        {originNode}
        <span style={{ color: "#64748b", fontSize: 12 }}>
          自定义列表项: {file.uid}
        </span>
      </div>
    )}
    renderActions={(file, actions) => (
      <div style={{ display: "flex", gap: 6 }}>
        {file.url ? (
          <button type="button" onClick={actions.preview}>
            看图
          </button>
        ) : null}
        <button type="button" onClick={actions.remove}>
          移除
        </button>
      </div>
    )}
  >
    {({ fileList }) => (
      <div style={{ color: "#64748b", fontSize: 12 }}>
        当前文件数: {fileList.length}
      </div>
    )}
  </Uploader>
);

const code = `
import { Uploader } from "@ldkj/web-ui";

const Example = () => (
  <Uploader
    accept="image/*"
    className="uploader-render-demo"
    class="legacy-uploader-class"
    style={{ maxWidth: 640 }}
    sx={{
      border: "1px solid #dbeafe",
      borderRadius: 8,
      padding: 12,
    }}
    request={async ({ file, onProgress }) => {
      onProgress(100);
      return { value: file.name, url: URL.createObjectURL(file) };
    }}
    renderTrigger={({ open, uploading }) => (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          open();
        }}
        style={{
          background: uploading ? "#94a3b8" : "#0f766e",
          border: 0,
          borderRadius: 6,
          color: "#fff",
          height: 34,
          padding: "0 14px",
        }}
      >
        {uploading ? "上传中" : "选择业务图片"}
      </button>
    )}
    renderItem={(file, originNode) => (
      <div style={{ display: "grid", gap: 6 }}>
        {originNode}
        <span style={{ color: "#64748b", fontSize: 12 }}>
          自定义列表项: {file.uid}
        </span>
      </div>
    )}
    renderActions={(file, actions) => (
      <div style={{ display: "flex", gap: 6 }}>
        {file.url ? (
          <button type="button" onClick={actions.preview}>
            看图
          </button>
        ) : null}
        <button type="button" onClick={actions.remove}>
          移除
        </button>
      </div>
    )}
  >
    {({ fileList }) => (
      <div style={{ color: "#64748b", fontSize: 12 }}>
        当前文件数: {fileList.length}
      </div>
    )}
  </Uploader>
);`;

export default function UploaderRenderDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
