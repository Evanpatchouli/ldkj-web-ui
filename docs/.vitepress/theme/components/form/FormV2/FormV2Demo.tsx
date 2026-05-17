import React from "react";
import CodeView from "../../CodeView";
import { FormV2, Input, Button, Label } from "@ldkj/web-ui";
export default function FormV2Demo(){
  return <CodeView code={`<FormV2 onSubmit={...}>...</FormV2>`}>
    <FormV2 onSubmit={(e)=>e.preventDefault()} style={{maxWidth:360}}>
      <div><Label>姓名</Label><Input placeholder="请输入姓名"/></div>
      <div><Label>邮箱</Label><Input type="email" placeholder="name@example.com"/></div>
      <Button type="submit">提交</Button>
    </FormV2>
  </CodeView>
}