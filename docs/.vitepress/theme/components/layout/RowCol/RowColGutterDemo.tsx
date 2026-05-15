import { Row, Col, Box } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Row, Col, Box } from "@ldkj/web-ui";

export function Example() {
  return (
    <Row gutter={[1, 3]}>
      <Col span={6}><Box className="rounded bg-slate-100 p-3">6</Box></Col>
      <Col span={6}><Box className="rounded bg-slate-100 p-3">6</Box></Col>
      <Col span={6}><Box className="rounded bg-slate-100 p-3">6</Box></Col>
      <Col span={6}><Box className="rounded bg-slate-100 p-3">6</Box></Col>
    </Row>
  );
}`;

export default function RowColGutterDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Row gutter={[1, 3]}>
          <Col span={6}>
            <Box className="rounded bg-slate-100 p-3">6</Box>
          </Col>
          <Col span={6}>
            <Box className="rounded bg-slate-100 p-3">6</Box>
          </Col>
          <Col span={6}>
            <Box className="rounded bg-slate-100 p-3">6</Box>
          </Col>
          <Col span={6}>
            <Box className="rounded bg-slate-100 p-3">6</Box>
          </Col>
        </Row>
      </Box>
    </CodeView>
  );
}

