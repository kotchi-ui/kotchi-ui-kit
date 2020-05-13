import style from "./style.scss";

export default function templateGenerator(tagName) {
	const template = document.createElement("template");
	template.innerHTML = `
        <style>
            ${style}
        </style>
        <div class="card">
            <div class="card-header">
                <div class="card-header__title-and-icon-container" data-toggle="collapse" data-target="#contents-container">
                    <kui-icon class="card-header__icon"></kui-icon>
                    <span class="card-header__title"></span>
                </div>
                <div class="card-header__actions">
                    <a class="card-header__action">
                        <kui-icon id="collapseAction" kui-icon="fas fa-chevron-down"></kui-icon>
                    </a>
                    <a class="card-header__action">
                        <kui-icon id="fullScreenAction" kui-icon="fas fa-expand-alt"></kui-icon>
                    </a>
                    <a class="card-header__action">
                        <kui-icon id="closeAction" kui-icon="fas fa-times"></kui-icon>
                    </a>
                </div>
            </div>
            <div id="contents-container">
                <div class="card-body"><slot id="contentsSlot"></slot></div>
                <div class="card-footer d-none"><slot id="footerSlot" name="footer"></slot></div>
            </div>
        </div>
    `;

	window.ShadyCSS && window.ShadyCSS.prepareTemplate(template, tagName);

	return {
		template,
		selectors: {
			section: ".card",
			header: ".card-header",
			headerIcon: ".card-header__icon",
			headerTitle: ".card-header__title",
			headerActions: ".card-header__actions",
			collapseAction: "#collapseAction",
			fullScreenAction: "#fullScreenAction",
			closeAction: "#closeAction",
			contentsContainer: "#contents-container",
			contents: "#contentsSlot",
			footer: "#footerSlot",
		},
	};
}
