# kui-accordion
`kui-accordion` provide an accordion layout for a group of sections.

For more information and examples, visit the [demo](https://ahmadigbaryia.github.io/kotchi-ui/accordion.html) pages.

## Attributes
name                | type            | default value             | description
------------------- | --------------- | ------------------------- | ----------------------------------------
`kui-expanded-index`| Number          | 0                         | The section that will be initialy expaned
`kui-auto-collapse` | Boolean         | false                     | Should keep only one section visible at a time

## Usage
in HTML
```html
<head>
    <!-- ... -->
    <!-- Polyfill for older browsers and those who don't support web components -->
	<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.0/webcomponents-loader.js"></script>
	<script src="https://unpkg.com/@kotchi-ui/ui-kit/kui-accordion.js"></script>
</head>
<body>
<!-- ... -->
<kui-accordion>
    <kui-section kui-header-title="Section 1">section 1 contents</kui-section>
    <kui-section kui-header-title="Section 2">section 2 contents</kui-section>
</kui-accordion>
<!-- ... -->
</body>
```

in Javascript
```js
import "@kotchi-ui/ui-kit/kui-section";

//...

const kuiAccordion = document.getElementById('my-kui-accordion');
kuiAccordion.kuiAutoCollapse = true;
```
