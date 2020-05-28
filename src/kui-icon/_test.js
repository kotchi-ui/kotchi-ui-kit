import { Window } from "happy-dom";
import KUIIcon from "../";

const window = new Window();
const document = window.document;
let kuiIcon;

beforeEach(() => {
  document.body.innerHTML = '<kui-icon id="my-kui-icon"></kui-icon>';
  kuiIcon = document.querySelector("#my-kui-icon");
});
describe("Make sure component is created", () => {
  test("’Make sure <kui-icon> is defined as a custom element with shadowRoot", () => {
    expect(kuiIcon).not.toBeNull();
    expect(kuiIcon.shadowRoot).not.toBeNull();
  });
  test("’Make sure <kui-icon> has the elements as an attribute with the button on it", () => {
    expect(kuiIcon.elements).not.toBeNull();
    expect(kuiIcon.elements.icon).not.toBeNull();
  });
  test("Make sure component attributes are also reflected on object properties", () => {
    expect("kuiLabel" in kuiIcon).toBe(true);
    expect("kuiIcon" in kuiIcon).toBe(true);
    expect("kuiSize" in kuiIcon).toBe(true);
    expect("kuiFixedWidth" in kuiIcon).toBe(true);
    expect("kuiBordered" in kuiIcon).toBe(true);
    expect("kuiPull" in kuiIcon).toBe(true);
    expect("kuiAnimate" in kuiIcon).toBe(true);
    expect("kuiRotate" in kuiIcon).toBe(true);
    expect("kuiFlip" in kuiIcon).toBe(true);
  });
});
describe("Testing <kui-icon> attributes", () => {
  describe.each([
    ["kui-label", "kuiLabel", "icon's label"],
    ["kui-icon", "kuiIcon", "fas fa-camera"],
    ["kui-size", "kuiSize", KUIIcon.Size.Large],
    ["kui-pull", "kuiPull", KUIIcon.PullDirection.Right],
    ["kui-animate", "kuiAnimate", KUIIcon.Animate.Pulse],
    ["kui-rotate", "kuiRotate", KUIIcon.Rotate.Rotate180],
    ["kui-flip", "kuiFlip", KUIIcon.Flip.FlipBoth],
  ])(
    "Testing the sync between attribute and property for %s",
    (attributeName, propertyName, value) => {
      test(`Updating ${propertyName} property updates the attribute with the same value`, () => {
        kuiIcon[propertyName] = value;
        expect(kuiIcon.getAttribute(attributeName)).toBe(value);
      });
      test(`Updating ${attributeName} attribute updates the property with the same value`, () => {
        kuiIcon.setAttribute(attributeName, value);
        expect(kuiIcon[propertyName]).toBe(value);
      });
    }
  );
  test("Updating the kui-icon attribute updates the inner icon element's class names", () => {
    const value = "fab fa-camera";
    kuiIcon.setAttribute("kui-icon", value);
    const classes = value.split(" ");
    expect(kuiIcon.elements.icon.classList.contains(classes[0])).toBe(true);
    expect(kuiIcon.elements.icon.classList.contains(classes[1])).toBe(true);
  });
  test("Updating the kui-icon attribute updates the inner icon element's class names", () => {
    const value = "fab fa-camera";
    kuiIcon.kuiIcon = value;
    const classes = value.split(" ");
    expect(kuiIcon.elements.icon.classList.contains(classes[0])).toBe(true);
    expect(kuiIcon.elements.icon.classList.contains(classes[1])).toBe(true);
  });
  test.each([
    ["kui-size", KUIIcon.Size.Large],
    ["kui-pull", KUIIcon.PullDirection.Right],
    ["kui-animate", KUIIcon.Animate.Pulse],
    ["kui-rotate", KUIIcon.Rotate.Rotate180],
    ["kui-flip", KUIIcon.Flip.FlipBoth],
  ])(
    "Updating the %s attribute updates the inner icon element's class names",
    (attributeName, value) => {
      kuiIcon.setAttribute(attributeName, value);
      expect(kuiIcon.elements.icon.className.indexOf(value)).not.toBe(-1);
    }
  );
  describe.each([
    ["kui-fixed-width", "kuiFixedWidth", KUIIcon.FixedWidth, true],
    ["kui-fixed-width", "kuiFixedWidth", KUIIcon.FixedWidth, false],
    ["kui-bordered", "kuiBordered", KUIIcon.Bordered, true],
    ["kui-bordered", "kuiBordered", KUIIcon.Bordered, false],
  ])(
    "Testing %s attribute",
    (attributeName, propertyName, className, value) => {
      test(`Set ${propertyName} property to ${value} -> ${
        value ? "adds" : "removes"
      } '${attributeName}' attribute to the <kui-icon> element`, () => {
        kuiIcon[propertyName] = value;
        expect(kuiIcon.hasAttribute(attributeName)).toBe(value);
      });
      test(`Set ${propertyName} property to ${value} -> ${
        value ? "adds" : "removes"
      } className '${className}' to inner icon element`, () => {
        kuiIcon[propertyName] = value;
        expect(kuiIcon.elements.icon.classList.contains(className)).toBe(value);
      });
      test(`Set ${attributeName} attribute to ${value} -> ${
        value ? "adds" : "removes"
      } className '${className}' to the inner icon element`, () => {
        if (value) {
          kuiIcon.setAttribute(attributeName, "");
        } else {
          kuiIcon.removeAttribute(attributeName);
        }
        expect(kuiIcon.elements.icon.classList.contains(className)).toBe(value);
      });
      test(`Set ${attributeName} attribute to ${value} -> ${
        value ? "adds" : "removes"
      } '${attributeName}' attribute from the <kui-icon> element`, () => {
        if (value) {
          kuiIcon.setAttribute(attributeName, "");
        } else {
          kuiIcon.removeAttribute(attributeName);
        }
        expect(kuiIcon.hasAttribute(attributeName)).toBe(value);
      });
    }
  );
  describe.each([
    ["kui-size", "kuiSize", "invalid"],
    ["kui-pull", "kuiPull", "invalid"],
    ["kui-animate", "kuiAnimate", "invalid"],
    ["kui-rotate", "kuiRotate", "invalid"],
    ["kui-flip", "kuiFlip", "invalid"],
  ])(
    "Testing invalid value handeling for %s",
    (attributeName, propertyName, invalidValue) => {
      test(`Tesing invalid value for ${attributeName} attribute`, () => {
        const oldValue = kuiIcon.getAttribute(attributeName);
        kuiIcon.setAttribute(attributeName, invalidValue);
        expect(kuiIcon.getAttribute(attributeName)).toBe(oldValue);
      });
      test(`Tesing invalid value for ${propertyName} property`, () => {
        const oldValue = kuiIcon[propertyName];
        kuiIcon[propertyName] = invalidValue;
        expect(kuiIcon[propertyName]).toBe(oldValue);
      });
    }
  );
});
