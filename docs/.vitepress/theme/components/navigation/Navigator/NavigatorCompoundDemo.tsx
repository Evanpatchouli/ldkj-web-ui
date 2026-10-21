import { Navigator } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <Navigator defaultActiveKey="overview">
    <Navigator.List>
      <Navigator.Item>
        <Navigator.Link itemKey="overview" href="#overview">
          总览
        </Navigator.Link>
      </Navigator.Item>
      <Navigator.Item>
        <Navigator.Trigger itemKey="platform">平台能力</Navigator.Trigger>
        <Navigator.Content>
          <div className="grid w-[520px] gap-2 p-3 md:grid-cols-2">
            <Navigator.Link itemKey="iam" href="#iam" className="flex-col items-start p-3">
              <span className="font-medium">身份权限</span>
              <span className="text-xs font-normal text-slate-500">账号、角色和访问控制</span>
            </Navigator.Link>
            <Navigator.Link itemKey="monitor" href="#monitor" className="flex-col items-start p-3">
              <span className="font-medium">监控告警</span>
              <span className="text-xs font-normal text-slate-500">指标、事件和通知策略</span>
            </Navigator.Link>
          </div>
        </Navigator.Content>
      </Navigator.Item>
      <Navigator.Item>
        <Navigator.Link itemKey="support" href="#support">
          支持
        </Navigator.Link>
      </Navigator.Item>
    </Navigator.List>
  </Navigator>
);

const code = `import { Navigator } from "@ldkj/web-ui";

const Example = () => (
  <Navigator defaultActiveKey="overview">
    <Navigator.List>
      <Navigator.Item>
        <Navigator.Link itemKey="overview" href="#overview">
          总览
        </Navigator.Link>
      </Navigator.Item>
      <Navigator.Item>
        <Navigator.Trigger itemKey="platform">平台能力</Navigator.Trigger>
        <Navigator.Content>
          <div className="grid w-[520px] gap-2 p-3 md:grid-cols-2">
            <Navigator.Link itemKey="iam" href="#iam" className="flex-col items-start p-3">
              <span className="font-medium">身份权限</span>
              <span className="text-xs font-normal text-slate-500">账号、角色和访问控制</span>
            </Navigator.Link>
            <Navigator.Link itemKey="monitor" href="#monitor" className="flex-col items-start p-3">
              <span className="font-medium">监控告警</span>
              <span className="text-xs font-normal text-slate-500">指标、事件和通知策略</span>
            </Navigator.Link>
          </div>
        </Navigator.Content>
      </Navigator.Item>
      <Navigator.Item>
        <Navigator.Link itemKey="support" href="#support">
          支持
        </Navigator.Link>
      </Navigator.Item>
    </Navigator.List>
  </Navigator>
);`;

export default function NavigatorCompoundDemo() {
  return (
    <CodeView code={code} allowOverflow>
      <Example />
    </CodeView>
  );
}
