---
title: Quick Performance Wins
date: "2020-08-30"
---

We all know from browsing on our phones how important page speed is to a website. While there are some things that you don't have a lot of control over as a front end developer (e.g., server speed, caching, marketing requirements for tracking scripts), there is a lot that we can do to make sure that the front end is as optimized for performance as it can be.

## Image Optimization

Images are some of the most resource-heavy assets that the browser has to load. It's important to ensure that your images are compressed and resized before uploading them.

First, make sure that your images are in the right format. In general, if it's an icon or contains transparency, it can be a PNG; otherwise, it's a JPG. Once you have your images in the proper format, you should compress them to further reduce their file size. Most image manipulation software will allow you to do this, but I like to use a tool like [Squoosh](https://squoosh.app/). You can adjust the quality of the compressed image as needed.

Make sure that your image is not larger than it needs to be. If you're extracting it out of a design, there's a good chance that the extracted image's dimensions are much larger than the image appears on the webpage. One exception to this is if you are supporting higher-quality images for retina devices, then your images may need to be twice the size as they appear on the screen. If that's the case, you can still optimize for performance by [using the `srcset` attribute](/images).

Finally, one more thing to consider is to implement lazyloading for some images on your site. This is something to be careful with, as I've found it can interfere with some JS plugins, but it can be very powerful on image-heavy pages. The `loading="lazy"` attribute has decent browser support, or you may consider another solution like [lazysizes](https://github.com/aFarkas/lazysizes).

### SVG Icons

If possible, it's usually preferable to use SVGs for icons rather than PNGs or another format. Not only are they smaller in file size, but you can also use CSS to change the display of them. When extracting them out of designs, they often come with some bloat, so I like to use [SVGOMG](https://jakearchibald.github.io/svgomg/) to clean up the code.

## Web Fonts

When loading in fonts from somewhere like [Google Fonts](https://fonts.google.com/), check to ensure that you're only loading the font weights and character sets needed. This is comparatively minor compared to image optimization, but web fonts are often loaded very early on in the process, as the site design can heavily depend on typography.

## Minification and Concatenation

Depending on your build process and how you organize your CSS and JS, you may consider concatenating and minifying those files for production. Many developers split their directories into `src` and `dist`, and they make changes to the files in `src` which then get compiled and copied over to `dist` for production. There are many different tools, like [gulp.js](https://gulpjs.com/) and [webpack](https://webpack.js.org/) that will do this automatically for you as well as watch your files for changes, as long as you are able to set them up and incorporate them into your build process.
