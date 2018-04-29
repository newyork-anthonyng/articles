This article is intended for Mac users

# Use reverse-i-search to quickly navigate through your history

You type a long command into your terminal to start up your program. And now you want to do it again. The easiest option is to retype the entire command.
Your typing speed will greatly improve. Or, you will get tired of programming.
Let's take a look at some alternatives.

## Using the arrow keys
You can press the up and down arrows in your terminal to navigate through your history.
This navigates through your history chronologically.
Pressing the up arrow will go one entry earlier. Pressing the down arrow will go one entry later.

TODO: Give a carbon example that will show this

This is convenient for commands that you ran 5 minutes ago. But it can get unwieldy when you are searching for an obscure command 5 days ago.

## Side note: Where is this history kept?
The history of your commands are saved into a file in your machine. I like to compare it to your browser's history.

You can view the history of all your recently executed commands by running `history` in your terminal.

TODO: Include a carbon example showing `history` usage.

You can also open the `~/.bash_history` file to view the same results. 

Similar to your browser, you can delete entries from your history. Delete a line from your `~/.bash_history` file. Then, use your up arrow key to navigate through your history. Notice how your deleted entry no longer shows up.
TODO: Verify that this works.

## reverse-i-search, a better way of searching
You ran an AWS command in your terminal last week. Unluckily for you, you don't remember the obscure StackOverflow question that contained it. Of course, you also forgot to document this command.

You can use the up arrows in your terminal, but this will go through all the commands you executed in your terminal since last week.

Instead, we can use `reverse-i-search`. 
TODO: Include a definition of `reverse-i-search`. It should come from one of the links that I have in `notes`.

Press the `ctrl` key and the `r` key simultaneously. A prompt will appear like so:
TODO: Include a screenshot of what happens after typing `ctrl + r`.

Start typing what you remember of your snippet. You will see the latest command from your `history` that matches your search term.
TODO: Include a screenshot.

Press `ctrl + r` again to navigate through other entries in your `history` that match your search term.
TODO: Include a screenshot.

## Helpful tips and tricks
### Using HISTIGNORE="pwd"
The up and down arrows are useful to grab recently used commands. However, it navigates through *ALL* your commands, including commonly used ones that you probably don't care for. When you're going through your history, you're probably not looking for an `ls` or `pwd` command to execute again. It would be easier for you to just retype those commands.

TODO: Include screenshot of a stack of `ls` and `pwd` garbage commands, with a couple of nice `aws` commands that you want.

You can update your `~/.bashrc` file with a `HISTIGNORE` entry to filter your history.

TODO: Include a screenshot of your `~/.bashrc` file.
``` shell
export HISTIGNORE="pwd:ls"
```

Now, you will no longer have a `history` filled with useless `pwd` and `ls` commands that you don't intend to reuse. Beautiful.
TODO: Include a edited screenshot of a stack of nice commands that you care about.

TODO: What does HISTIGNORE actually do? Does it manipulate your `~/.bash_history` file?

### Update .inputrc file with a shortcut
Start typing `git` into your terminal. Then, press the up arrow. 
Your terminal is now populated with your most recently executed command.

Some people might find it convenient to press the up arrow and see history that matches what you have typed in your terminal.

We can update the `~/.inputrc` file to get this desired effect.

TODO: Include screenshot.
TODO: What does the `~/.inputrc` do?

### Using comments in your commands
Do you work on different projects that use different commands? Wouldn't it be convenient to filter your searches based on a tag you specify?

You can do that with comments. 
When running commands in your terminal, you can add comments with `#`.
TODO: Include screenshot.

After doing this, you can use `reverse-i-search` to filter by these commands.
TODO: Include screenshot.

# Resources

