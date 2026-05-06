import { Row, Col, Box } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Row, Col, Box } from "@ldkj/web-ui";

export function Example() {
  return (
    <Row gutter={2} align="end" justify="space-between">
      <Col span={6}><Box className="h-12 rounded bg-blue-100 p-2">A</Box></Col>
      <Col span={6}><Box className="h-20 rounded bg-blue-100 p-2">B</Box></Col>
      <Col span={6}><Box className="h-16 rounded bg-blue-100 p-2">C</Box></Col>
    </Row>
  );
}`;

export default function RowColAlignDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Row gutter={2} align="end" justify="space-between">
          <Col span={6}>
            <Box className="h-12 rounded bg-blue-100 p-2">A</Box>
          </Col>
          <Col span={6}>
            <Box className="h-20 rounded bg-blue-100 p-2">B</Box>
          </Col>
          <Col span={6}>
            <Box className="h-16 rounded bg-blue-100 p-2">C</Box>
          </Col>
        </Row>
      </Box>
    </CodeView>
  );
}
