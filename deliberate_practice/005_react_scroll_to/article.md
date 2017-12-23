# What I learned from reading react-scroll-to

Check out my annotated source code here.

## What is react-scroll-to?
`react-scroll-to` provides us components that makes scrolling inside the window easy. See the Github Repository here.
https://github.com/ganderzz/react-scroll-to

## Children as a function pattern
`react-scroll-to` exposes two API's for the user; one that uses a Higher Order Component and one that uses a "child as a function" pattern. You may have seen Higher Order Components used in some popular libraries like react-redux. But the "child as a function" pattern is a pattern that is gaining popularity.

With children, we normally return JSX in it.
!Include a sample of normal JSX
https://gist.github.com/newyork-anthonyng/1e325d87904a65d603fa00c2bb8df075

But you can also have any JavaScript expression run there.

!Include sample of JSX with a JavaScript expression inside
https://gist.github.com/newyork-anthonyng/ef13b291c5d3477c1bc92488578b81d2

You can also call a function in here as well.

!Include sample of JSX with a JavaScript function
https://gist.github.com/newyork-anthonyng/3ca3d2665e1ae571599c6bc725e368cf

This is a super flexible pattern. Read this article from Michael Jackson to learn more about it.
https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce

# Compound components
`react-scroll-to` also allows you to scroll within a specific container (rather than just scrolling the window) using the `<ScrollArea />` component. It provides a nice API that hides a lot of implementation details from the users of this library.

Ryan FLorence gave a great talk about Compound components. I highly recommend you check it out.
https://www.youtube.com/watch?v=hEGg-3pIHlE

### react-fns Repository
`react-scroll-to` provides an abstraction over the `scroll` API, but what about all the other browser API's? `react-fns` is a collection of imperative Browser API's turned into declarative React components. They have a lot of great things in their roadmap. Check it out and contribute.
https://github.com/jaredpalmer/react-fns
