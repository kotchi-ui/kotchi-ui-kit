import {
  kuiCustomElement,
  kuiAttribute,
  kuiAttributeValidator,
  kuiChangeHandler,
  kuiEventEmetter,
  Types,
  typeValidator,
  isTrueAttribute,
  CustomElementUtils,
} from "kotchi-core";
import KUIIcon from "../kui-icon";
import templateGenerator from "./template";

const tagName = "kui-section";
const {
  useShadowDom,
  booleanSetter,
  booleanGetter,
  getSlotNodes,
} = CustomElementUtils;

const Style = {
  Primary: "primary",
  Secondary: "secondary",
  Information: "info",
  Danger: "danger",
  Warning: "warning",
  Success: "success",
  Light: "light",
  Dark: "dark",
};

const Events = {
  ExpandChanged: `${tagName}:expand-changed`,
};

const CollapseBy = {
  None: null,
  ByHeader: "header",
  ByIcon: "icon",
};

/**
 * Section element
 */
@kuiEventEmetter
@kuiCustomElement({ tagName })
class KUISection extends HTMLElement {
  @kuiAttributeValidator([typeValidator(Types.String)])
  @kuiAttribute
  kuiHeaderTitle;

  @kuiAttributeValidator([typeValidator(Types.String)])
  @kuiAttribute
  kuiHeaderIcon;

  @kuiAttributeValidator([typeValidator(Style)])
  @kuiAttribute
  kuiStyle = Style.Light;

  @kuiAttributeValidator([typeValidator(CollapseBy)])
  @kuiAttribute
  kuiCollapseBy;

  @kuiAttributeValidator([typeValidator(Types.Boolean)])
  @kuiAttribute({ setter: booleanSetter, getter: booleanGetter })
  kuiAllowFullscreen = false;

  @kuiAttributeValidator([typeValidator(Types.Boolean)])
  @kuiAttribute({ setter: booleanSetter, getter: booleanGetter })
  kuiClosable = false;

  @kuiAttributeValidator([typeValidator(Types.Boolean)])
  @kuiAttribute({ setter: booleanSetter, getter: booleanGetter })
  kuiCollapsed = false;

  @kuiAttributeValidator([typeValidator(Types.Boolean)])
  @kuiAttribute({ setter: booleanSetter, getter: booleanGetter })
  kuiOutline = false;

  constructor() {
    super();
    const { template, selectors } = templateGenerator.call(this, tagName);
    useShadowDom({ host: this, template });
    this.initElements({ selectors });
    this.bindHandlers();
    this._expanded = true;
  }

  initElements({ selectors }) {
    this.elements = {
      section: this.shadowRoot.querySelector(selectors.section),
      header: this.shadowRoot.querySelector(selectors.header),
      headerIcon: this.shadowRoot.querySelector(selectors.headerIcon),
      headerTitle: this.shadowRoot.querySelector(selectors.headerTitle),
      collapseAction: this.shadowRoot.querySelector(selectors.collapseAction),
      fullScreenAction: this.shadowRoot.querySelector(
        selectors.fullScreenAction
      ),
      closeAction: this.shadowRoot.querySelector(selectors.closeAction),
      contentsContainer: this.shadowRoot.querySelector(
        selectors.contentsContainer
      ),
      contents: this.shadowRoot.querySelector(selectors.contents),
      footer: this.shadowRoot.querySelector(selectors.footer),
    };
  }

  bindHandlers() {
    this.headerClickHandler = this.headerClickHandler.bind(this);
    this.expandClickHandler = this.expandClickHandler.bind(this);
    this.fullScreenClickHandler = this.fullScreenClickHandler.bind(this);
    this.closeClickHandler = this.closeClickHandler.bind(this);
  }

  connectedCallback() {
    this.updateFooterVisibility();
    this.elements.footer.addEventListener("slotchange", () => {
      this.updateFooterVisibility();
    });
  }

  disconnectedCallback() {
    this.elements.closeAction.removeEventListener(
      "click",
      this.closeClickHandler
    );
    this.elements.fullScreenAction.removeEventListener(
      "click",
      this.fullScreenClickHandler
    );
    this.elements.collapseAction.removeEventListener(
      "click",
      this.expandClickHandler
    );
    this.elements.header.removeEventListener("click", this.headerClickHandler);
  }

  updateFooterVisibility() {
    const { footer } = this.elements;
    if (getSlotNodes(footer).length === 0) {
      footer.parentNode.classList.add("d-none");
    } else {
      footer.parentNode.classList.remove("d-none");
    }
    if (this._expanded) {
      const { contentsContainer } = this.elements;
      contentsContainer.style.maxHeight = contentsContainer.scrollHeight + "px";
    }
  }

  @kuiChangeHandler
  kuiHeaderTitleChangeHandler({ newValue }) {
    this.elements.headerTitle.innerText = newValue;
  }

  @kuiChangeHandler
  kuiHeaderIconChangeHandler({ newValue }) {
    if (!newValue) {
      this.elements.headerIcon.classList.add("hide");
    } else {
      this.elements.headerIcon.classList.remove("hide");
      this.elements.headerIcon.kuiIcon = newValue;
    }
  }

  @kuiChangeHandler
  kuiStyleChangeHandler() {
    this.applySectionStyle();
  }

