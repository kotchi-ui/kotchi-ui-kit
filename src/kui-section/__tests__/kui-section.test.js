/**
 * There is a bug in the happy-dom that returns null when trying to get the slot
 */

import { Window } from "happy-dom";
import "../kui-section";

const window = new Window();
const document = window.document;
let kuiSection;

beforeEach(() => {
	document.body.innerHTML = "<kui-section id='my-kui-section'></kui-section>";
	kuiSection = document.querySelector("#my-kui-section");
});
describe("Make sure component is created", () => {
	test("’Make sure <kui-section> is defined as a custom element with shadowRoot", () => {
		expect(kuiSection).not.toBeNull();
		expect(kuiSection.shadowRoot).not.toBeNull();
	});
	test("’Make sure <kui-section> has the elements defined", () => {
		expect(kuiSection.elements).not.toBeNull();
		expect(kuiSection.elements.section).not.toBeNull();
	});
	test("Make sure component attributes are also reflected on object properties", () => {
		expect("kuiHeaderTitle" in kuiSection).toBe(true);
		expect("kuiHeaderIcon" in kuiSection).toBe(true);
		expect("kuiStyle" in kuiSection).toBe(true);
		expect("kuiOutline" in kuiSection).toBe(true);
		expect("kuiCollapsedBy" in kuiSection).toBe(true);
		expect("kuiCollapsed" in kuiSection).toBe(true);
		expect("kuiClosable" in kuiSection).toBe(true);
		expect("kuiAllowFullscreen" in kuiSection).toBe(true);
	});
});
