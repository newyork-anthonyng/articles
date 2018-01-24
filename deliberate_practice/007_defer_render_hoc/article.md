# Introduction
This is another article for my Deliberate Practice. Why am I doing this? Read this article to learn more (https://medium.freecodecamp.org/deliberate-practice-becoming-an-open-sourcerer-27a4f7640940).

# Include article from Twitter
https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3
I was reading through this article about how Twitter Lite (a React PWA) removed performance bottlenecks.

// Todo Include image Twitter situation (https://cdn-images-1.medium.com/max/2000/1*mDPjaeBNhCAbEcbKV-IX3Q.gif)
Reference the original medium article.

When the user taps the `Home` button, there is a delay until the tweets are shown.
This delay was caused by a large number of components mounting and unmounting.
`defer-render-hoc` is an Open Source project that implements the solution given in the article.

# Examine the code
`defer-render-hoc` is a Higher Order Component (HOC). To learn more about it, read the documentation here (https://reactjs.org/docs/higher-order-components.html).
We use `defer-render-hoc`  by wrapping your Expensive component with it.

```jsx
https://gist.github.com/newyork-anthonyng/5b3dd683ee06a455e649864c1bf398a6
```

`defer-render-hoc` renders `null` on the initial render.

```jsx
https://gist.github.com/newyork-anthonyng/f48a4464fea791a9b78aac2221bec7e7
```

So when will `defer-render-hoc` render your Expensive Component? It uses `requestAnimationFrame` to wait two frames. After two frames have passed, it will render your Expensive Component.

```jsx use diff
https://gist.github.com/newyork-anthonyng/a692beda92f374811ef1f0e8b1c27f1b
```

`requestAnimationFrame` is usually used to create smooth animations (read more about it in this article). (https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution).
Here, we are using `requestAnimationFrame` to allow other components to update and give control back to the user. After the two frames, our Expensive Component takes over.

# Demo
Check out this CodeSandbox for a demo of `defer-render-hoc`.(https://codesandbox.io/s/pjxkjjxv8m).

Click from the `Cheap page` button to the `Expensive page` button. Notice how the button stays blue as the UI freezes.
// Todo Include flame graph without the defer-render-hoc
Our click event takes 620ms. The click event does not finish until our Expensive Component mounts. Because of that, the screen is frozen for the user.

Now, click from the `Cheap page` button to the `Deferred Expensive page` button. Notice how the button does not stay blue, and the UI is not frozen.

// Todo In the new flame graph with defer-render-hoc,
Our click event takes 16ms. The click event doesn't wait for our Expensive Component to mount;
the work is deferred. The screen doesn't freeze.

# Why does this help?
The same amount of work still happens. The Expensive Component still mounts; it just mounts later. It experience itself is not faster overall. It might even be slower with the overhead of the `defer-render-hoc`. But sometimes a faster perceived experience is more important than an actual faster experience. See these articles for more information.
https://en.wikipedia.org/wiki/Perceived_performance
https://medium.com/@lukejones/a-designers-guide-to-the-perception-of-performance-fedb4bd102b
Depending on your project, `defer-render-hoc` might be for you.
