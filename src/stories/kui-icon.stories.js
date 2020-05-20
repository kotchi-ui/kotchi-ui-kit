import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { enumValues } from "./storyUtils";
import { KUIIcon } from "../";

export default { title: "FA Icon <kui-icon>", decorators: [withKnobs] };

export const basicUsage = () => {
  const groupId = "kui-icon";

  const kuiIcon = text("FA Icon class (kui-icon)", "fas fa-thumbs-up", groupId);
  const kuiLabel = text(
    "Label for screen readers (kui-label)",
    "Sweet!",
    groupId
  );
  const kuiSize = select(
    "Size (kui-size)",
    enumValues(KUIIcon.Size),
    KUIIcon.Size.X5,
    groupId
  );
  const kuiFixedWidth = boolean(
    "Fixed width (kui-fixed-width)",
    false,
    groupId
  );
  const kuiBordered = boolean("Bordered (kui-bordered)", false, groupId);
  const kuiPull = select(
    "Pull direction (kui-pull)",
    enumValues(KUIIcon.PullDirection),
    KUIIcon.PullDirection.None,
    groupId
  );

  const kuiAnimate = select(
    "Animation (kui-animate)",
    enumValues(KUIIcon.Animate),
    KUIIcon.Animate.None,
    groupId
  );
  const kuiRotate = select(
    "Rotate (kui-rotate)",
    enumValues(KUIIcon.Rotate),
    KUIIcon.Rotate.None,
    groupId
  );
  const kuiFlip = select(
    "Flip (kui-flip)",
    enumValues(KUIIcon.Flip),
    KUIIcon.Flip.None,
    groupId
  );

  return `
    <kui-icon 
        kui-icon="${kuiIcon}"
        ${kuiLabel ? " kui-label='" + kuiLabel + "'" : ""}
        ${kuiSize ? " kui-size='" + kuiSize + "'" : ""}
        ${kuiSize ? " kui-size='" + kuiSize + "'" : ""}
        ${kuiFixedWidth ? " kui-fixed-width" : ""}
        ${kuiBordered ? " kui-bordered" : ""}
        ${kuiPull ? " kui-pull='" + kuiPull + "'" : ""}
        ${kuiAnimate ? " kui-animate='" + kuiAnimate + "'" : ""}
        ${kuiRotate ? " kui-rotate='" + kuiRotate + "'" : ""}
        ${kuiFlip ? " kui-flip='" + kuiFlip + "'" : ""}
        >
    </kui-icon>
    <h5>Use Knobs to see different states of the component</h5>`;
};
