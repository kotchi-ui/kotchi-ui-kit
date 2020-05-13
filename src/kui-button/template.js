import style from "./style.scss";

export default function templateGenerator(tagName) {
	const template = document.createElement("template");
	template.innerHTML = `
        <style>
            ${style}
        </style>
        <button class="kui-button">
            <slot></slot>
        </button>
    `;

	window.ShadyCSS && window.ShadyCSS.prepareTemplate(template, tagName);

	return {
		template,
		selectors: {
			button: "button.kui-button",
			buttonContents: "button.kui-button > slot",
		},
	};
}
