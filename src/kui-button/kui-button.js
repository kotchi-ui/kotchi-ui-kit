import _isFunction from "lodash/isFunction";
import {
  kuiCustomElement,
  kuiAttribute,
  kuiAttributeValidator,
  kuiChangeHandler,
  kuiStyleChangeHandler,
  Types,
  typeValidator,
  isTrueAttribute,
  CustomElementUtils,
} from "kotchi-core";

import templateGenerator from "./template";

const tagName = "kui-button";

const { booleanSetter, booleanGetter, useShadowDom } = CustomElementUtils;

const Style = {
  Primary: `${tagName}-primary`,
  Secondary: `${tagName}-secondary`,
  Information: `${tagName}-info`,
  Danger: `${tagName}-danger`,
  Warning: `${tagName}-warning`,
  Success: `${tagName}-success`,
  Link: `${tagName}-link`,
};

const Size = {
  Normal: null,
  Small: `${tagName}-small`,
  Large: `${tagName}-large`,
  Block: `${tagName}-block`,
};

/**
 * Button component that has predefined styles and sizes to serve different semantic purposes with few extras.
 *
 * @element kui-button
 *
 * @slot - The default slot act as the button's inner html
 *
 */
@kuiCustomElement({ tagName })
class KUIButton extends HTMLElement {
  /**
   * Predefined styles that serves different semantic purposes
   * @type {"kui-button-primary"|"kui-button-secondary"|"kui-button-info"|"kui-button-danger"|"kui-button-warning"|"kui-button-success"|"kui-button-link"}
   * @attr kui-style
   */
  @kuiAttributeValidator([typeValidator(Style)])
  @kuiAttribute
  kuiStyle = Style.Secondary;
  /**
   * Predefined sizes smaller or bigger than the default one
   * @type {null|"kui-button-small"|"kui-button-large"|"kui-button-block"}
   * @attr kui-size
   */
  @kuiAttributeValidator([typeValidator(Size)])
  @kuiAttribute
  kuiSize;
  /**
   * Display the button in an outline style
   * @type {Boolean}
   * @attr kui-outline
   */
  @kuiAttributeValidator([typeValidator(Types.Boolean)])
  @kuiAttribute({ setter: booleanSetter, getter: booleanGetter })
  kuiOutline = false;
  /**
   * Sets the button in a disabled state
   * @type {Boolean}
   * @attr kui-disabled
   */
  @kuiAttributeValidator([typeValidator(Types.Boolean)])
  @kuiAttribute({ setter: booleanSetter, getter: booleanGetter })
  kuiDisabled = false;

  constructor() {
    super();
    const { template, selectors } = templateGenerator.call(this, tagName);
    useShadowDom({ host: this, template });
    /**
     * The component's DOM elements
     */
    this.elements = {
      button: this.shadowRoot.querySelector(selectors.button),
    };
  }

  @kuiStyleChangeHandler("button")
  kuiStyleChangeHandler({ newValue, oldValue }) {
    if (isTrueAttribute(this.kuiOutline)) {
      this.applyOutlineButtonStyle(true, newValue, oldValue);
    }
  }

  @kuiStyleChangeHandler("button")
  kuiSizeChangeHandler() {}

  @kuiChangeHandler
  kuiOutlineChangeHandler({ newValue }) {
    this.applyOutlineButtonStyle(isTrueAttribute(newValue), this.kuiStyle);
  }

  @kuiStyleChangeHandler({
    element: "button",
    className: "disabled",
    attributeName: "disabled",
  })
  kuiDisabledChangeHandler() {}

  applyOutlineButtonStyle(outline, newStyle, oldStyle) {
    const newOutlineStyle = newStyle.replace(`${tagName}-`, "");
    if (outline) {
      this.elements.button.classList.add(
        `${tagName}-outline-${newOutlineStyle}`
      );
      this.elements.button.classList.remove(newStyle);
    } else {
      this.elements.button.classList.remove(
        `${tagName}-outline-${newOutlineStyle}`
      );
      this.elements.button.classList.add(newStyle);
    }
    if (oldStyle) {
      const oldOutlineStyle = oldStyle.replace(`${tagName}-`, "");
      this.elements.button.classList.remove(
        `${tagName}-outline-${oldOutlineStyle}`
      );
    }
  }

  /**
   * Add a click handler for the button
   * @param {function} handler - The click handler to be added
   */
  addClickHandler(handler) {
    if (_isFunction(handler)) {
      this.elements.button.addEventListener("click", handler);
    }
  }
  /**
   * Removes the given click handler from the button
   * @param {function} handler - The click handler to be removed
   */
  removeClickHandler(handler) {
    if (handler) {
      this.elements.button.removeEventListener("click", handler);
    }
  }

  /**
   * Required function that return the elemnt's tag name
   */
  getTagName() {
    return tagName;
  }

  static get Style() {
    return Style;
  }

  static get Size() {
    return Size;
  }
}

export default KUIButton;
