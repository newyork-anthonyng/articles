// getDirname.js
module.exports function () { return __dirname; }

// app.js
Const getDirname = require(“getDirname”);
getDirname();

Show example with route that uses __dirname. Print it out into the console.
# Include a Carbon image with the output of the __dirname

Now let’s show it using web pack
Show basic webpack.config.js
// getDirname.js
Export default function (){ return __dirname; }

// app.js
import getDirname from “./bundle.js”;
getDirname();

# Include a Carbon image with the output of the __dirname

Notice how the two __dirname’s are different. This is because webpack replaces __dirname with “/“. It’s a weird default, and might cause some hard-to-find bugs.  It also does this with __filename. Take a look at the web pack docs to change it.

We can update our web pack to look like this:
# Show update webpack.config.js

# And show the new output

Done.

I found this bug when I was using the `support/logger` that was provided from the `primer-node` application. After going crazy over this, I noticed that some logs were getting logged into Splunk correctly, but others were not. I traced this back to web pack being the culprit.

# Lessons learned
An alternative to using webpack
https://babeljs.io/docs/usage/babel-register/
If you just need babel transforms (and not style-loaders, etc.)
