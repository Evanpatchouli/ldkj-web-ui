import CodeView from "../../CodeView";
import { RacingChips, type RacingChipsItem } from "@ldkj/web-ui";

const items: RacingChipsItem[] = [
  { key: "pay", content: <span>支付成功 · ¥299.00</span>, lane: 0, duration: 8 },
  { key: "stock", content: <span>库存同步完成</span>, lane: 1, delay: 1.5 },
  { key: "ship", content: <span>杭州仓已发货</span>, lane: 0, delay: 3, duration: 7 },
];

const Example = () => (
  <RacingChips
    items={items}
    laneCount={2}
    laneGap={34}
    direction="right"
    aria-label="实时业务动态"
    itemStyle={{
      height: 28,
      color: "#344054",
      background: "#fff",
      border: "1px solid #d0d5dd",
      boxShadow: "0 4px 10px rgb(16 24 40 / 10%)",
    }}
    style={{ height: 72, background: "#f2f4f7", borderRadius: 8 }}
  />
);

const code = `
import { RacingChips, type RacingChipsItem } from "@ldkj/web-ui";

const items: RacingChipsItem[] = [
  { key: "pay", content: <span>支付成功 · ¥299.00</span>, lane: 0, duration: 8 },
  { key: "stock", content: <span>库存同步完成</span>, lane: 1, delay: 1.5 },
  { key: "ship", content: <span>杭州仓已发货</span>, lane: 0, delay: 3, duration: 7 },
];

const Example = () => (
  <RacingChips
    items={items}
    laneCount={2}
    laneGap={34}
    direction="right"
    aria-label="实时业务动态"
    itemStyle={{
      height: 28,
      color: "#344054",
      background: "#fff",
      border: "1px solid #d0d5dd",
      boxShadow: "0 4px 10px rgb(16 24 40 / 10%)",
    }}
    style={{ height: 72, background: "#f2f4f7", borderRadius: 8 }}
  />
);`;

export default function RacingChipsCustomDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
