import CodeView from "../../CodeView";
import { RacingChips } from "@ldkj/web-ui";

const phoneNotices = [
  "133****5821 抢到了",
  "189****3168 抢到了",
  "158****9072 抢到了",
  "191****4436 抢到了",
  "135****7285 抢到了",
  "199****1659 抢到了",
];

const Example = () => (
  <section
    style={{
      position: "relative",
      minHeight: 220,
      overflow: "hidden",
      padding: "28px 24px",
      color: "#fff",
      background: "linear-gradient(145deg, #ef4649, #f79009)",
      borderRadius: 8,
    }}
  >
    <p style={{ margin: 0, fontSize: 14, opacity: 0.86 }}>限时流量权益</p>
    <strong style={{ display: "block", marginTop: 8, fontSize: 30 }}>29.9 元畅享 5G</strong>
    <button
      type="button"
      style={{
        marginTop: 20,
        padding: "9px 18px",
        color: "#b42318",
        fontWeight: 700,
        background: "#fff1c2",
        border: 0,
        borderRadius: 6,
      }}
    >
      立即领取
    </button>
    <RacingChips
      items={phoneNotices}
      duration={7}
      delayStep={1.1}
      style={{ position: "absolute", right: 0, bottom: 8, left: 0 }}
    />
  </section>
);

const code = `
import { RacingChips } from "@ldkj/web-ui";

const phoneNotices = [
  "133****5821 抢到了",
  "189****3168 抢到了",
  "158****9072 抢到了",
  "191****4436 抢到了",
  "135****7285 抢到了",
  "199****1659 抢到了",
];

const Example = () => (
  <section
    style={{
      position: "relative",
      minHeight: 220,
      overflow: "hidden",
      padding: "28px 24px",
      color: "#fff",
      background: "linear-gradient(145deg, #ef4649, #f79009)",
      borderRadius: 8,
    }}
  >
    <p style={{ margin: 0, fontSize: 14, opacity: 0.86 }}>限时流量权益</p>
    <strong style={{ display: "block", marginTop: 8, fontSize: 30 }}>29.9 元畅享 5G</strong>
    <button
      type="button"
      style={{
        marginTop: 20,
        padding: "9px 18px",
        color: "#b42318",
        fontWeight: 700,
        background: "#fff1c2",
        border: 0,
        borderRadius: 6,
      }}
    >
      立即领取
    </button>
    <RacingChips
      items={phoneNotices}
      duration={7}
      delayStep={1.1}
      style={{ position: "absolute", right: 0, bottom: 8, left: 0 }}
    />
  </section>
);`;

export default function RacingChipsPhoneDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
