import * as React from "react";
import { Button } from "@/components/interact/button";

export type UploaderProps = {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  onChange?: (files: FileList | null) => void;
};

export function Uploader(props: UploaderProps) {
  const { accept, multiple = false, disabled = false, onChange } = props;
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <div className="inline-flex items-center gap-3">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.files)}
      />
      <Button disabled={disabled} onClick={() => inputRef.current?.click()}>
        选择文件
      </Button>
    </div>
  );
}