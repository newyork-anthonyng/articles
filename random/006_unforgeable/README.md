# Make your objects unforgeable

I was looking at [Jsdom](https://github.com/jsdom/jsdom)'s documentation. It made a reference to something called `unforgeable`.

> The top property on window is marked Unforgeable in the spec, meaning it is a non-configurable own property and thus cannot be overridden or shadowed by normal code running inside the jsdom, even using Object.defineProperty.

This means that `window` cannot be manipulated.

```js
// https://gist.github.com/newyork-anthonyng/e9767c3db24ae4aada70ebc4befc7fb7
window.appleSauce = "yum"; // let's imagine this is Unforgeable

window.appleSauce = "eww";
console.log(window.appleSauce); // "yum";

delete window.appleSauce;
console.log(window.appleSauce); // "yum";

Object.defineProperty(window, "appleSauce", {
    value: "eww"
}); // TypeError: Cannot redefine property: appleSauce
```

How do you make something Unforgeable? And what is this spec they are talking about? 

# The specs
`Unforgeable` comes from a Web Interface Definition Language. It describes patterns that are implemented in the browser. This is used by those who create the JavaScript environments. The average frontend developer have probably never heard of this; and probably won't need to.

[You can see the spec here.](https://heycam.github.io/webidl/)

The interfaces that you can make look something like this:

```js
// https://gist.github.com/newyork-anthonyng/ee2d0faf1834461f4f8d2c7bbe2b105b
interface Location {
  [Unforgeable] USVString href;
};
```

# How to make an object Unforgeable
[webidl2js](https://github.com/jsdom/webidl2js) is an npm library that generates JavaScript classes based on Web IDL specifications. The generated code for Unforgeable code looks like the below.

```js
// https://gist.github.com/newyork-anthonyng/c23d6937f5d6be94ec7f3fc07fdaaf2c
Object.defineProperty(window, "appleSauce", {
    configurable: false,
    writable: false,
    enumerable: true,
    value: "yum"
});
```

[`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) defines a property on an object.

```js
// https://gist.github.com/newyork-anthonyng/0f751d3214d9382c6ce99bfb01af9bfb
window.appleSauce = "yum";

// is equivalent to...
Object.defineProperty(window, "appleSauce", { 
    value: "yum"
});
```

Additionally, you can specify some options when defining a property. The `configurable` option specifies if the property can be deleted or changed with another `Object.defineProperty` call.

```js
// https://gist.github.com/newyork-anthonyng/8638c6e356b4517fd6aed8795cc03cc1
Object.defineProperty(window, "appleSauce", {
    configurable: false, // the default is `false`, using this to point it out
    value: "yum"
});

delete window.appleSauce; // doesn't work
Object.defineProperty(window, "appleSauce", {
    value: "eww"
}); // TypeError: Cannot redefine property: appleSauce
```

However, you can still use an [assignment operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators) to override it.
```js
// https://gist.github.com/newyork-anthonyng/8336858b2e1767ce0547367fe32a2ac4
window.appleSauce = "eww";
console.log(window.appleSauce); // "eww"
```

The `write` option will take prevent that.
```js
// https://gist.github.com/newyork-anthonyng/4e25150915786216d0838f6a97374ed2
Object.defineProperty(window, "appleSauce", {
    configurable: false,
    writable: false, // the default is `false`. Making it explicit for learning purpose
    value: "yum"
});
window.appleSauce = "eww";
```

Now you have a property that is unforgeable. It cannot be changed or deleted.