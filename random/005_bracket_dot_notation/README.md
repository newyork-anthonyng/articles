# What's more secure? Dot notation or bracket notation

There are many articles talking about the differences between `dot notation` and `bracket notation`. But which one is more secure?

## Quick overview
In JavaScript, the `dot notation` and `bracket notation` allow you to access properties from an object.

```js
const dog = {
    name: "Clifford"
};

// dot notation
dog.name; // "Clifford"

// bracket notation
dog["name"]; // "Clifford"
```

`Bracket notation` allows you to evaluate arbitrary JavaScript inside the brackets.

```js
const dog = {
    name: "Clifford"
};

dog["n" + "a" + "m" + "e"]; // "Clifford"
```

You cannot do the same in `dot notation`.

## What's more secure?
I sat through two security presentations in different places and times, by different presenters. It both presentations, the speakers quickly said:
> Bracket notation is more secure than dot notation. Use bracket notation.

I was quick to nod and agree, and thought that I could confirm this on google and get a good explanation. But the google results showed nothing.

Also, after thinking about it, `bracket notation` seemed inherently more insecure than `dot notation`.

`Bracket notation` allows you to run arbitrary JavaScript.

`Dot notation` didn't allow this, and was even more restrictive with its syntax. For example, you couldn't use things like "+" or "-" in its name.

```js
const dog = {
    "name + breed": "Clifford, big red dog"
};

dog.name + breed; // ReferenceError: breed is not defined
dog["name + breed"]; // "Clifford, big red dog"
```

Then I found the attack vector of this security vulnerability. It was in the server-side code.

## Server-side vulnerability
Imagine we have a server rendered app like the below:

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
// This information could easily come from your database
const name = req.query.name;

// ...

// 🤔 How could this go wrong?
const value = myCharacter.${name};
```

If a user goes to `localhost:8000?name=name`, nothing bad would happen.
But what if they do something like, `localhost:8000?a;alert("hello world");`. Now we have a problem! The JavaScript code will actually run.

If we used `bracket notation`, we would still run into potential issues.

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

`localhost:8000?a;alert("hello world");` wouldn't run in this scenario. But there are still issues. Can you figure out what URL would cause this script to run arbitrary JavaScript?

We still need to sanitize the user input to make sure we don't run arbitrary JavaScript.

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
Always sanitize user input. `bracket notation` allows you to sanitize your user's data. `dot notation` does not.

See this obligatory xkcd comic.
https://xkcd.com/327/

You can see a demo of the project on Github.
https://github.com/newyork-anthonyng/bracket-dot-notation-security

Let me know if there's anything I missed. Leave a like if you enjoyed the article.