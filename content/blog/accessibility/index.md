---
title: Quick Accessibility Wins
date: "2020-11-15"
---

Many of the most common accessibility issues can be solved relatively quickly, especially if they're taken care of as you're building your website. When accessibility is treated as an afterthought, it can be an arduous process to refactor several different areas of the site to make your site compliant, so it's important to have an eye for detail and fix these issues as you encounter them. In this article, I'll go over a few quick wins and low-hanging fruit that'll help make your next website more accessible.

## Hiding Content Visually

So much of accessibility comes down to making sure that screenreaders and other devices know what it is they're interacting with. You'll often need to include additional context on the page that doesn't necessarily need to be seen by sighted users. But if you hide elements with the familiar `display: none;`, screenreaders won't pick up that element. Sometimes that's what you want, but in cases where you only want the screenreader to "see" something, you'll need some additional CSS. Personally, I like the `sr-only` class in the [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate). But if you're working with a framework, it's probably best to stick to whatever they have for it. It may be called something else, like `visually-hidden`. If you need to roll your own class, below is the code for HTML5 Boilerplate's `sr-only`:

```css
.sr-only {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}
```
### It Goes Both Ways

On the other hand, if you need to hide something from the screenreader yet show it to sighted users, you can add the `aria-hidden="true"` attribute to the element. Icons, when accompanied by text, are a good example of this. They're of no use to the screenreader as long as the screenreader has access to the text.

## Providing Context for UI Interactions

As mentioned above, it's very important to provide supplementary context when you're coding accessibly. One common UI pattern is to link images and icons to other areas of your site. To a sighted user, this pattern is often intuitive enough that additional text or other context is not necessary; however, a screenreader only gets an image's alt text. This is typically not helpful, as the alt text is intended to describe the image, not where the link goes to. Instead, this is a perfect use case for our visually hidden CSS helper class:

```html
<a href="/products">
    <img src="/images/product-line.jpg" alt="Several different clothing products displayed next to each other" />
    <span class="sr-only">View Products</span>
</a>
```

### Form Labels

Forms are often designed without labels, using the `placeholder` attribute instead, for a variety of aesthetic reasons. This is all fine and well (though [some may disagree](https://www.smashingmagazine.com/2018/06/placeholder-attribute/)) for sighted users, but screenreaders rely on form labels to provide information about each field to their users. When building out forms, it's easy enough to include the label with each field and slap that visually hidden styling on each label, if the design calls for it:

```html
<label for="username">Username</label>
<input id="username" type="text" placeholder="Username">
```

It's important to note that you should always include the `for` attribute on the label, otherwise it's of hardly any use to the screenreader.

### Other Contexts

I'm not going to get into every single circumstance here, but here are some other areas you should look out for when building accessibly:

- Tables and captions
- Fieldsets with legends for groups of radio buttons and checkboxes
- Figures and figcaptions

## Semantic HTML

Choosing the right element is another important part of making your website more accessible. Also, it's a lot more fun and makes things feel more organized and tidy. Below are some examples:

### Navigation

You can use the `<nav>` element for blocks of navigation. Often, your navigation will be in the header or footer (or both!), so this is an opportunity to use the `<header>` and `<footer>` elements as well.

If you have multiple different navigation blocks, you can differentiate them by using the `aria-label` attribute. A good example of this is pagination, where your opening tag might look something like: `<nav aria-label="Pagination">`.

### Links Versus Buttons

Links take the user to other pages or to a different section of the same page, whereas buttons trigger some sort of interactivity. Sometimes a link looks like a button in the design (and vice versa), but its functionality should dictate which element it will be.

An example of this is a large call-to-action button that takes you to another page. Though it looks like a button, it should be a link. On the other hand, sometimes you may have a UI element that performs some function on the page, yet it looks like a link. Maybe it's intended functionality is to delete a piece of content, and it's styled to look like a link and be rather small so that it's less emphasized on the page. Though it looks like a link, it should be a button.

## Images

Images should have alt text that describe what is in the image. If the image is purely presentational and wouldn't be of much value to a screenreader, then you can generally [get away with an empty string](https://www.w3.org/WAI/tutorials/images/decorative/), but you've got to at least have `alt=""`.
