import React from "react";
import CodeView from "../../CodeView";
import { Alert } from "@ldkj/web-ui";
export default function AlertDemo(){
  return <CodeView code={`<Alert variant="success" title="已发布" description="版本已成功发布" />`}>
    <div style={{display:"grid",gap:12}}>
      <Alert variant="info" title="提示" description="这是信息提示" />
      <Alert variant="success" title="成功" description="保存成功" />
      <Alert variant="warning" title="警告" description="请确认配置" />
      <Alert variant="error" title="失败" description="请求失败，请重试" />
    </div>
  </CodeView>
}