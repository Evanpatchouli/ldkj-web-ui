import CodeView from "../../CodeView";
import { Stepper } from "@ldkj/web-ui";

const Example = () => (
  <Stepper defaultCurrent={2} variant="dot" labelPlacement="bottom">
    <Stepper.Step label="提交申请" />
    <Stepper.Step label="部门审批" />
    <Stepper.Step label="财务确认" description="当前处理人：王会计" />
    <Stepper.Step label="完成" />
  </Stepper>
);

const code = `import { Stepper } from "@ldkj/web-ui";

export function Example() {
  return (
    <Stepper defaultCurrent={2} variant="dot" labelPlacement="bottom">
      <Stepper.Step label="提交申请" />
      <Stepper.Step label="部门审批" />
      <Stepper.Step label="财务确认" description="当前处理人：王会计" />
      <Stepper.Step label="完成" />
    </Stepper>
  );
}`;

export default function StepperCompoundDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

