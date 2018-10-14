In this article, we will learn about Web Components. Web Components are a suite of different technologies that allow you to create reusable custom elements. Using a custom element is no different than using a div. You can create instances in your HTML. You can create an instance with JavaScript. You can attach event listeners to custom elements.
Have you ever looked at the HTML specs and thought the authors left out an important element? This is the solution for you. Custom elements provide a way for developers to build their own fully-featured DOM elements.

# Difference between Custom Elements and Web Components?
Many use the terms Custom Elements and Web Components interchangeably. Web Components are a suite of different technologies, which includes Custom Elements, Shadow DOM, and HTML Imports. Custom Elements has its own specifications. https://w3c.github.io/webcomponents/spec/custom/
// TODO Include webcomponent.png

Web Components are a native feature of the browser. You don't need external libraries to use this functionality. You can see the browser support table here labeled Browser Support.
// Include picture of browser support
You can see the support for Custom Elements here. (https://caniuse.com/#feat=custom-elementsv1)
You can see the support for templates here. (https://caniuse.com/#feat=imports)
You can see the support for Shadow DOM here. (https://caniuse.com/#feat=shadowdomv1)

# So this is React?
React and Web Components solve different problems. Web Components provide strong encapsulation for reusable components. React provides a declarative library that keeps the DOM in sync with your data.
React makes no differentiation between a native HTML element and a Web Component. It would handle your custom built Web Component like it does a normal HTML element.
See this example of a React application using a Web Component. https://codesandbox.io/s/746omm2kwq
The React documentation also shows how you can use React within your Web Components. I haven't found a scenario that would warrant importing React.

# Let's transition gradient backgrounds
We're going to build a gradient Web Component like the one below.

![Web Component that transitions its linear-gradient background](./gradient-background-demo.gif)

Notice how it transitions between gradient backgrounds. We cannot transition backgrounds by default. https://codepen.io/newyork-anthonyng/pen/PyJJmr

But we can transition opacity. 
https://codepen.io/newyork-anthonyng/pen/mzBBBg?editors=1100

We can take advantage of this with CSS pseudo-classes to get the desired effect.
https://codepen.io/newyork-anthonyng/pen/MPEEPo?editors=1100

We can take advantage of this with the CSS "before" pseudo-class to get the desired effect.
https://codepen.io/newyork-anthonyng/pen/MPEEPo?editors=1100

There is a layer (div) with a gradient color. There is a second layer (div::before) with a different gradient color. This second layer sits on top of the first layer and has opacity: 0. To start the gradient transition, we transition the second layer's opacity from 0 to 1. This gives us the effect that the gradient is transitioning.