# Uploader

`Uploader` 是面向业务表单的文件上传组件：保留原始文件选择能力，同时提供上传请求、进度、预览、拖拽、受控列表、业务值映射和表单集成。

## Basic

不配置 `request` / `action` 时，组件不会发起网络请求。此时文件选择后直接进入完成态，`onValueChange` 与 `Form.Item` 收集的是原始 `File` 或 `File[]`。

<UploaderDemo />

## Picture List

图片场景使用 `listType="picture"` 或 `listType="picture-card"`，可配合 `defaultFileList` 回显远程文件。

<UploaderPictureDemo />

## List Types

列表样式和显示策略通过 `listType`、`showFileList`、`defaultFileList` 控制。

<UploaderListTypesDemo />

## Validation

校验类 API 包括 `accept`、`maxSize`、`maxCount`、`beforeUpload`、`Uploader.LIST_IGNORE`、`onReject` 和 `onExceed`。

<UploaderValidationDemo />

## Drag

拖拽上传通过 `drag` 开启，`accept`、`maxSize`、`maxCount` 会同时作用于拖拽、点击选择和粘贴文件。

<UploaderDragDemo />

## Manual Upload

`autoUpload={false}` 或 `beforeUpload={() => false}` 可让文件进入待上传态，再由用户手动触发上传。

<UploaderManualDemo />

## Default XHR

不传 `request` 时，`action` 会启用内置 XHR 上传，并读取 `method`、`name`、`data`、`headers` 和 `withCredentials`。

<UploaderXhrDemo />

## Custom Request

不同企业或项目有着自成一套的文件上传流程，这一流程可以通过 `request` 接管。只要请求返回 `{ value, url, response }`，组件就会把 `value` 作为字段值，把 `url` 用于列表回显和预览。

<UploaderBusinessDemo />

## Transform & Mapping

`transformFile` 用于请求前转换文件，`getValueFromResult` 用于把任意响应结构映射成字段值。

<UploaderTransformDemo />

## Provider

`UploaderProvider` 用于配置页面或应用级默认上传行为。内部 `Uploader` 会读取离自己最近的 Provider 配置，具体字段仍可用 props 覆盖。

<UploaderProviderDemo />

## Render Custom

通过 `renderTrigger`、`renderItem`、`renderActions`、`children(state)`、`sx`、`style`、`className` 和 `class` 定制交互和视觉。

<UploaderRenderDemo />

## Interactions

入口交互包括 `drag`、`pastable`、`directory`、`openFileDialogOnClick` 和 `disabled`。

<UploaderInteractionsDemo />

## Preview / Download / Remove

预览、下载、删除链路由 `preview`、`onPreview`、`onDownload`、`beforeRemove`、`onRemove` 控制。

<UploaderPreviewActionsDemo />

## Form

`Form.Item` 默认监听 `Uploader` 的 `onValueChange`。没有业务值映射时收集 `File`；`request` 返回 `value` 后收集业务 id。

<UploaderFormDemo />

## Controlled List

使用 `fileList + onFileListChange` 可以完全接管列表，适合编辑页回填、外部排序、跨组件同步上传状态。

<UploaderControlledDemo />

## 常见场景

### 表单附件

普通合同、凭证、Excel 附件不需要立即上传时，直接使用默认行为，表单提交时拿到原始 `File`。

### 图片资产

图片上传通常需要回显缩略图，使用 `listType="picture-card"`，并在上传成功后返回 `url` 或 `thumbUrl`。

### 先换票再上传

前端计算文件摘要，向后端换取 `id/uploadUrl/previewUrl`，再调用上传地址。此类流程放进 `request` 即可，组件只关心返回的 `value/url/response`。

### 编辑页回填

接口已有文件 id 和预览地址时，使用 `defaultFileList` 或受控 `fileList` 初始化，确保每个条目提供稳定 `uid`。

## Usage

```tsx
import { Uploader } from "@ldkj/web-ui";

export function Example() {
  return (
    <Uploader
      accept="image/*"
      listType="picture"
      request={async ({ file, onProgress }) => {
        const md5 = await calcFileMd5(file);
        const ticket = await createUploadTicket({ md5, name: file.name });

        await putFile(ticket.uploadUrl, file, { onProgress });

        return {
          value: ticket.id,
          url: ticket.previewUrl,
          response: ticket,
        };
      }}
      onValueChange={(value) => {
        // value 是 ticket.id；多文件时是 id[]
      }}
    />
  );
}
```

## Demo Coverage

