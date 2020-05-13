import { Window } from "happy-dom";
import "../";

const window = new Window();
const document = window.document;
let kuiAccordion;

beforeEach(() => {
	document.body.innerHTML = "<kui-accordion id='my-kui-accordion'></kui-accordion>";
	kuiAccordion = document.querySelector("#my-kui-accordion");
});
describe("Make sure component is created", () => {
	test("’Make sure <kui-section> is defined as a custom element with shadowRoot", () => {
		expect(kuiAccordion).not.toBeNull();
		expect(kuiAccordion.shadowRoot).not.toBeNull();
	});
	test("’Make sure <kui-section> has the elements defined", () => {
		expect(kuiAccordion.elements).not.toBeNull();
		expect(kuiAccordion.elements.contentsContainer).not.toBeNull();
	});
	test("Make sure component attributes are also reflected on object properties", () => {
		expect("kuiExpandedChildIndex" in kuiAccordion).toBe(true);
		expect("kuiAutoCollapse" in kuiAccordion).toBe(true);
	});
});
