---
title: Building a Carousel in Magento
date: "2020-10-02"
---

In this article, I'll show you how to make a carousel intended to be used on CMS pages in Magento 2. This is a very common UI pattern to reach for when you have a lot of content to show off but only so much space on the page. By default, Magento comes with [Slick](https://kenwheeler.github.io/slick/), so we'll be using it to create our carousel.

## The HTML

You have a lot of flexibility here, as carousels come in all shapes and sizes. For ours, let's just have each slide be an image with a caption underneath. Something like this:

```html
<div class="carousel">
    <figure class="carousel-slide">
        <img src="https://via.placeholder.com/400x400" alt="">
        <figcaption>Lorem ipsum dolor sit amet</figcaption>
    </figure>
    <figure class="carousel-slide">
        <img src="https://via.placeholder.com/400x400" alt="">
        <figcaption>Lorem ipsum dolor sit amet</figcaption>
    </figure>
    <figure class="carousel-slide">
        <img src="https://via.placeholder.com/400x400" alt="">
        <figcaption>Lorem ipsum dolor sit amet</figcaption>
    </figure>
</div>
```

## The JavaScript

Next, we'll create a jQuery widget to add the carousel functionality to our HTML:

```js
define([
    'jquery',
    'slick',
    'domReady!'
], function ($) {
    'use strict';

    $.widget('YourCompany.carousel', {
        _create: function () {
            if (this.element) {
                // do something
            }
        },
    });

    return $.YourCompany.carousel;
});
```

This file should be added under `app/design/frontend/YourCompany/base/web/js/carousel.js`. It's important to note that we added Slick as a dependency at the top of the file to ensure that Slick loads before our widget loads.

At the moment, the file won't do anything when it runs, so let's add some functionality to it. All we need to do is initialize the carousel, and we'll let Slick handle the rest.

```js
define([
    'jquery',
    'slick',
    'domReady!'
], function ($) {
    'use strict';

    $.widget('YourCompany.carousel', {
        _create: function () {
            if (this.element) {
                this._initSlick();
            }
        },

        _initSlick: function () {
            $(this.element).slick();
        },
    });

    return $.YourCompany.carousel;
});
```

That'll initialize Slick with all the default settings. The last thing we need to do in order to transform our captioned images into a carousel of captioned images is to initialize the widget on the HTML. We can do that by adding `data-mage-init='{"js/carousel": {}}'` to `<div class="carousel">`.

### Customizing the Carousel per Page

Let's say we want the slider to autoplay on some pages, whereas on others we just want to stick with the default behavior of not autoplaying. Ideally, we'd like to be able to configure this setting on each block of HTML, like this:

```html
<div class="carousel" data-mage-init='{"js/carousel": {"autoplay": true}}'>
    ...
</div>

<div class="carousel" data-mage-init='{"js/carousel": {"autoplay": false}}'>
    ...
</div>
```

We'll then need to reference that option in the widget and pass it along to Slick:

```js
$.widget('YourCompany.carousel', {
    options: {
        autoplay: false,
    },

    _initSlick: function () {
        $(this.element).slick({
            autoplay: this.options.autoplay,
        });
    },
});
```

By default, autoplay is set to false, but it can be set to true on an as-needed basis by passing along that option in the HTML.

## Perceived Performance

Our carousel is looking pretty good for a basic example! One final tip is to take note of how the carousel looks in the split second before Slick initializes. Most likely, each slide will be stacked on top of each other due to their being block elements. So, they're all stacked on top of each other, then condense into a slider, which can look a little jarring as the site is loading.

You can add some CSS to mitigate this effect by either only showing the first slide or by keeping each slide side-by-side. It won't affect the actual page speed, but it'll make the page seem a little more snappy as everything is loading. It's going to depend heavily on what your carousel actually looks like, but the CSS will be something like this:

```less
.carousel:not(.slick-initialized) {
    display: flex;
    overflow: hidden;

    .carousel-slide {
        flex: 1 0 100%;
    }
}
```
