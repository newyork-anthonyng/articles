# Make your objects unforgeable

I was looking at [Jsdom](https://github.com/jsdom/jsdom) and read through the documentations. I found that it made reference to something called `unforgeable`.
> The top property on window is marked [Unforgeable] in the spec, meaning it is a non-configurable own property and thus cannot be overridden or shadowed by normal code running inside the jsdom, even using Object.defineProperty.

This means we have this window property that we cannot manipulate.
```
window.appleSauce = "yum"; // let's imagine this is Unforgeable

window.appleSauce = "eww";
console.log(window.appleSauce); // "yum";

delete window.appleSauce;
console.log(window.appleSauce); // "yum";

Object.defineProperty(window, "appleSauce", {
    value: "eww"
});
// TypeError: Cannot redefine property: appleSauce
```

What is Unforgeable? What is this spec they are talking about? 

# The specs
[Unforgeable] comes from a Web IDL. It is an Interface Definition Language (IDL) for the web. It describes patterns that are implemented in the browser. This is used by people who implement the JavaScript execution environments.

This is used by those who create the JavaScript environments. Frontend developers like me will have no idea about this; and probably don't need to.

The interfaces that you can make look something like this:
```
interface Location {
  [Unforgeable] USVString href;
};
```

# How to make an object Unforgeable
There is an npm library, [webidl2js](https://github.com/jsdom/webidl2js). It generates JavaScript classes based on Web IDL specifications. After using this library, I saw the converted code. This is how you make something Unforgeable.

```
Object.defineProperty(window, "appleSauce", {
    configurable: false,
    writable: false,
    enumerable: true,
    value: "yum"
});
```

Object.defineProperty is the same as this.
```
window.appleSauce = "yum";

// is equivalent to...
Object.defineProperty(window, "appleSauce", { 
    value: "yum"
});
```

But you can specify some options to it. The `configurable` option specifies if the property can be deleted or changed with another `Object.defineProperty` call.

```
Object.defineProperty(window, "appleSauce", {
    configurable: false, // the default is `false`, using this to point it out
    value: "yum"
});

delete window.appleSauce; // doesn't work
Object.defineProperty(window, "appleSauce", {
    value: "eww"
}); // TypeError: Cannot redefine property: appleSauce
```

However, you can still use an assignment operator to override it:
```
window.appleSauce = "eww";
console.log(window.appleSauce); // "eww"
```

The `write` option will take care of that.
```
Object.defineProperty(window, "appleSauce", {
    configurable: false,
    writable: false, // the default is `false`, using this to point it out
    value: "yum"
});

delete window.appleSauce; // doesn't work
Object.defineProperty(window, "appleSauce", {
    value: "eww"
}); // TypeError: Cannot redefine property: appleSauce
```

Now you have a property that is unforgeable. It cannot be changed or deleted.