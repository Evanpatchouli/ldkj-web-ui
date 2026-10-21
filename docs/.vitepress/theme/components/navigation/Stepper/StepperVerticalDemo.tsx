import CodeView from "../../CodeView";
import { Stepper } from "@ldkj/web-ui";

const Example = () => (
  <Stepper orientation="vertical" defaultCurrent={1}>
    <Stepper.Step label="创建工单" description="客服录入用户诉求">
      工单已创建，等待坐席确认资料。
    </Stepper.Step>
    <Stepper.Step label="现场处理" description="工程师到达现场">
      工程师已签到，正在核对设备和服务记录。
    </Stepper.Step>
    <Stepper.Step label="完成回访" description="服务结束后评价">
      系统将在处理完成后自动发起回访。
    </Stepper.Step>
  </Stepper>
);

const code = `import { Stepper } from "@ldkj/web-ui";

export function Example() {
  return (
    <Stepper orientation="vertical" defaultCurrent={1}>
      <Stepper.Step label="创建工单" description="客服录入用户诉求">
        工单已创建，等待坐席确认资料。
      </Stepper.Step>
      <Stepper.Step label="现场处理" description="工程师到达现场">
        工程师已签到，正在核对设备和服务记录。
      </Stepper.Step>
      <Stepper.Step label="完成回访" description="服务结束后评价">
        系统将在处理完成后自动发起回访。
      </Stepper.Step>
    </Stepper>
  );
}`;

export default function StepperVerticalDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

