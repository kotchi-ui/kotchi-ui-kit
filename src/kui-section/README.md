# KUI Section

`kui-section` is a special form of the [Bootstrap card component], it has Header with optional actions, body and optional footer. it also has predefined styles that serves different semantic purposes.

For more information and examples, visit the [demo](https://ahmadigbaryia.github.io/kotchi-ui/section.html) pages.

[bootstrap card component]: https://getbootstrap.com/docs/4.0/components/card/

## Attributes

| name                   | type                  | default value          | description                                                                 |
| ---------------------- | --------------------- | ---------------------- | --------------------------------------------------------------------------- |
| `kui-header-title`     | String                | `null`                 | The section title                                                           |
| `kui-header-icon`      | String                | `null`                 | the section icon                                                            |
| `kui-Style`            | KUISectopn.Style      | KUISectopn.Style.Light | Predefined styles that serves different semantic purposes                   |
| `kui-collapse-by`      | KUISection.CollapseBy | `null`                 | Defines how the section can be collapsed                                    |
| `kui-allow-fullscreen` | Boolean               | `false`                | Should the section be expanded to fullscreen by showing a fullscreen action |
| `kui-closable`         | Boolean               | `false`                | Should the section be closable by showing the close action action           |
| `kui-collapsed`        | Boolean               | `false`                | Should the section be collapsed by default                                  |
| `kui-outline`          | Boolean               | `false`                | Should the section style be outlined                                        |

## Public API

| name       | parameters | return value | description                                          |
| ---------- | ---------- | ------------ | ---------------------------------------------------- |
| `collapse` |            |              | Collapse the section                                 |
| `expand`   |            |              | Expand the section                                   |
| `onClosed` | Handler    |              | Execute the given handler when the section is closed |

## Usage

in HTML

```html
<head>
	<!-- ... -->
	<!-- Polyfill for older browsers and those who don't support web components -->
	<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.0/webcomponents-loader.js"></script>
	<script src="https://unpkg.com/kotchi-ui/kotchi-section.js"></script>
</head>
<body>
	<!-- ... -->
	<kui-section
		kui-style="info"
		kui-collapse-by="header"
		kui-header-title="Section 3"
		kui-header-icon="fab fa-apple"
		kui-allow-full-screen
		kui-closable
	>
		<p>Section's body</p>
		<div slot="footer">Footer</div>
	</kui-section>
	<!-- ... -->
</body>
```

in Javascript

```js
import KUISection from "kotchi-ui/kui-section";

//...

const kuiSection = document.getElementById("my-kui-section-element");
kuiSection.kuiHeaderTitle = "My Section";
kuiSection.kuiAllowFullScreen = true;
```
