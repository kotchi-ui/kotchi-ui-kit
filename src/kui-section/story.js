import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { enumValues } from "../storyUtils";
import KUISection from "./";

export default { title: "Section <kui-section>", decorators: [withKnobs] };

export const basicUsage = () => {
  const groupId = "kui-section";
  const kuiHeaderTitle = text(
    "Section header title (kui-header-title)",
    "My KUI Section",
    groupId
  );
  const kuiHeaderIcon = text(
    "Section header icon (kui-header-icon)",
    "fab fa-apple",
    groupId
  );
  const kuiStyle = select(
    "Section's style (kui-style)",
    enumValues(KUISection.Style),
    KUISection.Style.Secondary,
    groupId
  );
  const kuiOutline = boolean(
    "Section outline style (kui-outline)",
    false,
    groupId
  );
  const kuiCollapsedBy = select(
    "Section collapsed by (kui-collapsed-by)",
    enumValues(KUISection.CollapseBy),
    KUISection.CollapseBy.ByHeader,
    groupId
  );
  const kuiCollapsed = boolean(
    "Section collapsed (kui-collapsed)",
    false,
    groupId
  );
  const kuiClosable = boolean(
    "Section closable (kui-colsable)",
    false,
    groupId
  );
  const kuiAllowFullscreen = boolean(
    "Allow section full screen mode (kui-allow-fullscreen)",
    false,
    groupId
  );

  const footer = text(
    "Section's footer (slot='footer')",
    "This is footer",
    groupId
  );

  return `
  <kui-section 
  kui-header-title=${kuiHeaderTitle}
  kui-header-icon=${kuiHeaderIcon}
  kui-style="${kuiStyle}"
    ${kuiCollapsedBy ? " kui-collapsed-by='" + kuiCollapsedBy + "'" : ""}
    ${kuiOutline ? " kui-outline" : ""}
    ${kuiCollapsed ? " kui-collapsed" : ""}
    ${kuiClosable ? " kui-closable" : ""}
    ${kuiAllowFullscreen ? " kui-allow-fullscreen" : ""}
>
    <p>Section contents</p>
    ${footer ? "<div slot='footer'>" + footer + "</div>" : ""}
</kui-section>
<div>
<pre>
    <code>
&lt;kui-section 
  kui-header-title=${kuiHeaderTitle}
  kui-header-icon=${kuiHeaderIcon}
  kui-style="${kuiStyle}"
    ${kuiCollapsedBy ? " kui-collapsed-by='" + kuiCollapsedBy + "'" : ""}
    ${kuiOutline ? " kui-outline" : ""}
    ${kuiCollapsed ? " kui-collapsed" : ""}
    ${kuiClosable ? " kui-closable" : ""}
    ${kuiAllowFullscreen ? " kui-allow-fullscreen" : ""}
&gt;
    &lt;p&gt;Section contents&lt;/p&gt;
    ${footer ? "&lt;div slot='footer'&gt;" + footer + "&lt;/div&gt;" : ""}
&lt;/kui-section&gt;
    </code>
</pre>
  </div>

`;
};
