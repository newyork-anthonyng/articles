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
  It's a command line tool which takes in source code, and creates beautiful documentation like the one we saw for underscore.
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
  * https://github.com/jashkenas/docco
* What is literate programming?
  * Link to the annotated source code of underscore
  * Expressing programming logic in plain language
  * I like to think of it as pseudocode
* Taking things apart and putting them back together
  * invest time in creating a short feedback loop
    * it may be running a test suite
    * it my case, it was adding console.log statements. It gave me instant feedback
    * I would not suggest trying to take apart a project until you have a way to get short feedback
  * link to my commented version of docco
  * pepper the src code with your own comments
    * notice all the console.logs that I have there
  * Kent Dodds said that you should work on Open Source projects that you will use
    * created my own version of docco-lite because maintenance of docco seemed to be dead
    * fun learning experience
    * I created docco-lite, which I published to npm (which was a good learning experience in its own right)
    * bin directory
* Literate programming as a way of lowering the barrier for new developers to contribute.
  * I believe it is valuable in lowering the barrier for new developers to contribute.
    * There are a lot of intimidating factors when first starting out on an Open Source project
      * directory structure
      * code of conduct
      * setting up environment
      * grokking the source code logic
  * I have conflicting feelings about it if it should be standard on all Open Source projects, such as a Code of Conduct should be
    * more maintenance
    * well written comments and tests code do the same thing. But it would take longer
  * Most programmers cannot read code well
    * the average programmers writes 10x more code than they read
      * not patient
      * they skim (becuase who actually reads anymore)
* Awesome libraries exist outside of the browser as well
  * Working in the frontend world, I know that there are no shortages of libraries and frameworks available to me
  * There exists the same type of environment working with CLI
    * fs-extra (include brief intro)
    * commander (include brief intro)
    * chalk (include brief intro)
    * highlightjs
  * as a web developer, I primarly work in the browser
  * it was a nice change creating a CLI tool
* JavaScript Templates
  * After primarily working in React, it is refreshing to go back to using templates
  * The syntax was refreshing, and effective
* Create valuable PRs
  * link to project defining UMD. (https://github.com/umdjs/umd/pulls)
    * show README.md
    * this might be a great chance to update README.md
    * do not blindly create a PR
    * there are a dozen PRs all addressing the same thing
    * create issues before spending time on a PR that will not get accepted
      * be sure to search through previous issues to make sure there are no duplicates as well
