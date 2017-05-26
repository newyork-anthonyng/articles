# Todo: Host the documentation

# Deliberate Practice: What I learned from reading docco

# Introduction
  I was browsing through open source projects, trying to find the next one I would study.
  I came upon underscorejs and its annotated source code.
  http://underscorejs.org/docs/underscore.html
  When I saw this, I was amazed. This is what I wanted!
  On the right side of the page was the source code.
  On the left side of the page were notes explaining each block of code.
  It was amazing and gave me so much insight into what the source code was doing.
  It was knowledge that I most likely would not have gotten if I read through it myself.
  I wanted to know what produced this magical annotated code, and was directed to docco.

# What is docco?
  * a tool for creating literate programming guides
  Repo found here. https://github.com/jashkenas/docco
  From its README.md, Docco is a "literate-programming-style documentation generator."
  It is a command line tool which takes in source code, and creates beautiful documentation like the one we saw for underscore.
  Docco only provides a way for you to generate the documentation. It doesn't create the annotation itself.

  * include tutorial for how to use it
  https://github.com/newyork-anthonyng/articles/tree/master/deliberate_practice/002_docco/tutorial
  I have a great `greet` function that I want to document.
  I included descriptive comments, which will act as my annotations
  Install the docco package `npm install --save-dev docco`
  Run the docco script, while passing in the name of the files you want to generate documentation for.
  In my case, I will run `./node_modules/.bin/docco app.js`. This will generate documentation for my `app.js` file.
  By default, it will create a `docs` directory and place all my documentation there
  There are a number of other configurations you can pass it, including customized CSS and the actual layout of the annotations
  https://github.com/newyork-anthonyng/articles/tree/master/deliberate_practice/002_docco/tutorial/linearDocs

  * this will be effective for my articles
  This would be a great way for me to keep notes on the projects I am dissecting

* What is literate programming?
  * Expressing programming logic in plain language
  https://en.wikipedia.org/wiki/Literate_programming
  With literate programming, the expression of the program logic in plain language is the primary goal.
  This means that the documentation should follow the same order as the logic, and not the same order as the source code.
  The order of the source code is generally structured to make the compiler happy. It is not necessarily the same order that you would explain the program to someone else.
  Therefore, Docco doesn't generate literate programming documentation in the true sense of it.
  This is because Docco generates its documentation in the same order as its source code.
  I still think that this annotated source code is still valuable.
  I like to think of it as pseudocode

