# Use webpack with __dirname correctly

While working on server-side code, I used webpack to compile some of my JavaScript files. I came upon an error where I had webpack compiled code acting differently than webpack un-compiled code.

The root of the issue was how webpack handled Node variables such as `__dirname`.

`__dirname` (https://nodejs.org/docs/latest/api/modules.html#modules_dirname) returns the `the directory name of the current module.` Let's take a look at some code that uses `__dirname`.

# Include snippet of code that does not use webpack

This is what the output of it looks like.

# Include console log

Now let's take at look at similar code that uses `webpack`.

# Include snippet of code that does use webpack

This is what the output of it looks like.

# Include console log

Notice how the `__dirname` is different depending on whether you use webpack or not. This is because webpack replaces `__dirname` with “/“. It’s a weird default, and might cause some hard-to-find bugs.   It also does this with `__filename`.

To have the `__dirname` act the same when getting compiled by webpack, we can update our webpack.config.js like so.

# Show update webpack.config.js

# Lessons learned
If you are using webpack only to use Babel to compile your server-side code, there might be an alternative. Instead of using webpack, you may be able to use `babel-register` (https://babeljs.io/docs/usage/babel-register/).
Note that you might still need webpack if using other loaders (besides Babel) or plugins.
# Include screenshot of babel-require

I found this bug when I was using the `support/logger` that was provided from the `primer-node` application. I noticed that some logs were getting logged into Splunk correctly, but others were completely missing. Eventually, I traced this back to the webpack configuration I was using.