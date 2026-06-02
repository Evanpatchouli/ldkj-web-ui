import * as React from "react";
import { Button } from "@/components/interact/button";

/**
 * Uploader 属性。组件通过 `onChange(FileList | null)` 暴露用户选择的文件列表。
 */
export type UploaderProps = {
  accept?: string;
  multiple?: boolean;
  name?: string;
  disabled?: boolean;
  onChange?: (files: FileList | null) => void;
};

export function Uploader(props: UploaderProps) {
  const { accept, multiple = false, name, disabled = false, onChange } = props;
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <div className="inline-flex items-center gap-3">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        multiple={multiple}
        name={name}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.files)}
      />
      <Button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        选择文件
      </Button>
    </div>
  );
}
