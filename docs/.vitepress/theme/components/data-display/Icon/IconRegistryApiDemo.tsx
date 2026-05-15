import * as React from "react";
import {
  Icon,
  getRegisteredIconNames,
  registerIconLoaders,
  resetIconLoaders,
  setIconLoaders,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

function DemoOutline(props: React.SVGProps<SVGSVGElement> & { title?: string }) {
  const { title, ...restProps } = props;
  return (
    <svg viewBox="0 0 24 24" role={title ? "img" : undefined} {...restProps}>
      {title ? <title>{title}</title> : null}
      <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" opacity="0.16" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DemoRound(props: React.SVGProps<SVGSVGElement> & { title?: string }) {
  const { title, ...restProps } = props;
  return (
    <svg viewBox="0 0 24 24" role={title ? "img" : undefined} {...restProps}>
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.16" />
      <path d="M8.5 12h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const code = `import {
  Icon,
  registerIconLoaders,
  setIconLoaders,
  resetIconLoaders,
  getRegisteredIconNames,
} from "@ldkj/web-ui";

registerIconLoaders({
  order_done: {
    outlined: async () => ({ default: OrderDoneOutlined }),
  },
});

setIconLoaders({
  order_done: {
    outlined: async () => ({ default: OrderDoneOutlined }),
    rounded: async () => ({ default: OrderDoneRounded }),
  },
});

const names = getRegisteredIconNames();
// 按需调用 resetIconLoaders();

<Icon name="order_done" variant="rounded" />`;

export default function IconRegistryApiDemo() {
  const [registeredCount, setRegisteredCount] = React.useState(0);

  const handleRegister = React.useCallback(() => {
    registerIconLoaders({
      demo_registry_icon: {
        outlined: async () => ({ default: DemoOutline }),
      },
    });
    setRegisteredCount(getRegisteredIconNames().length);
  }, []);

  const handleSet = React.useCallback(() => {
    setIconLoaders({
      demo_registry_icon: {
        outlined: async () => ({ default: DemoOutline }),
        rounded: async () => ({ default: DemoRound }),
      },
    });
    setRegisteredCount(getRegisteredIconNames().length);
  }, []);

  const handleReset = React.useCallback(() => {
    resetIconLoaders();
    setRegisteredCount(getRegisteredIconNames().length);
  }, []);

  React.useEffect(() => {
    setRegisteredCount(getRegisteredIconNames().length);
  }, []);

  return (
    <CodeView code={code}>
      <div className="space-y-3 text-gray-700">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
            onClick={handleRegister}
          >
            register
          </button>
          <button
            type="button"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
            onClick={handleSet}
          >
            set
          </button>
          <button
            type="button"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
            onClick={handleReset}
          >
            reset
          </button>
          <span className="text-sm text-gray-500">
            getRegisteredIconNames(): {registeredCount}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Icon name="demo_registry_icon" size={24} color="#2563eb" />
          <Icon name="demo_registry_icon" variant="rounded" size={24} color="#0f766e" />
        </div>
      </div>
    </CodeView>
  );
}

