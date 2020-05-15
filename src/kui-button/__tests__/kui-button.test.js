import { Window } from "happy-dom";
import KUIButton from "../";

const window = new Window();
const document = window.document;
let kuiButton;

beforeEach(() => {
  document.body.innerHTML =
    '<kui-button id="my-kui-button">My Button</kui-button>';
  kuiButton = document.querySelector("#my-kui-button");
});
describe("Make sure component is created", () => {
  test("Make sure <kui-button> is defined as a custom element with shadowRoot", () => {
    expect(kuiButton).not.toBeNull();
    expect(kuiButton.shadowRoot).not.toBeNull();
  });
  test("Make sure <kui-button> has the elements as an attribute with the button on it", () => {
    expect(kuiButton.elements).not.toBeNull();
    expect(kuiButton.elements.button).not.toBeNull();
  });
  test("Make sure component attributes are also reflected on object properties", () => {
    expect("kuiStyle" in kuiButton).toBe(true);
    expect("kuiSize" in kuiButton).toBe(true);
    expect("kuiDisabled" in kuiButton).toBe(true);
    expect("kuiOutline" in kuiButton).toBe(true);
  });
});
describe("Testing <kui-button> attributes", () => {
  describe.each([
    [
      "kui-style",
      "kuiStyle",
      KUIButton.Style.Secondary,
      KUIButton.Style.Primary,
    ],
    ["kui-size", "kuiSize", null, KUIButton.Size.Large],
  ])(
    "Testing %s attribute",
    (attributeName, propertyName, defaultValue, otherValue) => {
      test(`Make sure the ${attributeName} attribute has the default value set`, () => {
        expect(kuiButton.getAttribute(attributeName)).toBe(defaultValue);
        expect(kuiButton[propertyName]).toBe(defaultValue);
      });
      test(`Updating ${propertyName} property updates the attribute with the same value`, () => {
        kuiButton[propertyName] = otherValue;
        expect(kuiButton.getAttribute(attributeName)).toBe(otherValue);
      });
      test(`Updating ${attributeName} attribute updates the property with the same value`, () => {
        kuiButton.setAttribute(attributeName, otherValue);
        expect(kuiButton[propertyName]).toBe(otherValue);
      });
      test(`Updating the ${attributeName} attribute updates the inner <button> element's class names`, () => {
        kuiButton.setAttribute(attributeName, otherValue);
        expect(kuiButton.elements.button.classList.contains(otherValue)).toBe(
          true
        );
      });
    }
  );
  describe.each([
    ["kui-outline", "kuiOutline", "kui-button-outline-secondary", true],
    ["kui-outline", "kuiOutline", "kui-button-outline-secondary", false],
    ["kui-disabled", "kuiDisabled", "disabled", true],
    ["kui-disabled", "kuiDisabled", "disabled", false],
  ])(
    "Testing %s attribute",
    (attributeName, propertyName, className, value) => {
      test(`Set ${propertyName} property to ${value} -> ${
        value ? "adds" : "removes"
      } '${attributeName}' attribute to the <kui-button> element`, () => {
        kuiButton[propertyName] = value;
        expect(kuiButton.hasAttribute(attributeName)).toBe(value);
      });
      test(`Set ${propertyName} property to ${value} -> ${
        value ? "adds" : "removes"
      } className '${className}' to inner <button> element`, () => {
        kuiButton[propertyName] = value;
        expect(kuiButton.elements.button.classList.contains(className)).toBe(
          value
        );
      });
      test(`Set ${attributeName} attribute to ${value} -> ${
        value ? "adds" : "removes"
      } className '${className}' to the inner <button> element`, () => {
        if (value) {
          kuiButton.setAttribute(attributeName, "");
        } else {
          kuiButton.removeAttribute(attributeName);
        }
        expect(kuiButton.elements.button.classList.contains(className)).toBe(
          value
        );
      });
      test(`Set ${attributeName} attribute to ${value} -> ${
        value ? "adds" : "removes"
      } '${attributeName}' attribute from the <kui-button> element`, () => {
        if (value) {
          kuiButton.setAttribute(attributeName, "");
        } else {
          kuiButton.removeAttribute(attributeName);
        }
        expect(kuiButton.hasAttribute(attributeName)).toBe(value);
      });
    }
  );
  describe.each([
    ["kui-style", "kuiStyle", "invalid"],
    ["kui-size", "kuiSize", "invalid"],
  ])(
    "Testing invalid value handeling for %s",
    (attributeName, propertyName, invalidValue) => {
      test(`Tesing invalid value for ${attributeName} attribute`, () => {
        const oldValue = kuiButton.getAttribute(attributeName);
        kuiButton.setAttribute(attributeName, invalidValue);
        expect(kuiButton.getAttribute(attributeName)).toBe(oldValue);
      });
    }
  );
});
describe.each([[true], [false]])(
  "Tesing the disabled state on the inner <button> element",
  (value) => {
    test(`Set kuiDisabled property to ${value} -> ${
      value ? "adds" : "removes"
    } 'disabled' attribute of the inner <button> element`, () => {
      kuiButton.kuiDisabled = value;
      expect(kuiButton.elements.button.hasAttribute("disabled")).toBe(value);
    });
    test(`Set kui-disabled attribute to ${value} -> ${
      value ? "adds" : "removes"
    } 'disabled' attribute of the inner <button> element`, () => {
      if (value) {
        kuiButton.setAttribute("kui-disabled", "");
      } else {
        kuiButton.removeAttribute("kui-disabled");
      }
      expect(kuiButton.elements.button.hasAttribute("disabled")).toBe(value);
    });
  }
);
describe("Test public API", () => {
  test("make sure addClickHandler is a public function", () => {
    expect(typeof kuiButton.addClickHandler).toBe("function");
  });
  test("make sure addClickHandler adds a click listener on the button", () => {
    const handler = jest.fn();
    const clickEvent = new MouseEvent("click");
    kuiButton.addClickHandler(handler);
    kuiButton.elements.button.dispatchEvent(clickEvent);
    expect(handler).toHaveBeenCalledTimes(1);
  });
  test("make sure removeClickHandler is a public function", () => {
    expect(typeof kuiButton.removeClickHandler).toBe("function");
  });
  test("make sure removeClickHandler removes the click listener from the button", () => {
    const handler = jest.fn();
    const clickEvent = new MouseEvent("click");
    kuiButton.addClickHandler(handler);
    kuiButton.removeClickHandler(handler);
    kuiButton.elements.button.dispatchEvent(clickEvent);
    expect(handler).toHaveBeenCalledTimes(0);
  });
});
