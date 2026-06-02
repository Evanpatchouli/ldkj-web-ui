# Uploader

文件上传触发组件，封装文件选择入口，并通过 `onChange(FileList | null)` 暴露文件列表。

## Demo

<UploaderDemo />

## 常用 API

- `accept`: 文件类型限制。
- `multiple`: 是否多选。
- `name`: 原生文件输入名称，放入 `Form.Item` 时会自动透传。
- `disabled`: 是否禁用。
- `onChange`: 文件列表变更回调。

## Notes

- `Uploader` 可以放入 `Form.Item`，表单会收集 `FileList | null`。
- 浏览器不允许安全地受控设置文件输入值，因此 `Form.Item` 不会向 `Uploader` 注入 `value`。
