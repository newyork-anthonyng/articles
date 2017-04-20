# Deliberate Practice: What I learned from reading classnames

* Link to original article explaining Deliberate Practice
This is part of my plan for deliberate practice to improve as a developer. Take a look at this article to learn more.

* What is classnames
* What is it used for?
* https://github.com/JedWatson/classnames
In this article, we will be looking at a library called `classnames`. `classNames` provides a simple API to construct classNames in React.
We'll take a look at what it does, and what I learned by going through their repo.

# How to use?
The `classNames` API is very simple. They have great examples on their [README.md](https://github.com/JedWatson/classnames/blob/master/README.md).

You can pass string arguments like so:
```js
classNames('foo', 'bar'); // => 'foo bar'
```

`classNames` also accept objects as arguments. If the value of the key is falsy (false, null, undefined, 0, NaN, ''), `classNames` omits the value.
```js
classNames({ curry: true }, { lebron: false, durant: true }); // => 'curry durant'
```

`classNames` also accepts arrays arguments. Array arguments are recursively flattened and processed using the above rules. You can mix and match different types of arguments (strings, arrays, objects).
```js
const array = ['kerr', { thompson: true }];

classNames('zaza', array); // => 'zaza kerr thompson'
```

# Usage with React
This package's primary use case is to make React's className simpler to work with.

Without classNames, you might have used string manipulation to create React's className.
```js
// Example taken from README.md
class Button extends React.Component {
  // ...
  render () {
    let btnClass = 'btn';
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
The most common mistake I see at work using classNames are "undefined" classNames.

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

Remember that falsy values are ignored inside the classNames package.
```js
classNames('curry', 0, 'durant', false); // => 'curry durant'
```

Knowing this, we can update our classNames example to:
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

That's more like it. Note that dedupe is around 5x slower than the default classNames package. Use this only if needed.

## Bind
"bind" is another opt-in version of classNames. It's meant to help us when we're using CSS modules with React. But I find that the default className package does well with CSS modules.
Take a look at the [README.md](https://github.com/JedWatson/classnames#alternate-bind-version-for-css-modules) for more information.

# Object.create(null)
https://github.com/JedWatson/classnames/commit/088fb265459c488b66665a24b2edef806be04a55
It is best practice to use `hasOwnProperty` when iterating over an Object's keys. You can check if the key belongs to the object, or inherited.

```js
Object.prototype.foo = 'bar';

const a = {
  b: true,
};

for (const key in a) {
  console.log(key);
}
// => 'b foo'
```

We would use `hasOwnProperty` to get properties that belong to our created object.

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

Instead of using `hasOwnProperty`, we can create a new Object that inherits nothing!

```js
Object.prototype.foo = 'bar';

const a = Object.create(null);
a.b = 'I exist!';

for (const key in a) {
  console.log(key);
}
// => 'b'
```

But this also means methods that Objects inherit, such as toString (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) will not exist on this new object.

```js
const a = {};
console.log(a.toString); // => [Function: toString]

const b = Object.create(null);
console.log(b.toString); // => undefined
```

# Awesome documentation and great tests
https://github.com/JedWatson/classnames/blob/master/dedupe.js#L75
Awesome documentation isn't something that's exclusive to open source projects.

Did you find a great code snippet that you used on your personal project?
Have you spent hours searching for the perfect StackOverflow answer? Include these links as comments in your code! It will save other developers (and the future you) time when figuring out what's going on.

`classNames` has amazing documentation on their README.md. It has rich examples that show everything this package can do.

Documentation and comments are great. Yet, they can rot and become out of sync with what the code actually does. But tests don't lie! Well-written tests will tell you everything that the package should be able to do and not do. If you're new to a library, check out their tests to get a better understanding of the library.

# apply/call
Knowing how to use JavaScript's `apply` and `call` are great interview questions. But I rarely get to use them in the real world. Seeing it inside of the `classNames` package was a nice refresher of what it does.

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

The difference comes when you want to pass in arguments into the calling function. Let's take a look at a function that takes in arguments.

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

Notice the small difference here. `apply` takes its arguments in an array (I remember it by thinking, `apply` and `array` both start with `a`). `call` takes its arguments provided individually, like a normal function would.

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

Why would we save the `hasOwnProperty` function to a variable? This is because we have to be defensive about the arguments given. We grab the `hasOwnProperty` from the Object.prototype. Let's take a look at why.

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

Using the `hasOwnProperty` function from the Object prototype is a safer alternative.

But note that even this isn't foolproof. The below is also possible.
```js
Object.prototype.hasOwnProperty = null;

const hasOwn = {}.hasOwnProperty;
console.log(hasOwn); // => null
```

# HTML entities
https://github.com/JedWatson/classnames/blob/master/benchmarks/benchmarks.html#L9
I always forget about HTML entities. I always look for a fancy image, but using HTML entities are well supported and can save you a HTTP request for an image.
Before you start scouring Google Images for assets, take a look at this [chart](https://dev.w3.org/html5/html-author/charref) to see if it has what you need.

# Benchmark Performance
Arguments with your coworker about for-loops vs for-each loops don't need to exist anymore!
You can settle all disputes by seeing how it performs using benchmarking tools (such as [jsPerf](https://jsperf.com/)).
`classNames` is downloaded and used by many, and performance is of greatest concern. Performance differences are looked at before any Pull Requests are accepted.
Your personal projects might not be concerned with performance. But it is good to keep performance in mind. Take a couple of minutes to play around with [jsPerf](https://jsperf.com/) and set up your own tests.

# travis.yml
Interested in getting adding fancy badges to your README.md? Check out this great [egghead tutorial](https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-introduction) by Kent C. Dodds on starting your own Open Source project. It covers often-ignored topics, such as setting up Continuous Integration, using Semantic Release, publishing to npm, and more.

# git blame
# git follow
# git history
Have you ever run into a certain line of code and was curious about how it came to be? Use the "git blame" feature from the Github website. It will tell you when it was written, who wrote it, and what commit it was from.

You can also view the history of a file and see how it evolved by using "git history", located right next to "git blame". Viewing all the commits shows you how a certain file evolved over time.

I recommend that you find an Open Source project that you use/like, and start contributing back to it. You can "watch" a repository and get notifications whenever there are any updates. You might not be ready to push code changes. But updating documentation or helping with other people's issues are valuable as well.