  @kuiChangeHandler
  kuiOutlineChangeHandler() {
    this.applySectionStyle();
  }

  applySectionStyle() {
    //cleanup previous value
    this.elements.section.className = "card";
    this.elements.header.className = "card-header";
    if (this.kuiOutline) {
      this.elements.section.classList.add(`border-${this.kuiStyle}`);
      this.elements.header.classList.add(`bg-${this.kuiStyle}`);
      if (this.kuiStyle !== Style.Light) {
        this.elements.header.classList.add("text-white");
      }
    } else {
      this.elements.section.classList.add(`bg-${this.kuiStyle}`);
      if (this.kuiStyle !== Style.Light) {
        this.elements.section.classList.add("text-white");
      }
    }
  }

  @kuiChangeHandler
  kuiCollapseByChangeHandler({ newValue }) {
    if (newValue === CollapseBy.ByHeader) {
      this.elements.collapseAction.parentNode.classList.remove("visible");
      this.elements.collapseAction.removeEventListener(
        "click",
        this.expandClickHandler
      );
      this.elements.header.addEventListener("click", this.headerClickHandler);
    } else if (newValue === CollapseBy.ByIcon) {
      this.elements.collapseAction.parentNode.classList.add("visible");
      this.elements.collapseAction.addEventListener(
        "click",
        this.expandClickHandler
      );
      this.elements.header.removeEventListener(
        "click",
        this.headerClickHandler
      );
    } else {
      this.elements.collapseAction.parentNode.classList.remove("visible");
      this.elements.collapseAction.removeEventListener(
        "click",
        this.expandClickHandler
      );
      this.elements.header.removeEventListener(
        "click",
        this.headerClickHandler
      );
    }
  }

  @kuiChangeHandler
  kuiAllowFullscreenChangeHandler({ newValue }) {
    if (isTrueAttribute(newValue)) {
      this.elements.fullScreenAction.parentNode.classList.add("visible");
      this.elements.fullScreenAction.addEventListener(
        "click",
        this.fullScreenClickHandler
      );
    } else {
      this.elements.fullScreenAction.parentNode.classList.remove("visible");
      this.elements.fullScreenAction.removeEventListener(
        "click",
        this.fullScreenClickHandler
      );
    }
  }

  @kuiChangeHandler
  kuiClosableChangeHandler({ newValue }) {
    if (isTrueAttribute(newValue)) {
      this.elements.closeAction.parentNode.classList.add("visible");
      this.elements.closeAction.addEventListener(
        "click",
        this.closeClickHandler
      );
    } else {
      this.elements.closeAction.parentNode.classList.remove("visible");
      this.elements.closeAction.removeEventListener(
        "click",
        this.closeClickHandler
      );
    }
  }

  @kuiChangeHandler
  kuiCollapsedChangeHandler({ newValue, oldValue }) {
    if (isTrueAttribute(newValue)) {
      this.collapse();
    } else if (isTrueAttribute(oldValue)) {
      this.expand();
    }
  }

  closeClickHandler(e) {
    e.stopPropagation();
    // logger.info("Removing the section from the page");
    this.parentNode.removeChild(this);
  }

  headerClickHandler() {
    // logger.info("Header clicked, changing visibility state");
    this.changeCollapsingState();
  }

  expandClickHandler() {
    // logger.info("Icon clicked, changing visibility state");
    this.changeCollapsingState();
  }

  changeCollapsingState() {
    const { section } = this.elements;
    if (section.className.indexOf("kui-collapsed") === -1) {
      this.kuiCollapsed = true;
    } else {
      this.kuiCollapsed = false;
    }
  }

  collapse(tiggerEvent = true) {
    this._expanded = false;
    this.elements.section.classList.add("kui-collapsed");
    this.elements.collapseAction.kuiRotate = KUIIcon.Rotate.Rotate180;
    this.elements.contentsContainer.style.maxHeight = null;
    if (tiggerEvent) this.trigger(Events.ExpandChanged, false);
  }

  expand(tiggerEvent = true) {
    this._expanded = true;
    this.elements.section.classList.remove("kui-collapsed");
    this.elements.collapseAction.kuiRotate = KUIIcon.Rotate.Rotate360;
    const { contentsContainer } = this.elements;
    contentsContainer.style.maxHeight = contentsContainer.scrollHeight + "px";
    if (tiggerEvent) this.trigger(Events.ExpandChanged, true);
  }

  fullScreenClickHandler(e) {
    e.stopPropagation();
    // logger.info("Going fullscreen");
    this.classList.toggle("fullscreen");
    this.elements.section.classList.toggle("fullscreen");
    const { contentsContainer } = this.elements;
    if (this.className.indexOf("fullscreen") === -1) {
      contentsContainer.style.maxHeight = contentsContainer.scrollHeight + "px";
      this.elements.fullScreenAction.kuiIcon = "fas fa-expand-alt";
    } else {
      contentsContainer.style.maxHeight = "initial";
      this.elements.fullScreenAction.kuiIcon = "fas fa-compress-alt";
    }
  }

  getTagName() {
    return tagName;
  }

  static get Style() {
    return Style;
  }

  static get CollapseBy() {
    return CollapseBy;
  }

  static get Events() {
    return Events;
  }
}

export { KUISection as default, Events };
