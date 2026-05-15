import { Row, Col, Card, Box } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Row, Col, Card } from "@ldkj/web-ui";

export function Example() {
  return (
    <Row gutter={2}>
      <Col span={8}>
        <Card><Card.Content>A</Card.Content></Card>
      </Col>
      <Col span={8}>
        <Card><Card.Content>B</Card.Content></Card>
      </Col>
      <Col span={8}>
        <Card><Card.Content>C</Card.Content></Card>
      </Col>
    </Row>
  );
}`;

export default function RowColBasicDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Row gutter={2}>
          <Col span={8}>
            <Card>
              <Card.Content>A</Card.Content>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Card.Content>B</Card.Content>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Card.Content>C</Card.Content>
            </Card>
          </Col>
        </Row>
      </Box>
    </CodeView>
  );
}

