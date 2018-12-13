What the Hook? Learn the basics of Tapable

What is Tapable
Tapable is a library that creates hooks for plugins. It is a core library of webpack, a popular module bundler. What makes Webpack powerful is the custom plugins you can write. Tapable creates this powerful custom plugin system. It allows you to extend, modify, and change behavior.

What are hooks?
Hooks allow other users to tap into important events, and run the user's code when the event happens. You've probably seen this before. When you add a click event listener. The browser exposes a hook for you to tap into. When the click event actually happens, your code is run. (CODE SAMPLE)

You've probably heard of React hooks as well. Is that similar to hooks? Yes! React Component classes have various lifecycle methods, such as componentDidMount, componentDidUpdate, componentWillUnmount. You can think of all these lifecycle methods as hooks. I can add code to run when a lifecycle event happens. When that lifecycle event happens, my code runs! (CODE SAMPLE)

The new React Hooks API extracts all these component lifecycle methods out. You know longer have to use React Component classes to use these lifecycle hooks. Just use the Hooks API.

