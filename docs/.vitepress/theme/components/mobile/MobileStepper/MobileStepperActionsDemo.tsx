import CodeView from "../../CodeView";
import { Button, MobileStepper } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ maxWidth: 390 }}>
    <MobileStepper
      defaultCurrent={0}
      showActions
      swipeable
      renderActions={({ canPrevious, canNext, isLast, previous, next, finish }) => (
        <>
          <Button
            type="button"
            variant="outline"
            disabled={!canPrevious}
            onClick={previous}
          >
            返回
          </Button>
          <Button
            type="button"
            disabled={isLast ? false : !canNext}
            onClick={isLast ? finish : next}
          >
            {isLast ? "提交申请" : "继续"}
          </Button>
        </>
      )}
    >
      <MobileStepper.Step label="基础资料">录入联系人和基础资料。</MobileStepper.Step>
      <MobileStepper.Step label="服务配置">选择可售服务和价格。</MobileStepper.Step>
      <MobileStepper.Step label="确认提交">确认无误后提交。</MobileStepper.Step>
    </MobileStepper>
  </div>
);

const code = `import { Button, MobileStepper } from "@ldkj/web-ui";

export function Example() {
  return (
    <MobileStepper
      showActions
      swipeable
      renderActions={({ canPrevious, canNext, isLast, previous, next, finish }) => (
        <>
          <Button variant="outline" disabled={!canPrevious} onClick={previous}>
            返回
          </Button>
          <Button disabled={isLast ? false : !canNext} onClick={isLast ? finish : next}>
            {isLast ? "提交申请" : "继续"}
          </Button>
        </>
      )}
    >
      <MobileStepper.Step label="基础资料">录入联系人和基础资料。</MobileStepper.Step>
      <MobileStepper.Step label="服务配置">选择可售服务和价格。</MobileStepper.Step>
      <MobileStepper.Step label="确认提交">确认无误后提交。</MobileStepper.Step>
    </MobileStepper>
  );
}`;

export default function MobileStepperActionsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

