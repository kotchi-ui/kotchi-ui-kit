# kui-icon
`kui-icon` wraps Font Awesome free plan icons, [Solid](https://fontawesome.com/icons?d=gallery&s=solid&m=free) and [Brands](https://fontawesome.com/icons?s=brands&m=free), it'll enable you to configure the icon in a declarative way instead of using class names.

For more information and examples, visit the [demo](https://ahmadigbaryia.github.io/kotchi-ui/icon.html) pages.

## Attributes
name              | type            | default value             | description
--------------    | --------------- | ------------------------- | ----------------------------------------------------------
`kui-label`       | String          |                           | The icon's label - used for screen readers
`kui-icon`        | String          |                           | The icon to be used from the available [set of icons][1]
`kui-Size`        | KUIIcon.Size    |                           | The size of the icon, relative to the inherited `font-size` style value, [more information][2]
`kui-pull`        | KUIIcon.PullDirection |                     | Pull quotes or article icons, [more information][3]
`kui-animate`     | KUIIcon.Animate |                           | Makes the icon spin or have it rotate with 8 steps, [more information][4]
`kui-rotate`      | KUIIcon.Rotate  |                           | Rotates the Icon with the given angel, [more information][5]
`kui-flip`        | KUIIcon.Flip    |                           | Flips the Icon with the desired direction, [more information][5]
`kui-fixed-width` | Boolean         | false                     | Apply the fixed width style on the icon, [more information][6]
`kui-bordered`    | Boolean         | false                     | Adds a border arround the icon, [more information][3]

[1]: https://fontawesome.com/icons?d=gallery
[2]: https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons
[3]: https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons
[4]: https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons
[5]: https://fontawesome.com/how-to-use/on-the-web/styling/rotating-icons
[6]: https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons

## Public API
None 

## Usage
in HTML
```html
<head>
    <!-- ... -->
    <!-- Polyfill for older browsers and those who don't support web components -->
	<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.0/webcomponents-loader.js"></script>
	<script src="https://unpkg.com/kotchi-ui/kotchi-icon.js"></script>
</head>
<body>
<!-- ... -->
<kui-icon kui-icon="fas fa-camera" kui-size="fa-3x" kui-label="Take a picture"></kui-icon>
<kui-icon kui-icon="fab fa-android" kui-size="fa-3x" kui-label="I use Android"></kui-icon>
<kui-icon kui-icon="fab fa-apple" kui-size="fa-3x" kui-label="And I prefare Apple products"></kui-icon>
<!-- ... -->
</body>
```

in Javascript
```js
import KUIcon from "kotchi-ui/kui-icon";

//...

const kuiIcon = document.getElementById('my-kui-icon-element');
kuiIcon.kuiIcon = "fab fa-apple";
kuiIcon.kuiSize = KUIIcon.Size.x6;
kuiIcon.kuiAnimate = KUIIcon.Animate.Spin;
```
