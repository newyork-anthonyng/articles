# What's more secure? Dot notation or bracket notation (JavaScript)

Many articles talk about the differences between `dot` and `bracket` notation. But which one is more secure?

## Quick overview
In JavaScript, the `dot` and `bracket` notations access properties from an object.

```js
const dog = {
    name: "Clifford"
};

// dot notation
dog.name; // "Clifford"

// bracket notation
dog["name"]; // "Clifford"
```

`Bracket` notation evaluates arbitrary JavaScript inside the brackets.

```js
const dog = {
    name: "Clifford"
};

dog["n" + "a" + "m" + "e"]; // "Clifford"
```

You cannot do the same in `dot notation`.

## What's more secure?
I was in two different security presentation. In both presentations, the slides briefly mentioned:
> Bracket notation is more secure than dot notation. Use bracket notation.

This didn't make sense to me.

`bracket` notation seemed inherently more insecure than `dot` notation. `Bracket` notation can run arbitrary JavaScript. `Dot` notation didn't allow this, and was more restrictive with its syntax. For example, you couldn't use characters like `+` or `-` in its name.

```js
const dog = {
    "name + breed": "Clifford, big red dog"
};

dog.name + breed; // ReferenceError: breed is not defined
dog["name + breed"]; // "Clifford, big red dog"
```

Then I learned the attack vector of this security vulnerability was in the server.

## Server-side vulnerability
Imagine we have the below server.

```js
const express = require("express");
const app = express();

app.get("*", (req, res) => {
    // 🤔 Input coming from user
    const name = req.query.name;

    res.send(`
        <html>
            <body>
                <script>
                    const myCharacter = {
                        name: "Clifford",
                        species: "dog",
                        color: "red"
                    };

                    // 🤔 What could go wrong?
                    const value = myCharacter.${name};
                </script>
            </body>
        </html>
    `);
});
```

Let's focus on the two lines below.
```js
// 🤔 Input coming from user
// 🐨 This information could come from a database
const name = req.query.name;

// ...other code...

// 🤔 How could this go wrong?
const value = myCharacter.${name};
```

If a user goes to `localhost:8000?name=name`, nothing bad would happen.

But what if they go to, `localhost:8000?a;alert("hello world");`.
Now we have a problem! The user is greeted with an alert that says "hello world."

---

If we used `bracket` notation, we would still run into potential issues.

```js
const express = require("express");
const app = express();

app.get("*", (req, res) => {
    const name = req.query.name;

    res.send(`
        <html>
            <body>
                <h1>${name}</h1>

                <script>
                    const myCharacter = {
                        name: "Clifford",
                        species: "dog",
                        color: "red"
                    };

                    const value = myCharacter["${name}"];
                </script>
            </body>
        </html>
    `);
});
```

`localhost:8000?a;alert("hello world");` wouldn't run in this scenario. But there are still issues. Can you figure out what URL would run arbitrary JavaScript?

We still need to sanitize the user's input to make sure we don't run arbitrary JavaScript.

```js
const express = require("express");
const app = express();
const sanitize = require("some-super-awesome-sanitizer-library");

app.get("*", (req, res) => {
    const name = sanitize(req.query.name);

    res.send(`
        <html>
            <body>
                <h1>${name}</h1>

                <script>
                    const myCharacter = {
                        name: "Clifford",
                        species: "dog",
                        color: "red"
                    };

                    const value = myCharacter["${name}"];
                </script>
            </body>
        </html>
    `);
});
```

## Conclusion
Always sanitize user input. `bracket` notation allows you to sanitize your user's data; `dot notation` does not.

See this obligatory xkcd comic.
https://xkcd.com/327/

You can see a demo of the project on Github.
https://github.com/newyork-anthonyng/bracket-dot-notation-security

Let me know if there's anything I missed. Leave a like if you enjoyed the article.