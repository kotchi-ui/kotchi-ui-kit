# kui-button
`kui-button` is a button that has predefined styles and sizes to serve different semantic purposes with few extras.

For more information and examples, visit the [demo](https://ahmadigbaryia.github.io/kotchi-ui/button.html) pages.

## Attributes
name           | type            | default value             | description
-------------- | --------------- | ------------------------- | ----------------------------------------------------------
`kui-style`    | KUIButton.Style | KUIButton.Style.Secondary | Predefined styles that serves different semantic purposes
`kui-size`     | KUIButton.Size  |                           | Predefined sizes smaller or bigger than the default one
`kui-outline`  | Boolean         | false                     | Display the button in an outline style
`kui-disabled` | Boolean         | false                     | Sets the button in a disabled state

## Public API
name                  | parameters      | return value     | description
--------------------- | --------------- | ---------------- | -------------------------------------------------------------
`addClickHandler`     | Handler         | `undefined`      | Adds a click handler to the button handlers list
`removeClickHandler`  | Handler         | `undefined`      | Removes the given handler from the button handlers list


## Usage
in HTML
```html
<head>
    <!-- ... -->
    <!-- Polyfill for older browsers and those who don't support web components -->
	<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.0/webcomponents-loader.js"></script>
	<script src="https://unpkg.com/kotchi-ui/kotchi-button.js"></script>
</head>
<body>
<!-- ... -->
<kui-button kui-style="kui-button-primary" kui-outline> Primary outlined button </kui-button>
<kui-button kui-style="kui-button-success" kui-size="kui-button-large"> Success large button </kui-button>
<kui-button kui-disabled> Secondary disabled button </kui-button>
<!-- ... -->
</body>
```

in Javascript
```js
import KUIButton from "kotchi-ui/kui-button";

//...

const kuiButton = document.getElementById('my-kui-button-element');
kuiButton.kuiSize = KUIButton.Size.Small;
kuiButton.addClickHandler((e) => alert("Hello Kotchi"));
```