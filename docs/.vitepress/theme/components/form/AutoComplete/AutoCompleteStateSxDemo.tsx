import { AutoComplete } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  { label: "北京", value: "北京" },
  { label: "上海", value: "上海" },
  { label: "深圳", value: "深圳" },
];

const Example = () => (
  <div style={{ display: "grid", gap: 16, maxWidth: 440 }}>
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>样式定制</div>
      <AutoComplete
        options={options}
        placeholder="主题化联想框"
        rootSx={{
          maxWidth: 440,
        }}
        dropdownSx={{
          borderColor: "#bfdbfe",
          boxShadow: "0 18px 40px rgba(37, 99, 235, 0.14)",
        }}
        optionSx={{
          borderRadius: 8,
        }}
      />
    </div>

    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>状态控制</div>
      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
        <AutoComplete
          options={options}
          defaultValue="上海"
          readOnly
          placeholder="只读状态"
        />
        <AutoComplete
          options={options}
          defaultValue="深圳"
          disabled
          placeholder="禁用状态"
        />
      </div>
      <AutoComplete
        options={options}
        placeholder="输入不匹配内容看空状态"
        emptyText="没有找到匹配的城市"
        openOnFocus={false}
      />
    </div>
  </div>
);

const code = `
import { AutoComplete } from "@ldkj/web-ui";

const options = [
  { label: "北京", value: "北京" },
  { label: "上海", value: "上海" },
  { label: "深圳", value: "深圳" },
];

const Example = () => (
  <div style={{ display: "grid", gap: 16, maxWidth: 440 }}>
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>样式定制</div>
      <AutoComplete
        options={options}
        placeholder="主题化联想框"
        rootSx={{
          maxWidth: 440,
        }}
        dropdownSx={{
          borderColor: "#bfdbfe",
          boxShadow: "0 18px 40px rgba(37, 99, 235, 0.14)",
        }}
        optionSx={{
          borderRadius: 8,
        }}
      />
    </div>

    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>状态控制</div>
      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
        <AutoComplete
          options={options}
          defaultValue="上海"
          readOnly
          placeholder="只读状态"
        />
        <AutoComplete
          options={options}
          defaultValue="深圳"
          disabled
          placeholder="禁用状态"
        />
      </div>
      <AutoComplete
        options={options}
        placeholder="输入不匹配内容看空状态"
        emptyText="没有找到匹配的城市"
        openOnFocus={false}
      />
    </div>
  </div>
);`;

export default function AutoCompleteStateSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
