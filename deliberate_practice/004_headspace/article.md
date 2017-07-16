# Deliberate Practice: What I learned from reading headspace

## What is headspace?

From its [README.md](https://github.com/gdub22/headspace), headspace is a library that provides a UX friendly header.

Play around with the [demo](https://rawgit.com/gdub22/headspace/master/demo.html) that is provided. Scroll up and down the page. Do you notice anything about the header?

Traditionally, headers are fixed to the top of the screen. A fixed header is good because it usually contains information that a user wants immediately, such as navigation. One thing that isn't good about this is that it takes up real estate on the screen. This is especially noticeable on smaller screen sizes, like mobile devices.

headspace provides a solution to this. In the [demo](https://rawgit.com/gdub22/headspace/master/demo.html), scroll down on the page. Notice how the header scrolls out of view. It is no longer taking up precious real estate on the screen.

But now, what if the user wants to access some piece of navigation on the header. You would normally have to scroll all the way to the top of the screen. This might not be a good experience for users that have scrolled down a lot. But with headspace, when a user scrolls up alittle, BAM, the header comes back into view to greet them.

In my opinion, this provides a great solution. The header doesn't take up unnecessary room on the webpage, but is easily accessible.

The headspace [README](https://github.com/gdub22/headspace) lists medium.com and romper.com as websites that have a header with similar behavior. As of the time of this writing, these websites don't employ a header like this anymore (although Medium does do something similar with its footer). I wonder if they did some A/B tests and found it wasn't working well. I still feel like it's a clean solution. Let me know what you think!

## How to use headspace
I found using headspace was simple enough. Here is how I used it in a simple React component.

// React component
https://gist.github.com/newyork-anthonyng/2ed9e40401e5d9a7fe69a74773d2b861

headspace takes two arguments. The first one is the actual DOM element of your header. With react, I can grab that using a [ref](https://facebook.github.io/react/docs/refs-and-the-dom.html).

The second argument you can pass in is an options object. Some things you can customize is how quickly a user has to scroll for the header to appear/disappear (tolerance) and if the header should show when they reach the very bottom of the HTML document (showAtBottom). See the [README](https://github.com/newyork-anthonyng/headspace/tree/docco) for more options.

Notice how I also import a CSS file. This is what it looks like.

// CSS file
https://gist.github.com/newyork-anthonyng/5880eb298defa4013c8716ba0ea9a767

This CSS file is needed to actually show and hide the header. headspace is a simple library. All it does it add a class name (which you can customize) when the header should be in view, and add a class name when the header should be hidden. These class names are what you will use to customize the appearance and animation of your header.

## Things I learned '
### requestAnimationFrame
https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
https://www.html5rocks.com/en/tutorials/speed/animations/
https://css-tricks.com/using-requestanimationframe/
Check out these great resources about requestAnimationFrame. It is a method that tells the browser that you want to paint something on your browser (such as an animation), and to run a callback function (probably to do some calculations for your animation) before its next repaint.

requestAnimationFrame allows browsers to optimize your animations, providing a smoother user experience. It also stops animations from inactive tabs so you don't waste CPU resources, and it's more battery friendly.

I like to think of it as a [debounce/throttle](https://css-tricks.com/the-difference-between-throttling-and-debouncing/) for your animation functions.

### Working with the DOM
My main tool of choice has been React, and I've been living in its abstractions that it's provided me. Looking at some of the DOM api's that headspace used brought back some memories. Things such as `pageYOffset` and `offsetHeight`. There are a lot of students in bootcamps that get thrown straight into learning frontend libraries like React. But I think a fundamental understanding of what React is doing underneath is very important to your career.

* Take a look at my annotated headspace code.