* Taking things apart and putting them back together
  * invest time in creating a short feedback loop
    When starting to study a new project, invest time into setting up your environment.
    It may be setting up the test suite, so that you can mess with the source code and get feedback that you're breaking something.
    It may be finding a quick way to run the source code from node to see your console logs.
    Invest the time to setting up a flow so that you can get a short feedback loop.
    I feel like this is what makes Test Driven Development so enjoyable for me.
    You get to see the results of your mini-experiments right away.
    You feel like you're making progress.
    I would suggest not even touching the source code until you find a way to get this short feedback loop.
    In my case, I was quickly running the source code in node by running `node docco.js app.js` in the `docco` repository.
    This is what my source code looked like (https://github.com/newyork-anthonyng/articles/blob/master/deliberate_practice/002_docco/docco.js), with more than 150 lines of my comments

  * Kent Dodds said that you should work on Open Source projects that you will use (https://medium.com/@kentcdodds/what-open-source-project-should-i-contribute-to-7d50ecfe1cb4)
    * created my own version of docco-lite because maintenance of docco seemed to be dead
    I decided to create my own version of docco because it was something that I would want to use myself.
    You can tell the pulse of a project by looking at the timing of its last commit, the number of stale issues, and the number of stale Pull Requests outstanding.
    The docco project didn't seem to be actively maintained.
    I decided to create my own, if not for the fun learning experience.
    * I created docco-lite, which I published to npm (which was a good learning experience in its own right)
    * bin directory

* Awesome libraries exist outside of the browser as well
  * Working in the frontend world, I know that there are no shortages of libraries and frameworks available to me
  I work as a frontend engineer, developing in React.
  I know that there are plenty of libraries and frameworks available to me, including React, Vue, Preact, Marko, etc.
  I was ignorant of the rich number of libraries available outside of the frontend world.

  Some awesome libraries that I worked with included:
    * fs-extra (https://github.com/jprichardson/node-fs-extra)
      A beefed up version of the file system (fs) module.
      It was very cool to create directories and files. It's definitely a change from creating <div>'s and <h1>'s
    * commander (https://github.com/tj/commander.js)
      A library to help you create command-line interfaces
      It helps you manage arguments passed into the command
      I didn't use it enough to take full advantage of it.
      Used it to print out "help"
    * chalk (https://github.com/chalk/chalk)
      Style your strings that are printed in your terminal
    * highlightjs (https://highlightjs.org/)
      Highlight a chunk of code into HTML.
      This is what Docco uses to format the code
      Include code snippet of what it does (https://github.com/newyork-anthonyng/articles/blob/master/deliberate_practice/002_docco/tutorial/highlightExample.js)

* JavaScript Templates
  When I went to General Assembly's bootcamp, before we learned any fancy Angular/React, we learned Handlebars.
  Handlebars was a simple templating language, which puts JavaScript into your HTML (gasp).
  It's definitely a different approach from React, which puts your HTML into your JavaScript, so that you can get the full power of JavaScript.
  However, if you have a simple project, sometimes a simple templating language is enough to get you by.
  Another templating language, MarkoJS, uses syntax similar to this.
  After working with React for a year, I was surprised and how simple it was to get a template up and working.
  Include quick tutorial of JavaScript templating language
  If you want to include JavaScript in your template, use <% %>.
  For example, I want to declare a variable. <% var person = 'Anthony'; %>
  If you want the JavaScript to actually render as text, use <%= %>. (note the additional equal (=) sign).
  <h1><%= person %></h1>. This would render an <h1> tag with the text, Anthony. Cool.

  You can even get fancy and use for-loops with JavaScript templates.
  <% for (var i = 0; i < 5; i++) { %> <!-- use <% %> because we are not actually printing anything as text -->
    <% var myText = "Number " + i; %>
    <h1 id="<%= i %>">
      <%= myText %>
    </h1>
  <% } %>

  This would print out the following HTML.

* Create valuable PRs
  I think contributing to an Open Source project, or starting one of your own, should provide some value for someone.
  Fixing bugs, adding features, updating documentation will help others.
  Creating your own project as a learning experience is also valuable.
  But make sure that the work you are doing is not wasted.
  Take a look at this repository. (https://github.com/umdjs/umd)

  Include screenshot of the README.md.
  Obviously we can see that there is some formatting issues in the markdown of the README.md.
  This would be a perfect opportunity to create a PR to fix it.
  But first, let's make sure we're not wasting our time. Let's look at the outstanding pull requests.
  See how there are already 11 outstanding Pull Requests to fix the README.md.
  I think it's awesome that people have cared enough about this project to fix documentation.
  But creating another PR to do the same thing probably isn't going to help anyone.

  Before adding a new feature or fixing a bug, create an issue first.
  The feature might not be wanted for some reason.
  A bug might be a bug in your code, rather than a bug in the library's source code.
  Creating issues helps avoid duplicative work done by other Open Sourcerers.
  And before creating a new issue, spend some time to search through other open issues, as well as previously closed issues to see if it was already addressed.

* Literate programming as a way of lowering the barrier for new developers to contribute.
  * I believe it is valuable in lowering the barrier for new developers to contribute.
    * There are a lot of intimidating factors when first starting out on an Open Source project
      * directory structure
      * code of conduct
      * setting up environment
      * grokking the source code logic
  I had an idea that annotated source code should be a staple in all Open Source projects, similar to how a Code of Conduct should be included
  However, some cons are that it requires more maintenance.
  And there is also a duplication of effort. Well written code, comments, and test cases do the same thing. It would just take longer for newbies to understand the code.
  I believe that most programmers cannot read code well.
  I would estimate that programmers write at least twice as much code than they read.
  It's harder to read code than to write it yourself. This is why many developers prefer a complete rewrite of a program, rather than a refactor.
  It takes longer to read code.
  Our habit of skimming while reading does not help when trying to understand code.
