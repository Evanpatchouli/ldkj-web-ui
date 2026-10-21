import { Button, Header, Icon } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <Header variant="transparent" bordered={false} maxWidth={1040} gap="lg">
    <Header.Brand>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-semibold text-white">
        A
      </span>
      Analytics
    </Header.Brand>
    <Header.Nav className="flex-1 justify-center">
      <a className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100" href="#">
        报表
      </a>
      <a className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100" href="#">
        用户
      </a>
      <a className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100" href="#">
        设置
      </a>
    </Header.Nav>
    <Header.Actions>
      <Button type="button" variant="ghost" size="icon" aria-label="应用">
        <Icon name="apps" size={18} />
      </Button>
      <Button type="button" variant="ghost" size="icon" aria-label="账户">
        <Icon name="account_circle" size={18} />
      </Button>
    </Header.Actions>
  </Header>
);

const code = `import { Button, Header, Icon } from "@ldkj/web-ui";

const Example = () => (
  <Header variant="transparent" bordered={false} maxWidth={1040} gap="lg">
    <Header.Brand>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-semibold text-white">
        A
      </span>
      Analytics
    </Header.Brand>
    <Header.Nav className="flex-1 justify-center">
      <a className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100" href="#">
        报表
      </a>
      <a className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100" href="#">
        用户
      </a>
      <a className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100" href="#">
        设置
      </a>
    </Header.Nav>
    <Header.Actions>
      <Button type="button" variant="ghost" size="icon" aria-label="应用">
        <Icon name="apps" size={18} />
      </Button>
      <Button type="button" variant="ghost" size="icon" aria-label="账户">
        <Icon name="account_circle" size={18} />
      </Button>
    </Header.Actions>
  </Header>
);`;

export default function HeaderCompoundDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
