import CodeView from "../../CodeView";
import { MobileCascader, type CascaderOption } from "@ldkj/web-ui";

const areaOptions: CascaderOption[] = [
  {
    label: "新疆维吾尔自治区",
    value: "xinjiang",
    children: [
      {
        label: "乌鲁木齐市",
        value: "urumqi",
        children: [
          { label: "天山区", value: "tianshan" },
          { label: "沙依巴克区", value: "shayibak" },
          { label: "新市区", value: "xinshi" },
          { label: "水磨沟区", value: "shuimogou" },
        ],
      },
      {
        label: "伊犁哈萨克自治州",
        value: "ili",
        children: [
          { label: "伊宁市", value: "yining" },
          { label: "霍尔果斯市", value: "horgos" },
        ],
      },
    ],
  },
  {
    label: "浙江省",
    value: "zhejiang",
    children: [
      {
        label: "杭州市",
        value: "hangzhou",
        children: [
          { label: "西湖区", value: "xihu" },
          { label: "余杭区", value: "yuhang" },
        ],
      },
      {
        label: "宁波市",
        value: "ningbo",
        children: [
          { label: "海曙区", value: "haishu" },
          { label: "鄞州区", value: "yinzhou" },
        ],
      },
    ],
  },
];

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
    <MobileCascader
      options={areaOptions}
      defaultValue={["xinjiang", "urumqi", "shayibak"]}
      title="门店地区"
      placeholder="请选择门店地区"
      levelLabels={["省", "市", "区"]}
      clearable
    />
  </div>
);

const code = `import { MobileCascader } from "@ldkj/web-ui";

const areaOptions = [
  {
    label: "新疆维吾尔自治区",
    value: "xinjiang",
    children: [
      {
        label: "乌鲁木齐市",
        value: "urumqi",
        children: [
          { label: "天山区", value: "tianshan" },
          { label: "沙依巴克区", value: "shayibak" },
          { label: "新市区", value: "xinshi" },
        ],
      },
    ],
  },
];

export function Example() {
  return (
    <MobileCascader
      options={areaOptions}
      defaultValue={["xinjiang", "urumqi", "shayibak"]}
      title="门店地区"
      placeholder="请选择门店地区"
      levelLabels={["省", "市", "区"]}
      clearable
    />
  );
}`;

export default function MobileCascaderBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
