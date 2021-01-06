---
title: How to Open the Minicart Automatically in Magento
date: "2020-12-21"
---

In this article, I'll go over a step-by-step tutorial for how to make the minicart open automatically in Magento 2. If we're successful, then when the user clicks the add-to-cart button and the product is successfully added to their cart, the page should scroll back to the top (which is especially important on mobile) and the minicart should open automatically. This is often requested by clients in the hope that the user will be encouraged to proceed to checkout after having the minicart opened for them.

For this example, let's use a fake company called JojaCorporation with a base theme. So, your theme's directory will be located at `app/design/frontend/JojaCorporation/base`. I'll refer to this as the "theme directory" throughout this article for brevity's sake.

## Creating a jQuery Widget

As this task involves some opening and scrolling interaction with the UI, we know that we'll need to rely on JavaScript to implement this. Let's create a new JS file for this and, since its sole responsibility will be to interact with the minicart, we'll initialize it on the minicart.

From the theme directory, create a new file at `Magento_Checkout/web/js/minicart-auto-open.js` with the following contents:

```js
define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    $.widget('JojaCorporation.minicartAutoOpen', {
        _create: function () {
            if (this.element) {
                console.log('I\'m here to open the minicart!');
            }
        },
    });

    return $.JojaCorporation.minicartAutoOpen;
});
```

This is the basic scaffolding of a jQuery widget. It won't do anything except log "I'm here to open the minicart!" to the console once it's loaded.

## Initializing Our Widget

That said, nothing is loading the file, so you shouldn't see that in the console just yet. We need to initialize our widget. There are [two different ways](https://devdocs.magento.com/guides/v2.4/javascript-dev-guide/javascript/js_init.html) to initialize JS in Magento. You could add the `data-mage-init` attribute to the element, but in order to avoid editing the minicart's template file (so that we don't have to be concerned with that file when it comes time to upgrade Magento in the future), we'll be going with the alternative approach here.

Now, from the theme directory, create a new file at `Magento_Checkout/templates/cart/minicart-auto-open.phtml` with the following contents:

```phtml
<script type="text/x-magento-init">
    {
        "[data-block='minicart']": {
            "Magento_Checkout/js/minicart-auto-open": {}
        }
    }
</script>
```

Once on the page, this script element will our widget on an element that has `data-block="minicart"` on it (in other words, the minicart itself).

As an aside, you could add an alias for the JS file in `requirejs-config.js`, and in a large project that makes sense in order to keep your JS files organized. However, for the purposes of this example, we'll just reference the path to the file.

## Updating Your Layout

Now that you have the JS file itself as well as the thing that tells Magento to initialize that JS file (so long as it finds a minicart on the page), there is one more step before our widget will be logging to the console. We need to update the layout to add our template file to the page.

From the theme directory, create a new file at `Magento_Checkout/layout/default.xml` with the following contents:

```xml
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceContainer name="before.body.end">
            <block class="Magento\Framework\View\Element\Template" name="minicart.auto.open" template="Magento_Checkout::cart/minicart-auto-open.phtml"/>
        </referenceContainer>
    </body>
</page>
```

This bit of XML will add the template (containing our script tags) to the bottom of the page, just before the closing body tag. You can really get into the weeds when [updating Magento layouts](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/layouts/xml-instructions.html), but for this tutorial, this is all the XML we need.

## Adding the Functionality

At this point, after flushing the cache and refreshing the page, you should see our jQuery widget being loaded. Now, it's time to make it do more than just log to the console.

So, we know that there are two discrete pieces of functionality here: opening the minicart and scrolling to the top of the page. We also know that we'll need an event listener, as we only want those methods to fire after the user adds a product to their cart. Let's create a method for each individual piece of functionality:

```js
define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    $.widget('JojaCorporation.minicartAutoOpen', {
        _create: function () {
            if (this.element) {
                console.log('I\'m here to open the minicart!');
            }
        },

        _initEventListener: function () {

        },

        _open: function () {

        },

        _scroll: function () {

        },
    });

    return $.JojaCorporation.minicartAutoOpen;
});
```

### Scrolling

Let's start with scrolling to the top, as that's simple enough. You can use jQuery to do that like so:

```js
$.widget('JojaCorporation.minicartAutoOpen', {
    _scroll: function () {
        $('html, body').animate({scrollTop: 0});
    },
});
```

You could also choose to use vanilla JavaScript here (e.g., `window.scrollTo({top: 0, behavior: 'smooth'})`), but since we're already loading jQuery for the widget, why not? Whichever you prefer should work fine.

### Opening

Next, we'll add in behavior to open the minicart. By default, the minicart is a [dropdownDialog widget](https://devdocs.magento.com/guides/v2.4/javascript-dev-guide/widgets/widget_dialog.html) which contains some helpful methods for interacting with it. We can utilize the `open` method like so:

```js
$.widget('JojaCorporation.minicartAutoOpen', {
    _open: function () {
        $(this.element).find('[data-role="dropdownDialog"]').dropdownDialog('open');
    },
});
```

Essentially, our widget is interacting with another widget's methods here.

### Listening for Events

Finally, there won't be any scrolling or opening happening without an event listener or three. We'll need to start scrolling once the user has added the product to their cart, then we'll need to open the minicart after the items have successfully loaded in the cart.

```js
$.widget('JojaCorporation.minicartAutoOpen', {
    _initEventListener: function () {
        const self = this;

        $(document).on('ajax:addToCart', function () {
            self._scroll();
        });

        $(self.element).on('contentLoading', function () {
            $(self.element).on('contentUpdated', function () {
                self._open();
            });
        });
    },
});
```

Since we want our widget to be listening for events before anything else, let's not forget to call `_initEventListener()` once the widget is loaded:

```js
$.widget('JojaCorporation.minicartAutoOpen', {
    _create: function () {
        if (this.element) {
            this._initEventListener();
        }
    },
});
```

## Final Code

And that should do it! After the user adds a product to their cart, the page will scroll to the top and, once the content within the minicart has loaded, the minicart will automatically open for them. Here is the final code:

```js
define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    $.widget('JojaCorporation.minicartAutoOpen', {
        _create: function () {
            if (this.element) {
                this._initEventListener();
            }
        },

        _initEventListener: function () {
            const self = this;

            $(document).on('ajax:addToCart', function () {
                self._scroll();
            });

            $(self.element).on('contentLoading', function () {
                $(self.element).on('contentUpdated', function () {
                    self._open();
                });
            });
        },

        _open: function () {
            $(this.element).find('[data-role="dropdownDialog"]').dropdownDialog('open');
        },

        _scroll: function () {
            $('html, body').animate({scrollTop: 0});
        },
    });

    return $.JojaCorporation.minicartAutoOpen;
});
```
