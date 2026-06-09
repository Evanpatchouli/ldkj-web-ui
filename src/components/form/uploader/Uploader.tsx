import * as React from "react";
import { Button } from "@/components/interact/button";
import { Progress } from "@/components/interact/progress";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export const UPLOADER_LIST_IGNORE = "__LDKJ_UPLOADER_LIST_IGNORE__" as const;

export type UploaderStatus = "ready" | "uploading" | "success" | "error";
export type UploaderListType = "text" | "picture" | "picture-card";
export type UploaderValue = unknown;

export type UploaderFile = {
  uid: string;
  name: string;
  size?: number;
  type?: string;
  status: UploaderStatus;
  percent?: number;
  url?: string;
  thumbUrl?: string;
  value?: UploaderValue;
  response?: unknown;
  error?: Error;
  originFile?: File;
};

export type UploaderRequestResult = {
  value?: UploaderValue;
  url?: string;
  thumbUrl?: string;
  response?: unknown;
  name?: string;
};

export type UploaderRequestOptions = {
  file: File;
  item: UploaderFile;
  action?: string;
  data?: Record<string, unknown>;
  filename: string;
  headers?: Record<string, string>;
  method: string;
  signal: AbortSignal;
  withCredentials: boolean;
  onProgress: (percent: number) => void;
};

export type UploaderRequest = (
  options: UploaderRequestOptions,
) => Promise<UploaderRequestResult | void> | UploaderRequestResult | void;

export type UploaderValueChangeMeta = {
  file?: UploaderFile;
  fileList: UploaderFile[];
  reason: "add" | "success" | "error" | "remove" | "retry" | "reset" | "progress";
};

export type UploaderRenderState = {
  disabled: boolean;
  dragging: boolean;
  fileList: UploaderFile[];
  uploading: boolean;
  open: () => void;
};

export type UploaderProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "onChange"
> & {
  accept?: string;
  action?: string | ((file: File) => string | Promise<string>);
  autoUpload?: boolean;
  beforeRemove?: (
    file: UploaderFile,
    fileList: UploaderFile[],
  ) => boolean | Promise<boolean>;
  beforeUpload?: (
    file: File,
    fileList: File[],
  ) =>
    | boolean
    | File
    | Blob
    | typeof UPLOADER_LIST_IGNORE
    | Promise<boolean | File | Blob | typeof UPLOADER_LIST_IGNORE>;
  children?: React.ReactNode | ((state: UploaderRenderState) => React.ReactNode);
  class?: string;
  customRequest?: UploaderRequest;
  data?:
    | Record<string, unknown>
    | ((file: File) => Record<string, unknown> | Promise<Record<string, unknown>>);
  defaultFileList?: UploaderFile[];
  defaultValue?: UploaderValue | UploaderValue[];
  directory?: boolean;
  disabled?: boolean;
  drag?: boolean;
  fileList?: UploaderFile[];
  getValueFromResult?: (
    result: UploaderRequestResult | void,
    file: UploaderFile,
  ) => UploaderValue;
  headers?: Record<string, string>;
  listType?: UploaderListType;
  maxCount?: number;
  maxSize?: number;
  method?: string;
  multiple?: boolean;
  name?: string;
  openFileDialogOnClick?: boolean;
  pastable?: boolean;
  preview?: boolean;
  request?: UploaderRequest;
  renderActions?: (
    file: UploaderFile,
    actions: {
      preview: () => void;
      download: () => void;
      remove: () => void;
      retry: () => void;
      upload: () => void;
    },
  ) => React.ReactNode;
  renderItem?: (
    file: UploaderFile,
    originNode: React.ReactNode,
    actions: {
      preview: () => void;
      download: () => void;
      remove: () => void;
      retry: () => void;
      upload: () => void;
    },
  ) => React.ReactNode;
  renderTrigger?: (state: UploaderRenderState) => React.ReactNode;
  showFileList?: boolean;
  sx?: SxProps;
  transformFile?: (file: File) => File | Blob | Promise<File | Blob>;
  value?: UploaderValue | UploaderValue[];
  withCredentials?: boolean;
  onChange?: (files: FileList | null) => void;
  onDownload?: (file: UploaderFile) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  onError?: (error: Error, file: UploaderFile, fileList: UploaderFile[]) => void;
  onExceed?: (files: File[], fileList: UploaderFile[]) => void;
  onFileListChange?: (
    fileList: UploaderFile[],
    meta: UploaderValueChangeMeta,
  ) => void;
  onPreview?: (file: UploaderFile) => boolean | void | Promise<boolean | void>;
  onReject?: (file: File, reason: "accept" | "maxSize") => void;
  onRemove?: (file: UploaderFile, fileList: UploaderFile[]) => void;
  onSelect?: (files: File[]) => void;
  onSuccess?: (file: UploaderFile, fileList: UploaderFile[]) => void;
  onValueChange?: (
    value: UploaderValue | UploaderValue[] | null,
    meta: UploaderValueChangeMeta,
  ) => void;
};

