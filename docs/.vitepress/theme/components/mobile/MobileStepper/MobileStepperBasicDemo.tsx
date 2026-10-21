import CodeView from "../../CodeView";
import { MobileStepper } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ maxWidth: 390 }}>
    <MobileStepper defaultCurrent={1} size="sm" showActions>
      <MobileStepper.Step label="商户信息" description="填写账号信息">
        <div style={{ display: "grid", gap: 8 }}>
          <strong>商户信息</strong>
          <span>填写商户名称、手机号和营业执照资料。</span>
        </div>
      </MobileStepper.Step>
      <MobileStepper.Step label="门店信息" description="填写初始门店">
        <div style={{ display: "grid", gap: 8 }}>
          <strong>门店信息</strong>
          <span>补充门店地址、联系人和营业时间。</span>
        </div>
      </MobileStepper.Step>
      <MobileStepper.Step label="确认提交" description="确认信息无误">
        <div style={{ display: "grid", gap: 8 }}>
          <strong>确认提交</strong>
          <span>检查资料后提交审核。</span>
        </div>
      </MobileStepper.Step>
    </MobileStepper>
  </div>
);

const code = `import { MobileStepper } from "@ldkj/web-ui";

export function Example() {
  return (
    <MobileStepper defaultCurrent={1} size="sm" showActions>
      <MobileStepper.Step label="商户信息" description="填写账号信息">
        填写商户名称、手机号和营业执照资料。
      </MobileStepper.Step>
      <MobileStepper.Step label="门店信息" description="填写初始门店">
        补充门店地址、联系人和营业时间。
      </MobileStepper.Step>
      <MobileStepper.Step label="确认提交" description="确认信息无误">
        检查资料后提交审核。
      </MobileStepper.Step>
    </MobileStepper>
  );
}`;

export default function MobileStepperBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

