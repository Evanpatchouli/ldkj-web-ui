import * as React from "react";
import { DateTimePicker, Label } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const [value, setValue] = React.useState<Date | undefined>(
    new Date(2026, 9, 20, 23, 59, 58),
  );
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <Label htmlFor="run-at">任务执行时间</Label>
        <DateTimePicker
          id="run-at"
          value={value}
          onChange={setValue}
          aria-describedby="run-at-help"
          sx={{ borderRadius: 12 }}
        />
        <small id="run-at-help">
          滚轮或键盘调整时分秒，点击确定后生效；清除后可重新选择。
        </small>
      </div>
      <DateTimePicker
        disabled
        value={new Date(2026, 9, 21, 9, 30)}
        aria-label="已锁定的执行时间"
      />
      <DateTimePicker
        disabled
        placeholder="等待管理员开放排期"
        aria-label="未开放的执行时间"
      />
    </div>
  );
};

const code = `
import * as React from "react";
import { DateTimePicker, Label } from "@ldkj/web-ui";

const Example = () => {
  const [value, setValue] = React.useState<Date | undefined>(
    new Date(2026, 9, 20, 23, 59, 58),
  );
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <Label htmlFor="run-at">任务执行时间</Label>
        <DateTimePicker
          id="run-at"
          value={value}
          onChange={setValue}
          aria-describedby="run-at-help"
          sx={{ borderRadius: 12 }}
        />
        <small id="run-at-help">
          滚轮或键盘调整时分秒，点击确定后生效；清除后可重新选择。
        </small>
      </div>
      <DateTimePicker
        disabled
        value={new Date(2026, 9, 21, 9, 30)}
        aria-label="已锁定的执行时间"
      />
      <DateTimePicker
        disabled
        placeholder="等待管理员开放排期"
        aria-label="未开放的执行时间"
      />
    </div>
  );
};`;

export default function DateTimePickerStatesDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