export type UploaderProviderConfig = Partial<
  Pick<
    UploaderProps,
    | "accept"
    | "action"
    | "autoUpload"
    | "beforeRemove"
    | "beforeUpload"
    | "customRequest"
    | "data"
    | "directory"
    | "disabled"
    | "drag"
    | "getValueFromResult"
    | "headers"
    | "listType"
    | "maxCount"
    | "maxSize"
    | "method"
    | "multiple"
    | "name"
    | "openFileDialogOnClick"
    | "pastable"
    | "preview"
    | "request"
    | "renderActions"
    | "renderItem"
    | "renderTrigger"
    | "showFileList"
    | "transformFile"
    | "withCredentials"
    | "onDownload"
    | "onError"
    | "onExceed"
    | "onPreview"
    | "onReject"
    | "onRemove"
    | "onSelect"
    | "onSuccess"
  >
>;

export type UploaderProviderProps = UploaderProviderConfig & {
  children?: React.ReactNode;
};

const UploaderContext = React.createContext<UploaderProviderConfig | null>(null);

let uidSeed = 0;

function createUid() {
  uidSeed += 1;
  return `ldkj-upload-${Date.now()}-${uidSeed}`;
}

function isPromiseLike<T>(value: T | Promise<T>): value is Promise<T> {
  return Boolean(value && typeof (value as Promise<T>).then === "function");
}

function isFileLike(value: unknown): value is File {
  return typeof File !== "undefined" && value instanceof File;
}

function isBlobLike(value: unknown): value is Blob {
  return typeof Blob !== "undefined" && value instanceof Blob;
}

function toFile(blob: File | Blob, fallbackName: string) {
  if (isFileLike(blob)) return blob;
  return new File([blob], fallbackName, { type: blob.type });
}

function formatFileSize(size: number | undefined) {
  if (size === undefined) return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function isImageFile(file: Pick<UploaderFile, "name" | "type" | "url" | "thumbUrl">) {
  if (file.type?.startsWith("image/")) return true;
  const source = file.thumbUrl ?? file.url ?? file.name;
  return /\.(apng|avif|gif|jpe?g|png|svg|webp)$/i.test(source);
}

function acceptFile(file: File, accept?: string) {
  if (!accept) return true;
  const rules = accept
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (rules.length === 0) return true;

  const lowerName = file.name.toLowerCase();
  const lowerType = file.type.toLowerCase();

  return rules.some((rule) => {
    const lowerRule = rule.toLowerCase();
    if (lowerRule.startsWith(".")) return lowerName.endsWith(lowerRule);
    if (lowerRule.endsWith("/*")) {
      return lowerType.startsWith(lowerRule.slice(0, -1));
    }
    return lowerType === lowerRule;
  });
}

function normalizePercent(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function readResponse(xhr: XMLHttpRequest) {
  const text = xhr.responseText;
  if (!text) return xhr.response;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function defaultRequest(options: UploaderRequestOptions) {
  const {
    action,
    data,
    file,
    filename,
    headers,
    method,
    signal,
    withCredentials,
    onProgress,
  } = options;

  if (!action) {
    return undefined;
  }

  return new Promise<UploaderRequestResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append(filename, file);
    Object.entries(data ?? {}).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      formData.append(key, value instanceof Blob ? value : String(value));
    });

    xhr.open(method, action);
    xhr.withCredentials = withCredentials;
    Object.entries(headers ?? {}).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      onProgress((event.loaded / event.total) * 100);
    };

    xhr.onload = () => {
      const response = readResponse(xhr);
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({
          response,
          url:
            response &&
            typeof response === "object" &&
            "url" in response &&
            typeof (response as { url?: unknown }).url === "string"
              ? (response as { url: string }).url
              : undefined,
        });
        return;
      }

      reject(new Error(`Upload failed with status ${xhr.status}`));
    };
    xhr.onerror = () => reject(new Error("Upload request failed"));
    xhr.onabort = () => reject(new DOMException("Upload aborted", "AbortError"));

    signal.addEventListener("abort", () => xhr.abort(), { once: true });
    xhr.send(formData);
  });
}

