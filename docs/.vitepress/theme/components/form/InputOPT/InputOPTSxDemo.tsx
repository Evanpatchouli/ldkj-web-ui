import * as React from "react";
import { InputOPT } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const [code, setCode] = React.useState("82");

  return (
    <InputOPT
      value={code}
      length={4}
      variant="filled"
      placeholder="0"
      onChange={setCode}
      aria-label="主题验证码"
      sx={{
        "& [data-active]": {
          borderColor: "#0d9488",
          boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.22)",
        },
        "& [data-filled]": {
          background: "#ccfbf1",
          borderColor: "#5eead4",
          color: "#0f766e",
        },
      }}
    />
  );
};

const code = `
import * as React from "react";
import { InputOPT } from "@ldkj/web-ui";

const Example = () => {
  const [code, setCode] = React.useState("82");

  return (
    <InputOPT
      value={code}
      length={4}
      variant="filled"
      placeholder="0"
      onChange={setCode}
      aria-label="主题验证码"
      sx={{
        "& [data-active]": {
          borderColor: "#0d9488",
          boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.22)",
        },
        "& [data-filled]": {
          background: "#ccfbf1",
          borderColor: "#5eead4",
          color: "#0f766e",
        },
      }}
    />
  );
};`;

export default function InputOPTSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
