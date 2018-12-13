What the Hook? Learn the basics of Tapable

What is Tapable
Tapable is a library that creates hooks for plugins. It is a core library of webpack, a popular module bundler. What makes Webpack powerful is the custom plugins you can write. Tapable creates this powerful custom plugin system. It allows you to extend, modify, and change behavior.

What are hooks?
Hooks allow other users to tap into important events, and run the user's code when the event happens. You've probably seen this before. When you add a click event listener. The browser exposes a hook for you to tap into. When the click event actually happens, your code is run. (CODE SAMPLE)

You've probably heard of React hooks as well. Is that similar to hooks? Yes! React Component classes have various lifecycle methods, such as componentDidMount, componentDidUpdate, componentWillUnmount. You can think of all these lifecycle methods as hooks. I can add code to run when a lifecycle event happens. When that lifecycle event happens, my code runs! (CODE SAMPLE)

The new React Hooks API extracts all these component lifecycle methods out. You know longer have to use React Component classes to use these lifecycle hooks. Just use the Hooks API.

How to use hooks
The most basic hook Tapable provides is the Synchronous Hook, or SyncHook. It runs your code synchronously. You can create a hook like so (CODE SAMPLE)

A suggested pattern Tapable uses is to expose the hooks you are using through a hook property (CODE SAMPLE). This allows others to easily see what hooks are available to tap into.

To call a hook, run its "call" method (CODE SAMPLE). Calling a hook will trigger all functions that are tapped into the hook. Think of this like your click event listener. Calling a hook is like having a "click" event getting triggered. All click event listener functions will fire now.
You can also pass arguments to your "call" method. If you do so, be sure to add argument names when instantiating your hook. (CODE SAMPLE). 

This isn't that exciting when hooks aren't getting tapped into.

How to tap hooks
To tap into a hook, run its "tap" method (CODE SAMPLE). The first argument is the name of your plugin or reason for tapping the hook. This name is used for diagnostic information. 
The second argument is a callback function. This is what gets called when your hook fires. If you passed any arguments to your "call" method from before, you will have access to it here.

Think of this like your click event listener. This is the function that gets called when a "click" event happens. In the callback function, you have access to an event object. In our Plugin, you have access to the arguments that were used in our "call" method.


