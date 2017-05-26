# Deliberate Practice: What I learned from reading docco

# Introduction
I was browsing through open source projects, trying to find the next one I would study. I came upon underscore.js and its annotated source code (see link here http://underscorejs.org/docs/underscore.html). The annotated source code amazed me. On the right side of the page was the source code. On the left side of the page were notes explaining each block of code. This was knowledge that I would not have gotten from reading the source code on my own. I wanted to know what produced this beautiful documentation and found Docco.

# What is docco?
Docco (https://github.com/jashkenas/docco) is a "literate-programming-style documentation generator." It is a program which takes your source code and creates annotated documentation. Note that Docco only generates the layout of the documentation. The comments from your source code serves as the annotations.

I have an amazing function that I want to create documentation for. (see this link https://github.com/newyork-anthonyng/articles/blob/master/deliberate_practice/002_docco/tutorial/app.js). I included descriptive comments which will act as my annotations.

To use docco, I will install it locally with `npm install --save-dev docco`.
The docco command accepts file names, which it will generate documentation for. My program is saved as `app.js`, so I will run `./node_modules/.bin/docco app.js`. And that's all it takes!

By default, docco will place all generated documentation into a new `docs` directory.
You can configure docco to use different CSS or different layouts. Check out this `linear` layout of the annotated code.
(see this link)(https://github.com/newyork-anthonyng/articles/tree/master/deliberate_practice/002_docco/tutorial/linearDocs).
Check out docco's README.md for more details.

I am going to start using docco to start annotating all future Open Source projects that I work through.

* What is literate programming?
With literate programming, you want to express your program logic in plain language. A person should be able to read through it like a book and understand what is happening.
 (See this link to learn more https://en.wikipedia.org/wiki/Literate_programming).

This means that documentation should follow the same order as the program logic, and not the same order as the source code.
We write programs in an order that makes our compiler happy. Sometimes, this order is not the same as the logic of our program.

So, Docco doesn't generate literate programming documentation in its truest sense. Docco generates its documentation in the same order as its source code. But, I still think that this annotated source code is valuable. Think of it as pseudocode for a block of code.

* Taking things apart and putting them back together
When starting to understand a new project, invest time into setting up a feedback loop. It may be setting up the project test suite, so that you can edit the source code and see what breaks. It may be finding a quick way to run the source code from your terminal to see your console logs. I would not start browsing the source code until you have a way of creating this feedback loop.

This is what makes Test Driven Development so effective and enjoyable for me. You see what your code is doing instantly. Without a feedback loop, you will be coding in the dark.

For me, I was running docco's source code in my terminal by running `node docco.js app.js`, where `app.js` was a dummy file. I was able to see the results of my `console.log`'s by running this command. This is what my beautiful source code looked like, with over 150 lines of my own comments. (see this link https://github.com/newyork-anthonyng/articles/blob/master/deliberate_practice/002_docco/docco.js).

* Work on projects you will use regularly
Kent Dodds wrote a great article about contributing to Open Source projects. (See link here https://medium.com/@kentcdodds/what-open-source-project-should-i-contribute-to-7d50ecfe1cb4). His suggestion is to only work on projects that you will use regularly. This is how I have chosen the projects I have worked on.  I decided to create my own version of docco because it was something that I would want to use myself.

I also decided against using Docco itself because its maintenance seemed to be dead. Was the latest commit  from over 2 years ago? Are there stale outstanding issues from years ago? Are there a lot of ignored Pull Requests? These are good indicators that this project may be dead.

Most importantly, I wanted to create and publish docco-lite for the learning experience.

* Awesome libraries exist outside of the browser as well
I have concentrated on the front-end world. I know there are no shortages of libraries and frameworks that are available to me. I was ignorant of the amazing libraries available outside of the front-end world.

Here are some awesome libraries that Docco used.

fs-extra (see link here https://github.com/jprichardson/node-fs-extra)
fs-extra is a beefed up version of the file system (fs) module. It was very cool to create directories and files, instead of creating <div>'s and <h1>'s.

commander (see link here https://github.com/tj/commander.js)
Commander is a library that creates command-line interfaces.

chalk (see link here https://github.com/chalk/chalk)
Chalk lets you style your terminal strings 💅
Include link from chalk README.md (https://raw.githubusercontent.com/chalk/ansi-styles/master/screenshot.png)

highlightjs (see link here https://highlightjs.org/)
highlightjs can create HTML out of a string of code.
https://github.com/newyork-anthonyng/articles/blob/master/deliberate_practice/002_docco/tutorial/highlightExample.js
With this HTML output, you can add CSS to style your code snippets.

* JavaScript Templates
In General Assembly's bootcamp, I learned Handlebars before the fancy Angular. Handlebars is a simple JavaScript templating language, which puts JavaScript into your HTML. If you have a simple project, sometimes a simple templating language is enough to get you by. The overhead of using React may not make sense.

I have worked with React for the past year. The simplicity and power of using JavaScript templates surprised me. The `underscore` library provides you a simple way to use JavaScript templating.

If you want to include JavaScript in your template, use <% %>.
For example, I want to declare a variable. <% var person = 'Anthony'; %>

If you want the JavaScript to render as text, use <%= %> (note the equal (=) sign).
<h1><%= person %></h1>. This would render an <h1> tag with the text, Anthony. Cool.

You can even get fancy and use for-loops with JavaScript templates.
You can even get fancy and use for-loops with JavaScript templates.
<% for (var i = 0; i < 5; i++) { %> <!-- use <% %> because we are not actually printing anything as text -->
  <% var myText = "Number " + i; %>
  <h1 id="<%= i %>">
  <%= myText %>
  </h1>
  <% } %>

We didn't need webpack, babel, or the virtual dom. The good ol' days of building a webpage 👴

* Create valuable PRs
Contributing to an Open Source project should provide value for someone. You could be helping others by fixing bugs, adding features, or updating documentation. You could be helping yourself by working on a project where you learn something new. But make sure that the work you are doing is not wasted.

Take a look at the UMDjs repository. (see link here https://github.com/umdjs/umd).

Include screenshot of README.md

We can see some Markdown formatting issues in the README.md. This would be a perfect opportunity to create a Pull Request to fix this. But before we do this, let's check that our efforts are not wasted. Let's check out the outstanding Pull Requests.

Include screen shot of outstanding Pull Requests.
Notice how there are 11 outstanding Pull Requests which fix the same thing.

It's awesome that people care enough about this project to fix its documentation. But creating another Pull Request to fix the README.md isn't going to help anyone.

The same can be said before creating a Pull Request to add a new feature or fixing a bug. You should create an issue on Github first. The feature might not be wanted, so the time spent on the Pull Request is a waste. The bug you found might actually be a bug in your own code, rather than a bug in the library's source code.

Creating issues also helps avoid duplicative work done by other Open Sourcerers.  Before creating a new issue, look through other open and closed issues to make sure it's not already fixed.

* Literate programming as a way of lowering the barrier for new developers I believe it is valuable to lower the barrier to contribute to Open Source projects. There are a lot of intimidating factors when starting out on an Open Source project. What is the directory structure? What do I have to download to set up my environment? What base knowledge do I need to have to understand the program logic?

A Code of Conduct is something that is becoming a staple in Open Source projects. (see link on Facebook's code of conduct https://code.facebook.com/pages/876921332402685/open-source-code-of-conduct). I was thinking that annotated source code would become a staple as well.
