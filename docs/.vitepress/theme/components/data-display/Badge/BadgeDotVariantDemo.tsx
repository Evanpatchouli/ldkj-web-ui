import CodeView from "../../CodeView";
import { Badge, Button } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 14 }}>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Badge dot variant="neutral">
        <Button size="sm">中性</Button>
      </Badge>
      <Badge dot variant="primary">
        <Button size="sm">主色</Button>
      </Badge>
      <Badge dot variant="success">
        <Button size="sm">成功</Button>
      </Badge>
      <Badge dot variant="warning">
        <Button size="sm">警告</Button>
      </Badge>
      <Badge dot variant="danger">
        <Button size="sm">危险</Button>
      </Badge>
    </div>

    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Badge badgeContent="NEUTRAL" variant="neutral">
        <Button size="sm">中性填充</Button>
      </Badge>
      <Badge badgeContent="PRIMARY" variant="primary">
        <Button size="sm">主色填充</Button>
      </Badge>
      <Badge badgeContent="SUCCESS" variant="success">
        <Button size="sm">成功填充</Button>
      </Badge>
      <Badge badgeContent="WARNING" variant="warning">
        <Button size="sm">警告填充</Button>
      </Badge>
      <Badge badgeContent="DANGER" variant="danger">
        <Button size="sm">危险填充</Button>
      </Badge>
    </div>

    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Badge badgeContent="PRIMARY" variant="primary" light>
        <Button size="sm">主色轻量</Button>
      </Badge>
      <Badge badgeContent="SUCCESS" variant="success" light>
        <Button size="sm">成功轻量</Button>
      </Badge>
      <Badge badgeContent="WARNING" variant="warning" light>
        <Button size="sm">警告轻量</Button>
      </Badge>
      <Badge badgeContent="DANGER" variant="danger" light>
        <Button size="sm">危险轻量</Button>
      </Badge>
    </div>

    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Badge dot variant="primary" light>
        <Button size="sm">dot+light 仍填充</Button>
      </Badge>
      <Badge dot variant="success" light>
        <Button size="sm">dot+light 仍填充</Button>
      </Badge>
    </div>
  </div>
);

const code = `
import { Badge, Button } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 14 }}>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Badge dot variant="neutral">
        <Button size="sm">中性</Button>
      </Badge>
      <Badge dot variant="primary">
        <Button size="sm">主色</Button>
      </Badge>
      <Badge dot variant="success">
        <Button size="sm">成功</Button>
      </Badge>
      <Badge dot variant="warning">
        <Button size="sm">警告</Button>
      </Badge>
      <Badge dot variant="danger">
        <Button size="sm">危险</Button>
      </Badge>
    </div>

    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Badge badgeContent="NEUTRAL" variant="neutral">
        <Button size="sm">中性填充</Button>
      </Badge>
      <Badge badgeContent="PRIMARY" variant="primary">
        <Button size="sm">主色填充</Button>
      </Badge>
      <Badge badgeContent="SUCCESS" variant="success">
        <Button size="sm">成功填充</Button>
      </Badge>
      <Badge badgeContent="WARNING" variant="warning">
        <Button size="sm">警告填充</Button>
      </Badge>
      <Badge badgeContent="DANGER" variant="danger">
        <Button size="sm">危险填充</Button>
      </Badge>
    </div>

    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Badge badgeContent="PRIMARY" variant="primary" light>
        <Button size="sm">主色轻量</Button>
      </Badge>
      <Badge badgeContent="SUCCESS" variant="success" light>
        <Button size="sm">成功轻量</Button>
      </Badge>
      <Badge badgeContent="WARNING" variant="warning" light>
        <Button size="sm">警告轻量</Button>
      </Badge>
      <Badge badgeContent="DANGER" variant="danger" light>
        <Button size="sm">危险轻量</Button>
      </Badge>
    </div>

    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Badge dot variant="primary" light>
        <Button size="sm">dot+light 仍填充</Button>
      </Badge>
      <Badge dot variant="success" light>
        <Button size="sm">dot+light 仍填充</Button>
      </Badge>
    </div>
  </div>
);`;

export default function BadgeDotVariantDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}