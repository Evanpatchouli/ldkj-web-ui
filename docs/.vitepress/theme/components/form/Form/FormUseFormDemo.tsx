import * as React from "react";
import {
  Button,
  Cascader,
  CheckboxGroup,
  Form,
  Input,
  RadioGroup,
  Rate,
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Uploader,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const roleOptions = [
  { label: "运营管理员", value: "ops" },
  { label: "财务审核", value: "finance" },
  { label: "仓储协同", value: "warehouse" },
];

const moduleOptions = [
  { label: "订单", value: "orders" },
  { label: "库存", value: "stock" },
  { label: "报表", value: "reports" },
];

const regionOptions = [
  {
    label: "新疆",
    value: "xinjiang",
    children: [
      { label: "乌鲁木齐", value: "urumqi" },
      { label: "伊犁", value: "ili" },
    ],
  },
  {
    label: "浙江",
    value: "zhejiang",
    children: [
      { label: "杭州", value: "hangzhou" },
      { label: "宁波", value: "ningbo" },
    ],
  },
];

type AccountFormValues = {
  account: string;
  attachment: FileList | null;
  budget: number;
  enabled: boolean;
  modules: string[];
  region: string[];
  role: string;
  score: number;
  team: string;
};

function Example() {
  const [form] = Form.useForm<AccountFormValues>();
  const [submitted, setSubmitted] = React.useState("尚未提交");

  return (
    <Form
      form={form}
      initialValues={{
        account: "north-admin",
        budget: 60,
        enabled: true,
        modules: ["orders", "stock"],
        region: ["xinjiang", "urumqi"],
        role: "ops",
        score: 4,
        team: "platform",
      }}
      onFinish={(values) => {
        setSubmitted(
          JSON.stringify(
            {
              ...values,
              attachment: values.attachment
                ? Array.from(values.attachment).map((file) => file.name)
                : [],
            },
            null,
            2,
          ),
        );
      }}
      sx={{
        maxWidth: 560,
        padding: 20,
        border: "1px solid #dbe3ee",
        borderRadius: 12,
        backgroundColor: "#ffffff",
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Form.Item name="account" label="账号">
          <Input placeholder="请输入账号" />
        </Form.Item>
        <Form.Item name="role" label="角色">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="请选择角色" />
            </SelectTrigger>
            <SelectContent>
              <SelectItems options={roleOptions} />
            </SelectContent>
          </Select>
        </Form.Item>
        <Form.Item name="team" label="团队">
          <RadioGroup
            direction="horizontal"
            options={[
              { label: "平台", value: "platform" },
              { label: "交付", value: "delivery" },
            ]}
          />
        </Form.Item>
        <Form.Item name="enabled" label="启用状态">
          <Switch label="允许登录系统" />
        </Form.Item>
        <Form.Item name="modules" label="模块权限" className="md:col-span-2">
          <CheckboxGroup direction="horizontal" options={moduleOptions} />
        </Form.Item>
        <Form.Item name="region" label="服务区域">
          <Cascader options={regionOptions} clearable />
        </Form.Item>
        <Form.Item name="score" label="服务评分">
          <Rate />
        </Form.Item>
        <Form.Item name="budget" label="预算占比" className="md:col-span-2">
          <Slider min={0} max={100} step={5} aria-label="预算占比" />
        </Form.Item>
        <Form.Item name="attachment" label="资质附件" className="md:col-span-2">
          <Uploader accept="image/*,.pdf" multiple />
        </Form.Item>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">提交</Button>
        <Button type="button" variant="outline" onClick={() => form.resetFields()}>
          重置
        </Button>
      </div>
      <pre className="max-h-48 overflow-auto rounded-md bg-slate-950 p-3 text-xs leading-5 text-slate-50">
        {submitted}
      </pre>
    </Form>
  );
}

const code = `import * as React from "react";
import {
  Button,
  Cascader,
  CheckboxGroup,
  Form,
  Input,
  RadioGroup,
  Rate,
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Uploader,
} from "@ldkj/web-ui";

const roleOptions = [
  { label: "运营管理员", value: "ops" },
  { label: "财务审核", value: "finance" },
  { label: "仓储协同", value: "warehouse" },
];

const moduleOptions = [
  { label: "订单", value: "orders" },
  { label: "库存", value: "stock" },
  { label: "报表", value: "reports" },
];

const regionOptions = [
  {
    label: "新疆",
    value: "xinjiang",
    children: [
      { label: "乌鲁木齐", value: "urumqi" },
      { label: "伊犁", value: "ili" },
    ],
  },
  {
    label: "浙江",
    value: "zhejiang",
    children: [
      { label: "杭州", value: "hangzhou" },
      { label: "宁波", value: "ningbo" },
    ],
  },
];

type AccountFormValues = {
  account: string;
  attachment: FileList | null;
  budget: number;
  enabled: boolean;
  modules: string[];
  region: string[];
  role: string;
  score: number;
  team: string;
};

function Example() {
  const [form] = Form.useForm<AccountFormValues>();
  const [submitted, setSubmitted] = React.useState("尚未提交");

  return (
    <Form
      form={form}
      initialValues={{
        account: "north-admin",
        budget: 60,
        enabled: true,
        modules: ["orders", "stock"],
        region: ["xinjiang", "urumqi"],
        role: "ops",
        score: 4,
        team: "platform",
      }}
      onFinish={(values) => {
        setSubmitted(
          JSON.stringify(
            {
              ...values,
              attachment: values.attachment
                ? Array.from(values.attachment).map((file) => file.name)
                : [],
            },
            null,
            2,
          ),
        );
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Form.Item name="account" label="账号">
          <Input placeholder="请输入账号" />
        </Form.Item>
        <Form.Item name="role" label="角色">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="请选择角色" />
            </SelectTrigger>
            <SelectContent>
              <SelectItems options={roleOptions} />
            </SelectContent>
          </Select>
        </Form.Item>
        <Form.Item name="team" label="团队">
          <RadioGroup
            direction="horizontal"
            options={[
              { label: "平台", value: "platform" },
              { label: "交付", value: "delivery" },
            ]}
          />
        </Form.Item>
        <Form.Item name="enabled" label="启用状态">
          <Switch label="允许登录系统" />
        </Form.Item>
        <Form.Item name="modules" label="模块权限" className="md:col-span-2">
          <CheckboxGroup direction="horizontal" options={moduleOptions} />
        </Form.Item>
        <Form.Item name="region" label="服务区域">
          <Cascader options={regionOptions} clearable />
        </Form.Item>
        <Form.Item name="score" label="服务评分">
          <Rate />
        </Form.Item>
        <Form.Item name="budget" label="预算占比" className="md:col-span-2">
          <Slider min={0} max={100} step={5} aria-label="预算占比" />
        </Form.Item>
        <Form.Item name="attachment" label="资质附件" className="md:col-span-2">
          <Uploader accept="image/*,.pdf" multiple />
        </Form.Item>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">提交</Button>
        <Button type="button" variant="outline" onClick={() => form.resetFields()}>
          重置
        </Button>
      </div>
      <pre>{submitted}</pre>
    </Form>
  );
}`;

export default function FormUseFormDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
