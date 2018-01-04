What I learned from reading random-number-in-range

I was working on a project and needed to get a random number from a given range.

Like a normal programmer, I went straight to StackOverflow in search of a code snippet.

https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
The top answer from this link looks would have done the job.

Instead, I searched for an npm package to do the same thing. Here's why.

Should we care about the implementation?
When we want to create a server, we don't copy and paste code snippets to create a server from scratch. We lean on previous solutions like "express" or "http-server".

And why should you not use previous solutions? Most developers don't care how their servers are implemented. They only care about how to use it, and that it works.

You'll often hear about node modules being compared to lego blocks. We, as developers, use these lego blocks to construct our project. We don't care how the lego blocks are created; only that we can use them.

Unix Philosophy
The Unix Philosophy favors small, composable, single-purpose tools. The tools should do one thing, and do it well.

Let's look back at our lego analogy. A 4x2 lego brick is not impressive on its own. It does two things well; it looks like a 4x2 brick, and it can connect to other bricks.

Image of 4x2 brick

Compose many lego bricks together, and you can get something amazing.

https://c1.staticflickr.com/8/7018/6732163067_1199d6a2cf_b.jpg

More Knowledge
What's amazing about open source is the breadth of developers who contribute to a project. Dozens of developers working on a solution is (probably) better than a solution you came up with on your own.

Read this response from Sindre Sorhus about using packages. This made me favor npm packages for solutions, rather than StackOverflow
https://github.com/sindresorhus/ama/issues/10#issuecomment-117766328

Drawbacks
Be careful when choosing packages as your solutions. Not all packages are created equally! Some things you should look for in a package are:
  * how active is the package?
  * are there tests?
  * how many open issues are there?

If the only package you find doesn't meet your standards, don't fret! You have the opportunity to fill the void and build your own solution! If a package won't add an API that you want, fork it and add it. Is a project's filesize too large and won't change? Fork it and change it.
Check out this great Egghead course by Kent C Dodds on how to write an open source JavaScript library.
https://egghead.io/courses/how-to-write-an-open-source-javascript-library

Using a dependency by itself can be dangerous. You are depending on someone else's work. left-pad is a package depended on by many other packages. The author of left-pad removed the package from npm and broke the packages which depended on it. Read more about it here.
http://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm
The actions that npm took to prevent this from repeating gives me confidence.

The code
The actual code for random-number-in-range is 5 lines of code. It's like the StackOverflow solution but with defaults for min and max.
module.exports = function randomInRange(min, max) {
  if (!min) min = 0
  if (!max) max = 100
  return Math.floor(Math.random() * (max - min)) + min
}
