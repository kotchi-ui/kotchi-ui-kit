import {
	kuiCustomElement,
	kuiAttribute,
	kuiAttributeValidator,
	kuiChangeHandler,
	kuiStyleChangeHandler,
	Types,
	typeValidator,
	CustomElementUtils,
} from "kotchi-core";
import templateGenerator, { screanReaderCreator } from "./template";

const tagName = "kui-icon";

const { booleanSetter, booleanGetter, useShadowDom } = CustomElementUtils;

const faVersion = "5.13.0";

const Animate = {
	Spin: "fa-spin",
	Pulse: "fa-pulse",
};
const Flip = {
	FlipVer: "fa-flip-vertical",
	FlipHor: "fa-flip-horizontal",
	FlipBoth: "fa-flip-both",
};
const PullDirection = {
	Left: "fa-pull-left",
	Right: "fa-pull-right",
};
const Rotate = {
	Rotate90: "fa-rotate-90",
	Rotate180: "fa-rotate-180",
	Rotate270: "fa-rotate-270",
	Rotate360: "fa-rotate-360",
};
const Size = {
	XSmall: "fa-xs",
	Small: "fa-sm",
	Large: "fa-lg",
	X2: "fa-2x",
	X3: "fa-3x",
	X4: "fa-4x",
	X5: "fa-5x",
	X6: "fa-6x",
	X7: "fa-7x",
	X8: "fa-8x",
	X9: "fa-9x",
	X10: "fa-10x",
};
const FixedWidth = "fa-fw";
const Bordered = "fa-border";

/**
 * FontAwesome Icon element
 */
@kuiCustomElement({ tagName })
class KUIIcon extends HTMLElement {
	@kuiAttributeValidator([typeValidator(Types.String)])
	@kuiAttribute
	kuiLabel;

	@kuiAttributeValidator([typeValidator(Types.String)])
	@kuiAttribute
	kuiIcon;

	@kuiAttributeValidator([typeValidator(Size)])
	@kuiAttribute
	kuiSize;

	@kuiAttributeValidator([typeValidator(Types.Boolean)])
	@kuiAttribute({ setter: booleanSetter, getter: booleanGetter })
	kuiFixedWidth = false;

	@kuiAttributeValidator([typeValidator(Types.Boolean)])
	@kuiAttribute({ setter: booleanSetter, getter: booleanGetter })
	kuiBordered = false;

	@kuiAttributeValidator([typeValidator(PullDirection)])
	@kuiAttribute
	kuiPull;

	@kuiAttributeValidator([typeValidator(Animate)])
	@kuiAttribute
	kuiAnimate;

	@kuiAttributeValidator([typeValidator(Rotate)])
	@kuiAttribute
	kuiRotate;

	@kuiAttributeValidator([typeValidator(Flip)])
	@kuiAttribute
	kuiFlip;

	constructor() {
		super();
		const { template, selectors } = templateGenerator.call(this, tagName);
		useShadowDom({ host: this, template });
		this.elements = {
			icon: this.shadowRoot.querySelector(selectors.icon),
			screenReader: this.shadowRoot.querySelector(selectors.screenReader),
		};
	}

	connectedCallback() {
		/**
		 * This trick is needed to support the CSS font face in the shadow dom
		 * the font needs to be defined in the base HTML page
		 */
		const styleId = "font-awesome-ff";
		if (!document.head.querySelector(`style[id="${styleId}"]`)) {
			const fontAwesomeCDN = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/${faVersion}/webfonts`;
			const fontFaceCss = document.createTextNode(`
			@font-face {
				font-family: "Font Awesome 5 Free";
				font-style: normal;
				font-weight: 900;
				font-display: auto;
				src: url("${fontAwesomeCDN}/fa-solid-900.eot");
				src: url("${fontAwesomeCDN}/fa-solid-900.eot?#iefix") format("embedded-opentype"),
					url("${fontAwesomeCDN}/fa-solid-900.woff2") format("woff2"),
					url("${fontAwesomeCDN}/fa-solid-900.woff") format("woff"),
					url("${fontAwesomeCDN}/fa-solid-900.ttf") format("truetype"),
					url("${fontAwesomeCDN}/fa-solid-900.svg#fontawesome") format("svg");
			}
			@font-face {
				font-family: "Font Awesome 5 Brands";
				font-style: normal;
				font-weight: 900;
				font-display: auto;
				src: url("${fontAwesomeCDN}/fa-brands-400.eot");
				src: url("${fontAwesomeCDN}/fa-brands-400.eot?#iefix") format("embedded-opentype"),
					url("${fontAwesomeCDN}/fa-brands-400.woff2") format("woff2"),
					url("${fontAwesomeCDN}/fa-brands-400.woff") format("woff"),
					url("${fontAwesomeCDN}/fa-brands-400.ttf") format("truetype"),
					url("${fontAwesomeCDN}/fa-brands-400.svg#fontawesome") format("svg");
			}
		`);
			const faStyleElement = document.createElement("style");
			faStyleElement.setAttribute("type", "text/css");
			faStyleElement.setAttribute("id", styleId);
			faStyleElement.appendChild(fontFaceCss);
			document.head.appendChild(faStyleElement);
		}
	}

	@kuiChangeHandler
	kuiLabelChangeHandler({ newValue }) {
		if (this.elements.screenReader === null) {
			this.elements.screenReader = screanReaderCreator();
			this.shadowRoot.appendChild(this.elements.screenReader);
		}
		this.elements.screenReader.innerText = newValue;
	}

	@kuiStyleChangeHandler("icon")
	kuiIconChangeHandler() {}

	@kuiStyleChangeHandler("icon")
	kuiSizeChangeHandler() {}

	@kuiStyleChangeHandler("icon")
	kuiPullChangeHandler() {}

	@kuiStyleChangeHandler("icon")
	kuiAnimateChangeHandler() {}

	@kuiStyleChangeHandler("icon")
	kuiRotateChangeHandler() {}

	@kuiStyleChangeHandler("icon")
	kuiFlipChangeHandler() {}

	@kuiStyleChangeHandler({ element: "icon", className: FixedWidth })
	kuiFixedWidthChangeHandler() {}

	@kuiStyleChangeHandler({ element: "icon", className: Bordered })
	kuiBorderedChangeHandler() {}

	getTagName() {
		return tagName;
	}

	static get PullDirection() {
		return PullDirection;
	}
	static get Rotate() {
		return Rotate;
	}
	static get Flip() {
		return Flip;
	}
	static get Animate() {
		return Animate;
	}
	static get Size() {
		return Size;
	}
	static get FixedWidth() {
		return FixedWidth;
	}
	static get Bordered() {
		return Bordered;
	}
}

export default KUIIcon;
