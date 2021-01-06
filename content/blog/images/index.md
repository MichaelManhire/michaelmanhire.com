---
title: Better Images
date: "2020-08-11"
---

Images have come a long way. Here is a snippet utilizing some of the more modern techniques of image optimization in HTML:

```html
<picture>
    <source srcset="/images/something.webp, /images/something@2x.webp 2x" type="image/webp">
    <source srcset="/images/something.jpg, /images/something@2x.jpg 2x" type="image/jpeg">
    <img alt="" width="800" height="600" loading="lazy">
</picture>
```

This does a few different things:

- The `srcset` attribute will load the retina-ready image if the device supports it. You can go deeper with this and include other variants, like 3x, if needed.
- The `type` attribute will load the WebP image if the browser supports it. These images are more efficiently compressed than JPG or PNG, and so they have a smaller file size. I think there are some other formats, like AVIF, out there now.
- The `loading` attribute will load in the image as the user scrolls down to see it. It's only supported in some browsers as of now (and some have reservations about its implementation), but I think it's worth it. An alternative would be to use something like [lazysizes](https://github.com/aFarkas/lazysizes).

If you need to support older browsers, you'll need to include a fallback `src` attribute and look into something like [Picturefill](http://scottjehl.github.io/picturefill/) to get this working.
