# Context of bug that was found
Using webpack to bundle for server-side code
Needed webpack because React app which used JSX, and style-loaders
I had function that was logging to a file. On some routes the logging worked. On others it did not work.
Investigation found that routes that went through webpack did not log correctly. Routes that did not go through webpack did log correctly.
I found that they were logging to different files. Logger used the __dirname variable.

# Option to fix it
https://webpack.js.org/configuration/node/#node-__dirname
The default behavior of webpack for __dirname is to replace it with `/`.

Show code snippet of what __dirname was before and after the change.

# Lessons learned
An alternative to using webpack
https://babeljs.io/docs/usage/babel-register/
If you just need babel transforms (and not style-loaders, etc.)
