import * as React from "react";
import { Icon, registerIconLoaders } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

function DemoOrderDone(
  props: React.SVGProps<SVGSVGElement> & { title?: string },
) {
  const { title, ...restProps } = props;
  return (
    <svg viewBox="0 0 24 24" role={title ? "img" : undefined} {...restProps}>
      {title ? <title>{title}</title> : null}
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M8 12.5L10.8 15L16 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

registerIconLoaders({
  // 自定义图标
  demo_order_done: {
    outlined: async () => ({
      default: DemoOrderDone,
    }),
  },
  // 引入第三方图标
  mail_shield: {
    outlined: () =>
      import("@material-symbols/svg-400/outlined/mail_shield.svg?react"),
  },
});

const code = `import * as React from "react";
import { Icon, registerIconLoaders } from "@ldkj/web-ui";

function DemoOrderDone(
  props: React.SVGProps<SVGSVGElement> & { title?: string },
) {
  const { title, ...restProps } = props;
  return (
    <svg viewBox="0 0 24 24" role={title ? "img" : undefined} {...restProps}>
      {title ? <title>{title}</title> : null}
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M8 12.5L10.8 15L16 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

registerIconLoaders({
  // 自定义图标
  demo_order_done: {
    outlined: async () => ({
      default: DemoOrderDone,
    }),
  },
  // 引入第三方图标
  mail_shield: {
    outlined: () =>
      import("@material-symbols/svg-400/outlined/mail_shield.svg?react"),
  },
});

export function Example() {
  return (
    <div className="flex items-center gap-4 text-gray-700">
      <Icon name="order_done" size={24} color="#2563eb" />
      <Icon name="mail_shield" size={24} color="#2563eb" />
    </div>
  );
}`;

export default function IconRegisterDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center gap-4 text-gray-700">
        <Icon name="demo_order_done" size={24} color="#2563eb" />
        <Icon name="mail_shield" size={24} color="#2563eb" />
      </div>
    </CodeView>
  );
}

