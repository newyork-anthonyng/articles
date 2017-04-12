# Deliberate Practice: What I learned from reading classnames

* Link to original article explaining Deliberate Practice
What is Deliberate Practice? Take a look at my earlier article.

* What is classnames
* What is it used for?
* https://github.com/JedWatson/classnames
In this article, I will be taking a look at classnames, a popular library used mostly in React to conditionally join classNames together. Let's take a look at what it does, and what I learned by going through the repository.
If you've used React before, you've probably run into this package.

You can use it like this.
```js
import classNames from 'classnames';

classNames('foo', 'bar'); // => 'foo bar'
```

# How to use?
* Include tutorial snippets from README.md (https://github.com/JedWatson/classnames#usage)
The `classNames` API is very simple. They have great examples on their README.md.

As you saw earlier, they accept a number of strings.
```js
classNames('foo', 'bar'); // => 'foo bar'
```

classNames also accept a number of objects. If they value of the key is falsy (false, null, undefined, 0, NaN, ''), the value will be omitted.
```js
classNames({ curry: true }, { lebron: false, durant: true }); // => 'curry durant'
```

classNames also accept a number of arrays, which are recursively flattened and processed using the rules above.
```js
const array = ['kerr', { thompson: true }];
classNames('zaza', array); // => 'kerr thompson zaza'
```

You can mix and match.

# Usage with React
This package's primary use case is to make React's className prop simpler to work with.

Without classNames, you might have used string manipulation to create React's className prop.
```js
// Example taken from README.md
class Button extends React.Component {
  // ...
  render () {
    const btnClass = 'btn';
    if (this.state.isPressed) btnClass += ' btn-pressed';
    else if (this.state.isHovered) btnClass += ' btn-over';

    return (
      <button className={btnClass}>{this.props.label}</button>
    );
  }
});

```

Now with the classNames package, it would look like this:
```js
// Example taken from README.md
import classNames from 'classnames';

var Button = React.createClass({
class Button extends React.Component {
  // ...
  render () {
    const btnClass = classNames(
      'btn',
      {
        'btn-pressed': this.state.isPressed,
        'btn-over': !this.state.isPressed && this.state.isHovered,
      }
    );
    return (
      <button className={btnClass}>{this.props.label}</button>
    );
  }
});
```

* Common mistakes ("undefined") classnames
This is one of the most common mistakes I see using the classNames module, and that's the dreaded "undefined" className.

```js
// wrong
class Button extends React.Component {
  // ...
  render() {
    const btnClass = classNames(
      'btn',
      {
        [this.props.className]: true,
      },
    );
    return (
      <button className={btnClass}>{this.props.label}</button>
    );
  }
}

<Button /> // => without a props.className passed in, we are unfortunately left with 'btn undefined' in our className
```

Remember that falsy values are ignored inside the classNamespackage.
```js
classNames('curry', 0, 'durant', false); // => 'curry durant'
```

Knowing this, we can update our React example to accept props.className like so:
```js
// correct
class Button extends React.Component {
  // ...
  render() {
    const btnClass = classNames('btn', this.props.className);
    return (
      <button className={btnClass}>{this.props.label}</button>
    );
  }
}

<Button /> // => 'btn'
<Button className="big-btn" /> // => 'btn big-btn'
```

# Different versions that you can opt into
# Dedupe
There's 2 issues that you might run into. Do you see them?
```js
// Oh no! Duplicates!
classNames('foo', 'bar', 'bar'); // => 'foo bar bar'

// Oh what?
classNames('foo', 'bar', { foo: false }); // => 'foo bar'
```

Luckily, classNames provides an opt-in version of its library for us to use, called dedupe.

```js
import classNames from 'classnames/dedupe';

classNames('foo', 'bar', 'bar'); // => 'foo bar'

classNames('foo', 'bar', { foo: false }); // => 'bar'
```

That's more like it. However, note that dedupe is around 5x slower than the default classNames package. Use this only if needed.

## Bind
Another version classNames provides to us is called bind. It's meant to help us when we're using CSS modules with React, but I find that the default className package does well on its own.
Take a look at the README.md for more information about it (https://github.com/JedWatson/classnames#alternate-bind-version-for-css-modules).

# Object.create(null)
https://github.com/JedWatson/classnames/commit/088fb265459c488b66665a24b2edef806be04a55
I've seen code snippets where, when you are iterating over an Object's keys, you should use `hasOwnProperty` to check if the object itself has the property as its own key (and not inherited).

```js
Object.prototype.foo = 'bar';

const a = {
  b: true,
};

for (const key in a) {
  console.log(key);
}
/*
'b'
'foo'
*/
```

We would use `hasOwnProperty` to make sure we only get properties that belong to our newly created object.

```js
Object.prototype.foo = 'bar';

const a = {
  b: true,
};

for (const key in a ) {
  if (a.hasOwnProperty(key)) {
    console.log(key);
  }
}

// => 'b'
```

Instead of using `hasOwnProperty`, we can also create a new Object that inherits nothing!

```js
Object.prototype.foo = 'bar';

const a = Object.create(null);
a.b = true;

for (const key in a) {
  console.log(key);
}

// => 'b'
```

But this also means methods that Objects normally have, such as toString (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) will not exist on this new object.

```js
const a = {};
console.log(a.toString); // => [Function: toString]

const b = Object.create(null);
console.log(b.toString); // => undefined
```

# Awesome documentation and great tests
https://github.com/JedWatson/classnames/blob/master/dedupe.js#L75
Awesome documentation isn't something that's reserved for open source projects.
Did you find a great code snippet that you used (and might not be sure how it works)?
Did you do hours of research and reach a conclusion? Include a comment to save other people from doing work.
They have an amazing README.md with rich examples that shows everything this package can do.

Documentation and comments are great. But they can rot and be out of sync with what the code actually does. But tests don't lie! Well-written tests will tell you everything that the package should be able to do and not do.

# apply/call
Apply and Call are great interview questions, but I rarely get to use them in practice. Seeing it inside of the `classNames` package was a nice refresher on what it does. And hopefully it sticks this time seeing it used outside of academia/interview prep.

`apply` and `call` basically do the same thing. It sets the `this` of the calling function.

For example,
```js
const dog = {
  name: 'Fido',
};

function greet() {
  console.log(this.name);
}

greet.call(dog); // => 'Fido'
greet.apply(dog); // => 'Fido'
```

The differences come when you want to pass in arguments into the calling function. Let's take a look at a function that takes in arguments.

```js
const dog = {
  name: 'Fido',
};

function greet2(greeting, punctuation) {
  console.log(greeting + punctuation + ' ' + this.name);
}

greet.call(dog, 'Hello', '!'); // => 'Hello! Fido'
greet.apply(dog, ['Hello', '!']); // => 'Hello! Fido'
```

Notice the difference here. `apply` takes its arguments in an array (`apply` and `array` both start with `a`). `call` takes its arguments provided individually, like a normal function would.

`classNames` uses `apply` to handle array arguments passed into it.
https://github.com/JedWatson/classnames/blob/master/index.js#L25
```js
classNames(['foo', 'bar']);

// inside the source code which handles Array arguments
classNames.apply(null, arg);
// this would call classNames('foo', 'bar'). Note how we flattened out the Array argument by using apply
```

# Don't trust anything
Take a look at the code snippet below.
```js
// https://github.com/JedWatson/classnames/blob/master/index.js#L11

var hasOwn = {}.hasOwnProperty;

// https://github.com/JedWatson/classnames/blob/master/index.js#L28
if (hasOwn.call(arg, key) && key) {
  // ...
}
```

Why would we save the `hasOwnProperty` function to a variable? This is because we can't trust the arguments we were given. We grab the `hasOwnProperty` from the Object.prototype directly. This saves us from situations like the below:

```js
const player = {
  number: 11,
};

player.hasOwnProperty('number'); // => true
```

That makes sense. But what if someone passed us an object like this:

```js
const otherPlayer = {
  number: 11,
  hasOwnProperty: null,
};
otherPlayer.hasOwnProperty('number'); // => otherPlayer.hasOwnProperty is not a function
```

Using the `hasOwnProperty` function from the Object prototype is a lot safer that trusting the object passed in.

But even this isn't foolproof. The below is also possible:
```js
Object.prototype.hasOwnProperty = null;

const hasOwn = {}.hasOwnProperty;
console.log(hasOwn); // => null
```

# HTML entities
https://github.com/JedWatson/classnames/blob/master/benchmarks/benchmarks.html#L9
I always forget about HTML entities. I always look for a fancy SVG, but you can save a couple of bytes, and they are well supported.
Before you go grab an SVG or a PNG, take a look at this chart to see if you can find something useful.
https://dev.w3.org/html5/html-author/charref

# Benchmark
jsPerf
show examples from code repo
Also include a link to it
Ever had a argument with a coworker about what's faster, a for-loop or a for-each loop? You can settle it by using a benchmarking tool, such as `jsPerf`.
`classNames` is downloaded and used by many and is very concerned with performance.
It uses an npm library, `benchmark` which returns significant results. This is what `jsPerf` uses underneath to run its performance tests. I highly suggest taking a look at it.

# travis.yml
Every wondered how to get all those fancy badges on your README.md? Check out this awesome video series by Kent Dodd on starting your own Open Source project. It's definitely worth a watch, because it covers often ignored topics such as setting up code coverage, a CI, semantic release, and publishing to npm.
https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-introduction

# git blame
# git follow
# git history
Curious about a line of code? Use the "git blame" feature on the Github website. It will tell you when it was written, who it was written by, and most importantly, what commit it was in.
You can event view the "git history" of a file to see how it evolved.
Want to keep up to date with any changes to the repo? Or maybe even contribute or help others with issues? Use github to follow their repository and get automatic email alerts.
