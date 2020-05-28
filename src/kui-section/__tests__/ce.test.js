import { Window } from "happy-dom";

class MyElem extends HTMLElement {
  attributeChangedCallback(attribute, oldValue, newValue) {}
  static get observedAttributes() {
    return ["my-attr"];
  }
}

const window = new Window();
const document = window.document;
let myElem;

window.customElements.define("my-elem", MyElem);

beforeEach(() => {
  document.body.innerHTML = "<my-elem id='my-elem'></my-elem>";
  myElem = document.querySelector("#my-elem");
});

describe("Make sure component is created", () => {
  test("’Make sure <my-elem> is defined", () => {
    expect(myElem).not.toBeNull();
  });
  test("’Make sure changing an observed attribute will triiger change callback", () => {
    const spy = jest.spyOn(myElem, "attributeChangedCallback");
    myElem.setAttribute("my-attr", "css-class");
    expect(spy).toHaveBeenCalled();
  });
  test("’Make sure changing non observed attribute will not triiger change callback", () => {
    const spy = jest.spyOn(myElem, "attributeChangedCallback");
    myElem.setAttribute("class", "css-class");
    expect(spy).not.toHaveBeenCalled();
  });
  test("’Make sure changing non observed attribute will not triiger change callback", () => {
    const spy = jest.spyOn(myElem, "attributeChangedCallback");
    myElem.setAttribute("style", "display: block;");
    expect(spy).not.toHaveBeenCalled();
  });
  test("’Make sure changing non observed attribute will not triiger change callback", () => {
    const spy = jest.spyOn(myElem, "attributeChangedCallback");
    myElem.setAttribute("id", "other-id");
    expect(spy).not.toHaveBeenCalled();
  });
});
