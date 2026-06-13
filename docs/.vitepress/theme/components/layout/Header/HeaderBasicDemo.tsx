import { Button, Header, Icon } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <Header
    brand={
      <span className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-xs font-semibold text-white">
          L
        </span>
        控制台
      </span>
    }
    nav={
      <>
        <a className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100" href="#">
          概览
        </a>
        <a className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100" href="#">
          项目
        </a>
        <a className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100" href="#">
          成员
        </a>
      </>
    }
    actions={
      <>
        <Button type="button" variant="ghost" size="icon" aria-label="搜索">
          <Icon name="search" size={18} />
        </Button>
        <Button type="button" size="sm">
          新建
        </Button>
      </>
    }
  />
);

const code = `import { Button, Header, Icon } from "@ldkj/web-ui";

const Example = () => (
  <Header
    brand={
      <span className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-xs font-semibold text-white">
          L
        </span>
        控制台
      </span>
    }
    nav={
      <>
        <a className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100" href="#">
          概览
        </a>
        <a className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100" href="#">
          项目
        </a>
        <a className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100" href="#">
          成员
        </a>
      </>
    }
    actions={
      <>
        <Button type="button" variant="ghost" size="icon" aria-label="搜索">
          <Icon name="search" size={18} />
        </Button>
        <Button type="button" size="sm">
          新建
        </Button>
      </>
    }
  />
);`;

export default function HeaderBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
