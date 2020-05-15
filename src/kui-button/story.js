import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { enumValues } from "../storyUtils";
import KUIButton from "./";

export default { title: "Button <kui-button>", decorators: [withKnobs] };

export const basicUsage = () => {
  const label = text("Button label", "kui button", "kui-button");
  const style = select(
    "kui-style",
    enumValues(KUIButton.Style),
    KUIButton.Style.Secondary,
    "kui-button"
  );
  const size = select(
    "kui-size",
    enumValues(KUIButton.Size),
    KUIButton.Size.Small,
    "kui-button"
  );
  const outline = boolean("kui-outline", false, "kui-button");
  const disabled = boolean("kui-disabled", false, "kui-button");

  return `
  <kui-button 
  kui-style="${style}"
    ${size ? 'kui-size="' + size + '"' : ""}
    ${outline ? "kui-outline" : ""}
    ${disabled ? "kui-disabled" : ""}
>${label}</kui-button>
<div>
<pre>
    <code>
    &lt;kui-button kui-style="${style}"${
    size ? ' kui-size="' + size + '"' : ""
  }${outline ? " kui-outline" : ""}${
    disabled ? " kui-disabled" : ""
  }&gt;${label}&lt;/kui-button&gt;
    </code>
</pre>
  </div>

`;
};
