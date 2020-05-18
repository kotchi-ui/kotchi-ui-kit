import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { enumValues } from "../storyUtils";
import KUIAccordion from "./";

export default { title: "Accordion <kui-accordion>", decorators: [withKnobs] };

export const basicUsage = () => {
  const groupId = "kui-accordion";
  const kuiExpandedChildIndex = text(
    "Initialy expanded section - zero based index (kui-expanded-child-index)",
    "1",
    groupId
  );
  const kuiAutoCollapse = boolean(
    "Auto collapse (kui-auto-collapse)",
    true,
    groupId
  );
  return `
    <kui-accordion 
        ${kuiExpandedChildIndex ? " kui-expanded-child-index='" + kuiExpandedChildIndex + "'" : ""}
        ${kuiAutoCollapse ? " kui-auto-collapse" : ""}
    >
		<kui-section kui-collapse-by="header" kui-style="primary" kui-header-title="at auctor" kui-outline>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Augue lacus viverra vitae congue.
			</p>
		</kui-section>
		<kui-section kui-collapse-by="header" kui-style="primary" kui-header-title="mauris pharetra" kui-outline>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Scelerisque viverra mauris in aliquam sem fringilla ut morbi.
			</p>
		</kui-section>
	</kui-accordion>
    <h5>Use Knobs to see different states of the component</h5>`;
};
