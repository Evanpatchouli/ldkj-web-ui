import * as React from "react";
import { Icon } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

function BrandMarkSvg(props: React.SVGProps<SVGSVGElement> & { title?: string }) {
  const { title, ...restProps } = props;
  return (
    <svg viewBox="0 0 24 24" role={title ? "img" : undefined} {...restProps}>
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.16" />
      <path d="M8 15L12 8L16 15H8Z" fill="currentColor" />
    </svg>
  );
}

const customSrc =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" fill="%232563eb"/><path d="M8 12h8" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M12 8v8" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>';

const code = `import { Icon } from "@ldkj/web-ui";

function BrandMarkSvg(props: React.SVGProps<SVGSVGElement> & { title?: string }) {
  const { title, ...restProps } = props;
  return (
    <svg viewBox="0 0 24 24" role={title ? "img" : undefined} {...restProps}>
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.16" />
      <path d="M8 15L12 8L16 15H8Z" fill="currentColor" />
    </svg>
  );
}

const customSrc =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" fill="%232563eb"/><path d="M8 12h8" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M12 8v8" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>';

function Example() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-gray-700">
      <Icon name="home" size={24} />
      <Icon name="search" size={24} color="#2563eb" />
      <Icon name="settings" variant="rounded" size={28} />
      <Icon name="notifications" variant="sharp" size={28} />
      <Icon svg={BrandMarkSvg} size={28} color="#0f766e" title="brand mark" />
      <Icon src={customSrc} size={28} title="custom source icon" />
    </div>
  );
}`;

export default function IconBasicDemo() {
  return (
    <CodeView code={code}>
      <div className="flex flex-wrap items-center gap-4 text-gray-700">
        <Icon name="home" size={24} />
        <Icon name="search" size={24} color="#2563eb" />
        <Icon name="settings" variant="rounded" size={28} />
        <Icon name="notifications" variant="sharp" size={28} />
        <Icon svg={BrandMarkSvg} size={28} color="#0f766e" title="brand mark" />
        <Icon src={customSrc} size={28} title="custom source icon" />
      </div>
    </CodeView>
  );
}