| 能力组 | 主要 API | Demo |
| --- | --- | --- |
| 基础选择 | `accept`、`onChange`、默认 `File` 值 | `Basic` |
| 列表展示 | `listType`、`showFileList`、`defaultFileList` | `Picture List`、`List Types` |
| 校验拦截 | `maxSize`、`maxCount`、`beforeUpload`、`Uploader.LIST_IGNORE`、`onReject`、`onExceed` | `Validation` |
| 上传请求 | `request`、`customRequest`、`onProgress`、`onSuccess`、`onError` | `Custom Request` |
| 内置 XHR | `action`、`method`、`name`、`data`、`headers`、`withCredentials` | `Default XHR` |
| 手动上传 | `autoUpload`、待上传状态、手动上传动作 | `Manual Upload` |
| 文件处理 | `transformFile`、`getValueFromResult` | `Transform & Mapping` |
| Provider | `UploaderProvider`、`Uploader.Provider`、Provider 覆盖优先级 | `Provider` |
| 自定义渲染 | `renderTrigger`、`renderItem`、`renderActions`、`children`、`sx/style/className/class` | `Render Custom` |
| 交互入口 | `drag`、`pastable`、`directory`、`openFileDialogOnClick`、`disabled` | `Interactions` |
| 文件操作 | `preview`、`onPreview`、`onDownload`、`beforeRemove`、`onRemove` | `Preview / Download / Remove` |
| 表单集成 | `value`、`defaultValue`、`onValueChange`、`Form.Item` | `Form` |
| 受控列表 | `fileList`、`onFileListChange` | `Controlled List` |

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `accept` | 文件类型限制，遵循原生 input accept 语法 | `string` | - |
| `action` | 默认 XHR 上传地址 | `string \| (file) => string \| Promise<string>` | - |
| `autoUpload` | 选择后是否立即上传 | `boolean` | `true` |
| `beforeUpload` | 上传前拦截或替换文件，返回 `false` 时只进入待上传态 | `(file, fileList) => boolean \| File \| Blob \| Uploader.LIST_IGNORE \| Promise<...>` | - |
| `transformFile` | 请求前转换文件 | `(file) => File \| Blob \| Promise<File \| Blob>` | - |
| `request` | 自定义上传流程 | `(options) => Promise<{ value?, url?, thumbUrl?, response?, name? } \| void>` | - |
| `customRequest` | `request` 别名，兼容社区常见命名 | `UploaderRequest` | - |
| `data` | 默认 XHR 附加表单数据 | `Record<string, unknown> \| (file) => Record<string, unknown> \| Promise<Record<string, unknown>>` | - |
| `headers` | 默认 XHR 请求头 | `Record<string, string>` | - |
| `method` | 默认 XHR 请求方法 | `string` | `"POST"` |
| `name` | 默认 XHR 文件字段名 | `string` | `"file"` |
| `withCredentials` | 默认 XHR 是否携带 cookie | `boolean` | `false` |
| `multiple` | 是否允许多选 | `boolean` | `false` |
| `maxCount` | 最大文件数；为 `1` 时新文件替换旧文件 | `number` | - |
| `maxSize` | 单文件最大体积，单位字节 | `number` | - |
| `drag` | 是否开启拖拽上传区 | `boolean` | `false` |
| `pastable` | 是否监听粘贴文件 | `boolean` | `false` |
| `directory` | 是否允许选择文件夹 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `listType` | 文件列表样式 | `"text" \| "picture" \| "picture-card"` | `"text"` |
| `showFileList` | 是否展示文件列表 | `boolean` | `true` |
| `preview` | 是否启用内置预览弹层 | `boolean` | `true` |
| `value` | 受控字段值，主要用于表单注入 | `unknown \| unknown[]` | - |
| `defaultValue` | 默认字段值 | `unknown \| unknown[]` | - |
| `fileList` | 受控文件列表 | `UploaderFile[]` | - |
| `defaultFileList` | 默认文件列表 | `UploaderFile[]` | - |
| `getValueFromResult` | 从请求结果映射字段值 | `(result, file) => unknown` | - |
| `renderTrigger` | 自定义上传触发区域 | `(state) => React.ReactNode` | - |
| `renderItem` | 自定义文件列表项 | `(file, originNode, actions) => React.ReactNode` | - |
| `renderActions` | 自定义文件操作区 | `(file, actions) => React.ReactNode` | - |
| `children` | 自定义触发内容或状态渲染函数 | `React.ReactNode \| (state) => React.ReactNode` | - |
| `sx` | 样式系统入口 | `SxProps` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |
| `onChange` | 原始文件输入变更，兼容旧用法 | `(files: FileList \| null) => void` | - |
| `onValueChange` | 字段值变化回调 | `(value, meta) => void` | - |
| `onFileListChange` | 文件列表变化回调 | `(fileList, meta) => void` | - |
| `onSelect` | 文件被选择后回调 | `(files: File[]) => void` | - |
| `onReject` | 文件被类型或体积规则拒绝 | `(file, reason) => void` | - |
| `onExceed` | 超过 `maxCount` 时回调 | `(files, fileList) => void` | - |
| `beforeRemove` | 删除前确认，返回 `false` 阻止删除 | `(file, fileList) => boolean \| Promise<boolean>` | - |
| `onRemove` | 删除后回调 | `(file, fileList) => void` | - |
| `onPreview` | 预览前回调，返回 `false` 阻止内置预览 | `(file) => boolean \| void \| Promise<boolean \| void>` | - |
| `onDownload` | 下载回调；未传时默认新窗口打开 `url` | `(file) => void` | - |
| `onSuccess` | 上传成功回调 | `(file, fileList) => void` | - |
| `onError` | 上传失败回调 | `(error, file, fileList) => void` | - |

