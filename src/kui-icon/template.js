import style from "./style.css";

export default function templateGenerator(tagName) {
	const template = document.createElement("template");
	template.innerHTML = `
		<style>${style}</style>
		<i class=""></i>
	`;

	window.ShadyCSS && window.ShadyCSS.prepareTemplate(template, tagName);

	return {
		template,
		selectors: {
			icon: "i",
			screenReader: "span.sr-only",
		},
	};
}

export function screanReaderCreator() {
	const screenReaderSpan = document.createElement("span");
	screenReaderSpan.className = "sr-only";
	return screenReaderSpan;
}
