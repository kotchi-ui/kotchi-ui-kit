import _isUndefined from "lodash/isUndefined";
import {
  kuiCustomElement,
  kuiAttribute,
  kuiAttributeValidator,
  kuiChangeHandler,
  Types,
  typeValidator,
  isTrueAttribute,
  CustomElementUtils,
} from "@kotchi-ui/core";

import "../kui-section";
import { Events as KUISectionEvents } from "../kui-section";
import templateGenerator from "./template";

const tagName = "kui-accordion";

const { booleanSetter, booleanGetter, useShadowDom } = CustomElementUtils;

/**
 * Accordion element
 * Only kui-section children are allowed
 */
@kuiCustomElement({ tagName, allowedChildren: ["kui-section"] })
class KUIAccordion extends HTMLElement {
  @kuiAttributeValidator([typeValidator(Types.Number)])
  @kuiAttribute
  kuiExpandedIndex = 0;

  @kuiAttributeValidator([typeValidator(Types.Boolean)])
  @kuiAttribute({ setter: booleanSetter, getter: booleanGetter })
  kuiAutoCollapse = false;

  constructor() {
    super();
    const { template, selectors } = templateGenerator.call(this, tagName);
    useShadowDom({ host: this, template });
    this.initElements({ selectors });
    this._lastExpandedIndex = -1;
  }

  initElements({ selectors }) {
    this.elements = {
      accordion: this.shadowRoot.querySelector(selectors.accordion),
      contentsContainer: this.shadowRoot.querySelector(
        selectors.contentsContainer
      ),
      sections: [],
    };
  }

  sectionExpandChangedHandler(index, expanded) {
    if (
      expanded &&
      this.kuiAutoCollapse &&
      this._lastExpandedIndex !== -1 &&
      this._lastExpandedIndex !== index
    ) {
      this.elements.sections[this._lastExpandedIndex].kuiCollapsed = true;
    }
    if (expanded) {
      this._lastExpandedIndex = index;
    }
  }

  connectedCallback(children) {
    this.elements.sections = children;
    this.elements.sections.forEach((section, index) =>
      section.on(
        KUISectionEvents.ExpandChanged,
        this.sectionExpandChangedHandler.bind(this, index)
      )
    );
  }

  @kuiChangeHandler
  kuiExpandedIndexChangeHandler({ newValue }) {
    this.expandSection(Number.parseInt(newValue));
  }

  @kuiChangeHandler
  kuiAutoCollapseChangeHandler({ newValue }) {
    if (isTrueAttribute(newValue)) {
      this.collapseAllKeepingOneExpanded();
    }
  }

  getTagName() {
    return tagName;
  }

  collapseAllKeepingOneExpanded() {
    const lastExpandedIndex =
      this._lastExpandedIndex === -1
        ? Number.parseInt(this.kuiExpandedIndex)
        : this._lastExpandedIndex;
    this.elements.sections.forEach((section, index) => {
      if (index !== lastExpandedIndex) {
        section.kuiCollapsed = true;
      } else {
        section.kuiCollapsed = false;
        this._lastExpandedIndex = index;
      }
    });
  }
  expandSection(index) {
    const section = this.elements.sections[index];
    if (!_isUndefined(section) && this._lastExpandedIndex !== index) {
      section.kuiCollapsed = false;
    }
  }
}

export default KUIAccordion;