async function resolveMaybe<T>(value: T | Promise<T>) {
  return isPromiseLike(value) ? value : Promise.resolve(value);
}

function collectValue(
  fileList: UploaderFile[],
  multiple: boolean,
  maxCount: number | undefined,
) {
  const values = fileList
    .filter((file) => file.status === "success" || file.status === "ready")
    .map((file) => (file.value !== undefined ? file.value : file.originFile))
    .filter((value) => value !== undefined);

  if (multiple || (maxCount !== undefined && maxCount > 1)) {
    return values;
  }

  return values[0] ?? null;
}

function useObjectUrl() {
  const urlsRef = React.useRef(new Set<string>());

  React.useEffect(() => {
    return () => {
      urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      urlsRef.current.clear();
    };
  }, []);

  return React.useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    urlsRef.current.add(url);
    return url;
  }, []);
}

function composeRefs<T>(
  ...refs: Array<React.ForwardedRef<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
        return;
      }
      (ref as React.MutableRefObject<T | null>).current = node;
    });
  };
}

function mergeDefinedConfig<TBase extends object, TOverride extends object>(
  base: TBase | null | undefined,
  override: TOverride | null | undefined,
) {
  const result = { ...(base ?? {}) } as TBase & TOverride;

  Object.entries(override ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      (result as Record<string, unknown>)[key] = value;
    }
  });

  return result;
}

function mergeUploaderProps(
  providerConfig: UploaderProviderConfig | null,
  props: UploaderProps,
) {
  return mergeDefinedConfig(providerConfig, props) as UploaderProps;
}

export function UploaderProvider(props: UploaderProviderProps) {
  const { children, ...config } = props;
  const parentConfig = React.useContext(UploaderContext);
  const value = React.useMemo(
    () => mergeDefinedConfig(parentConfig, config),
    [parentConfig, config],
  );

  return (
    <UploaderContext.Provider value={value}>
      {children}
    </UploaderContext.Provider>
  );
}

export function useUploaderProvider() {
  return React.useContext(UploaderContext);
}

