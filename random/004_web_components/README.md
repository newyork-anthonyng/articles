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
See this example of a React application using a Web Component.
The React documentation also shows how you can use React within your Web Components. I haven't found a scenario that would warrant importing React.