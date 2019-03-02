# What the Hook? Learn the basics of Tapable

## What is Tapable
Tapable is a library that creates hooks for plugins. It is a core library of [webpack](https://webpack.js.org/), a popular module bundler. What makes Webpack powerful is you can write custom plugins. Tapable creates this powerful custom plugin system using hooks.

## What are hooks?
Hooks allow other users to get notified of important events, and run the other user's code when that important event happens. You've probably seen this before. The browser exposes many hooks for you to tap into. If you wanted to run code when a click event was going to happen, you would do this:

```js
// When a user clicks on the screen, a message is printed to the console
document.addEventListener("click", function() {
    console.log("You clicked me!");
});
```

Another example of hooks are React lifecycle methods. If you've worked with React, you've probably heard of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. You can think of these lifecycle methods as hooks. I can add code to run when a lifecycle event happens.

```js
import React from "react";

// When this component is mounted onto the screen, a message is printed to the console
class MyComponent extends React.Component {
    componentDidMount() {
        console.log("I mounted onto the screen!");
    }

    render() {
        return <h1>🎣</h1>
    }
}
```

> The new [React Hooks API](https://reactjs.org/docs/hooks-intro.html) allows you to use lifecycle methods outside of Component classes.

## How to create hooks with Tapable
The most basic hook Tapable provides is the `Synchronous Hook` (`SyncHook`). You can create a hook like so.

```js
import { SyncHook } from "tapable";

const newHook = new SyncHook();
```

Tapable suggests exposing your hooks through a hook property. This allows developers to easily see what hooks are available to tap into. 

```js
import { SyncHook } from "tapable";

class Car {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook()
    };
  }
}
```

This is how webpack exposes its hooks to plugin authors.
```js
// Example taken from https://webpack.js.org/contribute/writing-a-plugin/
class MyExampleWebpackPlugin {
  apply(compiler) {
    // Notice compiler.hooks 🎣
    compiler.hooks.emit.tapAsync(
      'MyExampleWebpackPlugin',
      (compilation, callback) => {
        console.log('This is an example plugin!');

        callback();
      }
    );
  }
}
```

To call a hook, run its "call" method (CODE SAMPLE). Calling a hook will trigger all functions that are tapped into the hook. Think of this like your click event listener. Calling a hook is like having a "click" event getting triggered. All click event listener functions will fire now.
You can also pass arguments to your "call" method. If you do so, be sure to add argument names when instantiating your hook. (CODE SAMPLE). 

This isn't that exciting when hooks aren't getting tapped into.

## How to tap hooks
To tap into a hook, run its "tap" method (CODE SAMPLE). The first argument is the name of your plugin or reason for tapping the hook. This name is used for diagnostic information. 
The second argument is a callback function. This is what gets called when your hook fires. If you passed any arguments to your "call" method from before, you will have access to it here.

> Think of this like your click event listener. This is the function that gets called when a "click" event happens. In the callback function, you have access to an event object. In our Plugin, you have access to the arguments that were used in our "call" method.

## How to intercept hooks
Sometimes you want more granular control over where your code is run. All hooks offer an interception API. There are 3 main ways that we can intercept hooks (CODE SAMPLE).

### Register interceptor
(CODE SAMPLE) 
This interceptor triggers each time a Plugin taps into a hook. This code is run only once. You have access to the Tap and modify it before it goes to the hook.

### Call interceptor
(CODE SAMPLE)
This interceptor triggers each time a Hook is called. You have access  to all the hook arguments that your Plugin would have access to.

### Tap interceptor
(CODE SAMPLE)
This interceptor triggers each time a Hook is called, and for each Plugin that is tapped onto the hook. You have access to the Tap object. But unlike the register interceptor, you cannot change the Tap object.
