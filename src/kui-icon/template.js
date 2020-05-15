export default function templateGenerator(tagName) {
  const template = document.createElement("template");
  template.innerHTML = `
        <link href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css" media="all" rel="stylesheet">
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
