# Introduction
This is another article for my Deliberate Practice. Read this article to learn more about why I am doing this. (https://medium.freecodecamp.org/deliberate-practice-becoming-an-open-sourcerer-27a4f7640940).

# Include article from Twitter
https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3
I was reading through a Medium article about how Twitter Lite used React, and how they removed performance bottlenecks.

There was one situation that interested me.
Twitter situation (https://cdn-images-1.medium.com/max/2000/1*mDPjaeBNhCAbEcbKV-IX3Q.gif)
Reference the original medium article.

Notice in the Giphy. When the user taps on the "Home" button, there is a noticeable delay until the tweets are shown.
The noticeable delay was caused by a large number of components mounting and unmounting.
"defer-render-hoc" is an Open Source project that implements a similar solution in the article.

# Examine the code
`defer-render-hoc` is a higher order component. To learn more about it, read the documentation here (https://reactjs.org/docs/higher-order-components.html).
Use it by wrapping your Expensive component with it.

```jsx
import React from "react";
import createEmptyArray from "create-empty-array";
import DeferRenderHoc from "defer-render-hoc";

// Renders 10,000 <li />'s
class ExpensiveComponent extends React.Component {
  render() {
    const length = 10000;
    const array = createEmptyArray(length);
    return <ul>{array.map((_, i) => <li key={i}>{i}</li>)}</ul>;
  }
}

const WrappedExpensiveComponent = DeferRenderHoc(ExpensiveComponent);
```

Our `defer-render-hoc` renders `null` on the initial render.

```jsx
// simplified source code for defer-render-hoc
// https://github.com/hanford/defer-render-hoc/blob/master/src/index.js
import React, { Component } from "react";

function deferComponentRender (WrappedComponent) {
  class DeferredRenderWrapper extends Component {
    constructor(props) {
      super(props);

      this.state = {
        shouldRender: false
      };
    }

    render () {
      return this.state.shouldRender ? <WrappedComponent {...this.props} /> : null
    }
  }

  return DeferredRenderWrapper;
}
```

So when will `defer-render-hoc` render your Expensive Component? It uses `requestAnimationFrame` to wait two frames to pass before rendering your Expensive Component.

```jsx use diff
// simplified source code for defer-render-hoc
// https://github.com/hanford/defer-render-hoc/blob/master/src/index.js
import React, { Component } from "react";

function deferComponentRender (WrappedComponent) {
  class DeferredRenderWrapper extends Component {
    constructor(props) {
      super(props);

      this.state = {
        shouldRender: false
      };
    }

    componentDidMount() {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => this.setState({ shouldRender: true }))
      });
    }

    render () {
      return this.state.shouldRender ? <WrappedComponent {...this.props} /> : null
    }
  }

  return DeferredRenderWrapper;
}
```

Usually `requestAnimationFrame` is used to create smooth animations (read more about it in this article). (https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution).
Here, we're using it as a way to allow other components to update, or for the user to do some work, before our Expensive Component takes over.

# Demo
Check out this CodeSandbox demo for `defer-render-hoc` (https://codesandbox.io/s/pjxkjjxv8m).

Click from the `Cheap page` button to the `Expensive page` button. Notice how the button stays blue as the UI is frozen.
// Todo Include flame graph without the defer-render-hoc
Notice how long the "click" event takes.
Point out where the "hard" work is happening. The "click" event does not finish until all the new nodes are finished. Because of that, the screen is frozen for the user.

Then click from the `Cheap page` button to the `Deferred Expensive page` button. Notice how the button does not stay blue, and the UI is not frozen.
// Todo In the new flame graph with defer-render-hoc, point out where the "hard" work is happening
Notice how long the "click" event takes.
The work is deferred until later. The same work still happens, but the screen doesn't freeze.

# Why does this help? What situations? Why do these situations happen?
# Gives user the perception of a faster experience

Not a real faster experience, but the perception of one
Sometimes that's even more important
https://en.wikipedia.org/wiki/Perceived_performance
https://medium.com/@lukejones/a-designers-guide-to-the-perception-of-performance-fedb4bd102b