const UploaderBase = React.forwardRef<HTMLInputElement, UploaderProps>(
  function Uploader(inputProps, forwardedRef) {
    const providerConfig = React.useContext(UploaderContext);
    const props = React.useMemo(
      () => mergeUploaderProps(providerConfig, inputProps),
      [providerConfig, inputProps],
    );
    const {
      accept,
      action,
      autoUpload = true,
      beforeRemove,
      beforeUpload,
      children,
      className,
      class: legacyClass,
      customRequest,
      data,
      defaultFileList,
      directory = false,
      disabled = false,
      drag = false,
      fileList,
      getValueFromResult,
      headers,
      listType = "text",
      maxCount,
      maxSize,
      method = "POST",
      multiple = false,
      name = "file",
      openFileDialogOnClick = true,
      pastable = false,
      preview = true,
      request,
      renderActions,
      renderItem,
      renderTrigger,
      showFileList = true,
      style,
      sx,
      transformFile,
      withCredentials = false,
      onChange,
      onDownload,
      onDrop,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onError,
      onExceed,
      onFileListChange,
      onPreview,
      onReject,
      onRemove,
      onSelect,
      onSuccess,
      onValueChange,
      defaultValue: _defaultValue,
      value: _value,
      ...rest
    } = props;
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const fileListRef = React.useRef<UploaderFile[]>(defaultFileList ?? []);
    const abortControllersRef = React.useRef(new Map<string, AbortController>());
    const [innerFileList, setInnerFileList] = React.useState<UploaderFile[]>(
      defaultFileList ?? [],
    );
    const [dragging, setDragging] = React.useState(false);
    const [previewFile, setPreviewFile] = React.useState<UploaderFile | null>(null);
    const createObjectUrl = useObjectUrl();
    const theme = useSxTheme();
    const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
    const currentFileList = fileList ?? innerFileList;
    const finalRequest = request ?? customRequest;
    const hasUploadRequest = Boolean(finalRequest || action);
    const uploading = currentFileList.some((file) => file.status === "uploading");

    React.useEffect(() => {
      fileListRef.current = currentFileList;
    }, [currentFileList]);

    React.useEffect(() => {
      if (!pastable || disabled) return undefined;
      const handlePaste = (event: ClipboardEvent) => {
        const files = Array.from(event.clipboardData?.files ?? []);
        if (files.length === 0) return;
        void addFiles(files);
      };
      window.addEventListener("paste", handlePaste);
      return () => window.removeEventListener("paste", handlePaste);
    });

    React.useEffect(() => {
      return () => {
        abortControllersRef.current.forEach((controller) => controller.abort());
        abortControllersRef.current.clear();
      };
    }, []);

    const emitFileList = React.useCallback(
      (nextFileList: UploaderFile[], meta: UploaderValueChangeMeta) => {
        fileListRef.current = nextFileList;
        if (fileList === undefined) {
          setInnerFileList(nextFileList);
        }
        onFileListChange?.(nextFileList, meta);
        if (meta.reason !== "progress") {
          onValueChange?.(collectValue(nextFileList, multiple, maxCount), meta);
        }
      },
      [fileList, maxCount, multiple, onFileListChange, onValueChange],
    );

    const updateFile = React.useCallback(
      (
        uid: string,
        patch: Partial<UploaderFile>,
        reason: UploaderValueChangeMeta["reason"],
      ) => {
        const nextFileList = fileListRef.current.map((file) =>
          file.uid === uid ? { ...file, ...patch } : file,
        );
        const file = nextFileList.find((item) => item.uid === uid);
        emitFileList(nextFileList, { file, fileList: nextFileList, reason });
        return { file, fileList: nextFileList };
      },
      [emitFileList],
    );

    const uploadItem = React.useCallback(
      async (item: UploaderFile) => {
        const sourceFile = item.originFile;
        if (!sourceFile || disabled) return;

        const controller = new AbortController();
        abortControllersRef.current.set(item.uid, controller);
        updateFile(item.uid, { status: "uploading", percent: 0, error: undefined }, "retry");

        try {
          const resolvedAction =
            typeof action === "function" ? await action(sourceFile) : action;
          const resolvedData =
            typeof data === "function" ? await data(sourceFile) : data;
          const uploader = finalRequest ?? defaultRequest;
          const result = await uploader({
            action: resolvedAction,
            data: resolvedData,
            file: sourceFile,
            filename: name,
            headers,
            item,
            method,
            signal: controller.signal,
            withCredentials,
            onProgress: (percent) => {
              updateFile(item.uid, { percent: normalizePercent(percent) }, "progress");
            },
          });

          const latest = fileListRef.current.find((file) => file.uid === item.uid) ?? item;
          const mappedValue = getValueFromResult
            ? getValueFromResult(result, latest)
            : result && "value" in result
              ? result.value
              : latest.value;
          const next = updateFile(
            item.uid,
            {
              name: result?.name ?? latest.name,
              percent: 100,
              response: result?.response ?? result,
              status: "success",
              thumbUrl: result?.thumbUrl ?? result?.url ?? latest.thumbUrl,
              url: result?.url ?? latest.url,
              value: mappedValue,
            },
            "success",
          );

          if (next.file) {
            onSuccess?.(next.file, next.fileList);
          }
        } catch (error) {
          if ((error as DOMException).name === "AbortError") return;
          const normalizedError =
            error instanceof Error ? error : new Error(String(error));
          const next = updateFile(
            item.uid,
            { error: normalizedError, status: "error" },
            "error",
          );
          if (next.file) {
            onError?.(normalizedError, next.file, next.fileList);
          }
        } finally {
          abortControllersRef.current.delete(item.uid);
        }
      },
      [
        action,
        data,
        disabled,
        finalRequest,
        getValueFromResult,
        headers,
        method,
        name,
        onError,
        onSuccess,
        updateFile,
        withCredentials,
      ],
    );

    const addFiles = React.useCallback(
      async (files: File[]) => {
        if (disabled || files.length === 0) return;
        onSelect?.(files);

        const acceptedFiles: File[] = [];
        for (const file of files) {
          if (!acceptFile(file, accept)) {
            onReject?.(file, "accept");
            continue;
          }
          if (maxSize !== undefined && file.size > maxSize) {
            onReject?.(file, "maxSize");
            continue;
          }
          acceptedFiles.push(file);
        }

        if (acceptedFiles.length === 0) return;

        const current = fileListRef.current;
        const limit = maxCount ?? (multiple ? undefined : 1);
        let incoming = acceptedFiles;

        if (limit !== undefined) {
          const available = Math.max(0, limit - (limit === 1 ? 0 : current.length));
          if (incoming.length > available) {
            onExceed?.(incoming.slice(available), current);
            incoming = incoming.slice(0, available);
          }
        }

        if (incoming.length === 0) return;

        const nextItems: UploaderFile[] = [];
        const itemsToUpload: UploaderFile[] = [];

        for (const rawFile of incoming) {
          let shouldUpload = autoUpload && hasUploadRequest;
          let uploadFile = rawFile;

          if (beforeUpload) {
            const beforeResult = await resolveMaybe(beforeUpload(rawFile, incoming));
            if (beforeResult === UPLOADER_LIST_IGNORE) {
              continue;
            }
            if (beforeResult === false) {
              shouldUpload = false;
            } else if (isBlobLike(beforeResult)) {
              uploadFile = toFile(beforeResult, rawFile.name);
            }
          }

          if (shouldUpload && transformFile) {
            uploadFile = toFile(await resolveMaybe(transformFile(uploadFile)), rawFile.name);
          }

          const thumbUrl = isImageFile(uploadFile)
            ? createObjectUrl(uploadFile)
            : undefined;
          const item: UploaderFile = {
            uid: createUid(),
            name: uploadFile.name,
            originFile: uploadFile,
            percent: shouldUpload ? 0 : hasUploadRequest ? undefined : 100,
            size: uploadFile.size,
            status: shouldUpload ? "uploading" : hasUploadRequest ? "ready" : "success",
            thumbUrl,
            type: uploadFile.type,
            value: shouldUpload ? undefined : uploadFile,
          };

          nextItems.push(item);
          if (shouldUpload) {
            itemsToUpload.push(item);
          }
        }

        if (nextItems.length === 0) return;

        const nextFileList =
          limit === 1 ? nextItems.slice(-1) : [...fileListRef.current, ...nextItems];
        emitFileList(nextFileList, {
          file: nextItems[nextItems.length - 1],
          fileList: nextFileList,
          reason: "add",
        });

        itemsToUpload.forEach((item) => {
          void uploadItem(item);
        });
      },
      [
        accept,
        autoUpload,
        beforeUpload,
        createObjectUrl,
        disabled,
        emitFileList,
        hasUploadRequest,
        maxCount,
        maxSize,
        multiple,
        onExceed,
        onReject,
        onSelect,
        transformFile,
        uploadItem,
      ],
    );

    const open = React.useCallback(() => {
      if (disabled || !openFileDialogOnClick) return;
      inputRef.current?.click();
    }, [disabled, openFileDialogOnClick]);

    const removeFile = React.useCallback(
      async (file: UploaderFile) => {
        const current = fileListRef.current;
        if (beforeRemove) {
          const allowed = await resolveMaybe(beforeRemove(file, current));
          if (!allowed) return;
        }

        abortControllersRef.current.get(file.uid)?.abort();
        abortControllersRef.current.delete(file.uid);

        const nextFileList = current.filter((item) => item.uid !== file.uid);
        emitFileList(nextFileList, {
          file,
          fileList: nextFileList,
          reason: "remove",
        });
        onRemove?.(file, nextFileList);
      },
      [beforeRemove, emitFileList, onRemove],
    );

    const state: UploaderRenderState = {
      disabled,
      dragging,
      fileList: currentFileList,
      open,
      uploading,
    };

    const renderDefaultTrigger = () => {
      if (renderTrigger) return renderTrigger(state);
      if (typeof children === "function") return children(state);
      if (children) return children;

      if (drag) {
        return (
          <div className="grid min-h-32 place-items-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/40">
            <div className="space-y-1">
              <div className="text-sm font-medium text-slate-700">
                点击或拖拽文件到此处上传
              </div>
              <div className="text-xs text-slate-500">
                {accept ? `支持 ${accept}` : "支持单个或多个文件"}
              </div>
            </div>
          </div>
        );
      }

      return (
        <Button type="button" disabled={disabled} size="sm">
          选择文件
        </Button>
      );
    };

    const renderActionButtons = (file: UploaderFile) => {
      const actions = {
        preview: () => void handlePreview(file),
        download: () => handleDownload(file),
        remove: () => void removeFile(file),
        retry: () => void uploadItem(file),
        upload: () => void uploadItem(file),
      };

      if (renderActions) return renderActions(file, actions);

      return (
        <div className="flex shrink-0 items-center gap-1">
          {preview && (file.url || file.thumbUrl) ? (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              disabled={disabled}
              onClick={actions.preview}
            >
              预览
            </Button>
          ) : null}
          {file.url ? (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              disabled={disabled}
              onClick={actions.download}
            >
              下载
            </Button>
          ) : null}
          {file.status === "ready" && hasUploadRequest ? (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              disabled={disabled}
              onClick={actions.upload}
            >
              上传
            </Button>
          ) : null}
          {file.status === "error" ? (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              disabled={disabled}
              onClick={actions.retry}
            >
              重试
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            size="xs"
            disabled={disabled}
            onClick={actions.remove}
          >
            删除
          </Button>
        </div>
      );
    };

    const handlePreview = async (file: UploaderFile) => {
      const result = await onPreview?.(file);
      if (result === false) return;
      if (!preview) return;
      if (file.url || file.thumbUrl) {
        setPreviewFile(file);
      }
    };

    const handleDownload = (file: UploaderFile) => {
      if (onDownload) {
        onDownload(file);
        return;
      }
      if (file.url) {
        window.open(file.url, "_blank", "noopener,noreferrer");
      }
    };

    const renderFileItem = (file: UploaderFile) => {
      const showThumb = listType !== "text" && (file.thumbUrl || file.url);
      const statusLabel =
        file.status === "uploading"
          ? "上传中"
          : file.status === "success"
            ? "已完成"
            : file.status === "error"
              ? "失败"
              : "待上传";
      const itemClassName =
        listType === "picture-card"
          ? "flex h-full min-w-0 flex-col items-stretch gap-3 rounded-md border border-slate-200 bg-white p-3"
          : "flex min-w-0 items-center gap-3 rounded-md border border-slate-200 bg-white p-3";
      const originNode = (
        <div
          className={cn(
            itemClassName,
            file.status === "error" && "border-red-200 bg-red-50/40",
          )}
        >
          {showThumb ? (
            <button
              type="button"
              className={cn(
                "grid size-14 shrink-0 place-items-center overflow-hidden rounded-md border border-slate-200 bg-slate-50",
                listType === "picture-card" && "size-full min-h-32",
              )}
              onClick={() => void handlePreview(file)}
            >
              {isImageFile(file) ? (
                <img
                  src={file.thumbUrl ?? file.url}
                  alt={file.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="px-2 text-xs text-slate-500">FILE</span>
              )}
            </button>
          ) : null}
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex min-w-0 items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-slate-800">
                  {file.name}
                </div>
                <div className="text-xs text-slate-500">
                  {statusLabel}
                  {file.size !== undefined ? ` · ${formatFileSize(file.size)}` : ""}
                </div>
              </div>
              {renderActionButtons(file)}
            </div>
            {file.status === "uploading" ? (
              <Progress value={file.percent ?? 0} size="xs" />
            ) : null}
            {file.status === "error" ? (
              <div className="text-xs text-red-600">
                {file.error?.message ?? "上传失败"}
              </div>
            ) : null}
          </div>
        </div>
      );

      if (!renderItem) return originNode;

      return renderItem(file, originNode, {
        preview: () => void handlePreview(file),
        download: () => handleDownload(file),
        remove: () => void removeFile(file),
        retry: () => void uploadItem(file),
        upload: () => void uploadItem(file),
      });
    };

    return (
      <div
        {...rest}
        className={cn(
          "grid gap-3",
          disabled && "cursor-not-allowed opacity-60",
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(style, sxInlineStyle)}
        onDragEnter={(event) => {
          onDragEnter?.(event);
          if (!drag || disabled) return;
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          onDragOver?.(event);
          if (!drag || disabled) return;
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          onDragLeave?.(event);
          if (!drag || disabled) return;
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setDragging(false);
          }
        }}
        onDrop={(event) => {
          onDrop?.(event);
          if (!drag || disabled) return;
          event.preventDefault();
          setDragging(false);
          void addFiles(Array.from(event.dataTransfer.files));
        }}
      >
        <input
          ref={composeRefs(inputRef, forwardedRef)}
          hidden
          type="file"
          accept={accept}
          multiple={multiple}
          name={name}
          disabled={disabled}
          {...(directory
            ? {
                directory: "",
                webkitdirectory: "",
              }
            : {})}
          onChange={(event) => {
            onChange?.(event.target.files);
            void addFiles(Array.from(event.target.files ?? []));
            event.currentTarget.value = "";
          }}
        />

        <div
          className={cn(
            "inline-block",
            drag && "rounded-md",
            dragging && "ring-2 ring-blue-500 ring-offset-2",
          )}
          role={drag || renderTrigger || children ? "button" : undefined}
          tabIndex={drag || renderTrigger || children ? 0 : undefined}
          aria-disabled={disabled || undefined}
          onClick={open}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            open();
          }}
        >
          {renderDefaultTrigger()}
        </div>

        {showFileList && currentFileList.length > 0 ? (
          <div
            role="list"
            aria-label="上传文件列表"
            className={cn(
              listType === "picture-card"
                ? "grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3"
                : "grid gap-2",
            )}
          >
            {currentFileList.map((file) => (
              <div key={file.uid} role="listitem">
                {renderFileItem(file)}
              </div>
            ))}
          </div>
        ) : null}

        {previewFile && (previewFile.url || previewFile.thumbUrl) ? (
          <div
            className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/80 p-6"
            role="dialog"
            aria-modal="true"
            aria-label="文件预览"
            onClick={() => setPreviewFile(null)}
          >
            {isImageFile(previewFile) ? (
              <img
                src={previewFile.url ?? previewFile.thumbUrl}
                alt={previewFile.name}
                className="max-h-[88vh] max-w-[92vw] rounded-md object-contain shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              />
            ) : (
              <div
                className="rounded-md bg-white p-6 text-sm text-slate-700 shadow-xl"
                onClick={(event) => event.stopPropagation()}
              >
                {previewFile.name}
              </div>
            )}
            <Button
              type="button"
              variant="minor"
              size="sm"
              className="absolute right-5 top-5"
              onClick={(event) => {
                event.stopPropagation();
                setPreviewFile(null);
              }}
            >
              关闭
            </Button>
          </div>
        ) : null}
      </div>
    );
  },
);

UploaderBase.displayName = "Uploader";

export const Uploader = Object.assign(UploaderBase, {
  LIST_IGNORE: UPLOADER_LIST_IGNORE,
  Provider: UploaderProvider,
});