## UploaderProvider API

`UploaderProvider` 接收 `Uploader` 的通用配置子集，适合放置公司级上传策略。也可以使用 `Uploader.Provider`。

```tsx
import { Uploader, UploaderProvider } from "@ldkj/web-ui";

<UploaderProvider request={uploadByCompanyPolicy} accept="image/*">
  <Uploader />
</UploaderProvider>;

<Uploader.Provider request={uploadByCompanyPolicy}>
  <Uploader />
</Uploader.Provider>;
```

Provider 可配置项包括：

- 上传链路：`request`、`customRequest`、`action`、`data`、`headers`、`method`、`withCredentials`
- 文件处理：`accept`、`maxSize`、`maxCount`、`beforeUpload`、`transformFile`
- 默认交互：`autoUpload`、`drag`、`pastable`、`directory`、`openFileDialogOnClick`
- 默认展示：`listType`、`preview`、`showFileList`、`renderTrigger`、`renderItem`、`renderActions`
- 业务映射：`getValueFromResult`
- 通用事件：`onReject`、`onExceed`、`onSuccess`、`onError`、`onPreview`、`onDownload`、`beforeRemove`

Provider 不负责字段状态。以下配置仍应放在具体 `Uploader` 或 `Form.Item` 上：

- `value`
- `defaultValue`
- `fileList`
- `defaultFileList`
- `onValueChange`
- `onFileListChange`
- `onChange`

## Request Options

`request` 会收到以下参数：

| 字段 | 说明 |
| --- | --- |
| `file` | 当前要上传的原始文件 |
| `item` | 当前列表项快照 |
| `action` | 解析后的上传地址 |
| `data` | 解析后的额外数据 |
| `filename` | 文件字段名 |
| `headers` | 请求头 |
| `method` | 请求方法 |
| `withCredentials` | 是否携带 cookie |
| `signal` | 取消信号，删除或卸载时会触发 |
| `onProgress` | 进度回调，传入 `0..100` |

## 行为规则 / 优先级

1. 文件先经过 `accept/maxSize/maxCount`
2. 再执行 `beforeUpload`
3. `beforeUpload` 返回 `Uploader.LIST_IGNORE` 时不进入列表
4. `beforeUpload` 返回 `false` 时进入待上传态，不自动请求
5. 自动上传时先执行 `transformFile`
6. 有 `request/customRequest` 时使用自定义请求
7. 没有自定义请求但有 `action` 时使用默认 XHR
8. 没有 `request/action` 时不发请求，文件直接完成，字段值为原始 `File`

Provider 优先级：

1. 最近的父级 `UploaderProvider`
2. 子级 Provider 覆盖父级 Provider
3. 单个 `Uploader` 的显式 props 覆盖 Provider

字段值规则：

- 单文件默认返回 `File`
- 多文件默认返回 `File[]`
- `request` 返回 `value` 后，单文件返回该 `value`
- 多文件且每个成功项有 `value` 时返回 `value[]`
- 删除文件后会按剩余成功或待上传项重新计算值

## A11Y

- 触发区域使用键盘 `Enter` / `Space` 打开文件选择框
- 文件列表使用 `role="list"` / `role="listitem"`
- 预览弹层使用 `role="dialog"` 与 `aria-modal="true"`
- 图片预览使用文件名作为 `alt`
- 禁用状态会透传到原生 input 和内置按钮

## Notes

- 浏览器不允许程序化设置原生 file input 的值，所以 `value` 只表示表单字段值，不会反向写入 input。
- `fileList` 受控时，外部必须在 `onFileListChange` 中同步列表，否则 UI 不会更新。
- 远程回显文件建议提供 `uid/name/status/value/url/thumbUrl`。
- `request` 内部应处理业务接口异常并抛出错误，组件会把条目标记为 `error`。
- 删除上传中的文件会触发 `AbortController`，自定义请求应监听 `signal`。
- 预览地址可用 `url`，缩略图优先用 `thumbUrl`。
