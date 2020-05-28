import {
  kuiCustomElement,
  kuiAttribute,
  kuiAttributeValidator,
  kuiChangeHandler,
  kuiStyleChangeHandler,
  Types,
  typeValidator,
  CustomElementUtils,
} from "@kotchi-ui/core";
import templateGenerator, { screanReaderCreator } from "./template";

const tagName = "kui-icon";

const { booleanSetter, booleanGetter, useShadowDom } = CustomElementUtils;

const Animate = {
  None: null,
  Spin: "fa-spin",
  Pulse: "fa-pulse",
};
const Flip = {
  None: null,
  FlipVer: "fa-flip-vertical",
  FlipHor: "fa-flip-horizontal",
  FlipBoth: "fa-flip-both",
};
const PullDirection = {
  None: null,
  Left: "fa-pull-left",
  Right: "fa-pull-right",
};
const Rotate = {
  None: null,
  Rotate90: "fa-rotate-90",
  Rotate180: "fa-rotate-180",
  Rotate270: "fa-rotate-270",
  Rotate360: "fa-rotate-360",
};
const Size = {
  Normal: null,
  XSmall: "fa-xs",
  Small: "fa-sm",
  Large: "fa-lg",
  X2: "fa-2x",
  X3: "fa-3x",
  X4: "fa-4x",
  X5: "fa-5x",
  X6: "fa-6x",
  X7: "fa-7x",
  X8: "fa-8x",
  X9: "fa-9x",
  X10: "fa-10x",
};
const FixedWidth = "fa-fw";
const Bordered = "fa-border";

/**
 * FontAwesome Icon element
 */
@kuiCustomElement({ tagName })
class KUIIcon extends HTMLElement {
  @kuiAttributeValidator([typeValidator(Types.String)])
  @kuiAttribute
  kuiLabel;

  @kuiAttributeValidator([typeValidator(Types.String)])
  @kuiAttribute
  kuiIcon;

  @kuiAttributeValidator([typeValidator(Size)])
  @kuiAttribute
  kuiSize;

  @kuiAttributeValidator([typeValidator(Types.Boolean)])
  @kuiAttribute({ setter: booleanSetter, getter: booleanGetter })
  kuiFixedWidth = false;

  @kuiAttributeValidator([typeValidator(Types.Boolean)])
  @kuiAttribute({ setter: booleanSetter, getter: booleanGetter })
  kuiBordered = false;

  @kuiAttributeValidator([typeValidator(PullDirection)])
  @kuiAttribute
  kuiPull;

  @kuiAttributeValidator([typeValidator(Animate)])
  @kuiAttribute
  kuiAnimate;

  @kuiAttributeValidator([typeValidator(Rotate)])
  @kuiAttribute
  kuiRotate;

  @kuiAttributeValidator([typeValidator(Flip)])
  @kuiAttribute
  kuiFlip;

  constructor() {
    super();
    const { template, selectors } = templateGenerator.call(this, tagName);
    useShadowDom({ host: this, template });
    this.elements = {
      icon: this.shadowRoot.querySelector(selectors.icon),
      screenReader: this.shadowRoot.querySelector(selectors.screenReader),
    };
  }

  connectedCallback() {
    /**
     * This trick is needed to support the CSS font face in the shadow dom
     * the font needs to be defined in the base HTML page
     */
    const faScriptId = "font-awesome-script";
    if (!document.head.querySelector(`script[id="${faScriptId}"]`)) {
      const faScriptElement = document.createElement("script");
      faScriptElement.setAttribute("id", faScriptId);
      faScriptElement.setAttribute(
        "src",
        "https://kit.fontawesome.com/e57b7c9880.js"
      );
      faScriptElement.setAttribute("crossorigin", "anonymous");
      document.head.appendChild(faScriptElement);
    }
  }

  @kuiChangeHandler
  kuiLabelChangeHandler({ newValue }) {
    if (this.elements.screenReader === null) {
      this.elements.screenReader = screanReaderCreator();
      this.shadowRoot.appendChild(this.elements.screenReader);
    }
    this.elements.screenReader.innerText = newValue;
  }

  @kuiStyleChangeHandler("icon")
  kuiIconChangeHandler() {}

  @kuiStyleChangeHandler("icon")
  kuiSizeChangeHandler() {}

  @kuiStyleChangeHandler("icon")
  kuiPullChangeHandler() {}

  @kuiStyleChangeHandler("icon")
  kuiAnimateChangeHandler() {}

  @kuiStyleChangeHandler("icon")
  kuiRotateChangeHandler() {}

  @kuiStyleChangeHandler("icon")
  kuiFlipChangeHandler() {}

  @kuiStyleChangeHandler({ element: "icon", className: FixedWidth })
  kuiFixedWidthChangeHandler() {}

  @kuiStyleChangeHandler({ element: "icon", className: Bordered })
  kuiBorderedChangeHandler() {}

  getTagName() {
    return tagName;
  }

  static get PullDirection() {
    return PullDirection;
  }
  static get Rotate() {
    return Rotate;
  }
  static get Flip() {
    return Flip;
  }
  static get Animate() {
    return Animate;
  }
  static get Size() {
    return Size;
  }
  static get FixedWidth() {
    return FixedWidth;
  }
  static get Bordered() {
    return Bordered;
  }
}

export { KUIIcon as default };
