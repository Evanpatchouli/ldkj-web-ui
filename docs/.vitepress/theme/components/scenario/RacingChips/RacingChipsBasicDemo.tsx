import CodeView from "../../CodeView";
import { RacingChips } from "@ldkj/web-ui";

const notices = ["订单已提交", "审核已通过", "权益已到账", "本周已有 128 人参与"];

const Example = () => (
  <div
    style={{
      overflow: "hidden",
      background: "linear-gradient(135deg, #175cd3, #0e9384)",
      borderRadius: 8,
    }}
  >
    <RacingChips items={notices} />
  </div>
);

const code = `
import { RacingChips } from "@ldkj/web-ui";

const notices = ["订单已提交", "审核已通过", "权益已到账", "本周已有 128 人参与"];

const Example = () => (
  <div
    style={{
      overflow: "hidden",
      background: "linear-gradient(135deg, #175cd3, #0e9384)",
      borderRadius: 8,
    }}
  >
    <RacingChips items={notices} />
  </div>
);`;

export default function RacingChipsBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
