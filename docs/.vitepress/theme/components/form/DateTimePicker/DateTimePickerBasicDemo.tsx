import * as React from "react";
import { DateTimePicker, Label } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const [value, setValue] = React.useState<Date>();
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
      <Label htmlFor="publish-at">计划发布时间</Label>
      <DateTimePicker id="publish-at" value={value} onChange={setValue} />
      <output data-testid="date-time-basic-value">
        {value
          ? value.toLocaleString("zh-CN", { hour12: false })
          : "尚未设置发布时间"}
      </output>
    </div>
  );
};

const code = `
import * as React from "react";
import { DateTimePicker, Label } from "@ldkj/web-ui";

const Example = () => {
  const [value, setValue] = React.useState<Date>();
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
      <Label htmlFor="publish-at">计划发布时间</Label>
      <DateTimePicker id="publish-at" value={value} onChange={setValue} />
      <output data-testid="date-time-basic-value">
        {value
          ? value.toLocaleString("zh-CN", { hour12: false })
          : "尚未设置发布时间"}
      </output>
    </div>
  );
};`;

export default function DateTimePickerBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
