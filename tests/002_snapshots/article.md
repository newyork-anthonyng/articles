Snapshot all the things

This article is about using Jest's snapshot feature. Watch this awesome talk about Jest snapshots (https://www.youtube.com/watch?v=HAuXJVI_bUs&t=1s) which does a better job than me.

One of the most annoying thing about tests for me is maintaining them.
I find there are many times where I change one line of code which breaks a dozen tests.
It takes me more time to update the tests than it does to update the source code.

Your source code should be DRY, but your test code should also be DRY.
It should be DRY in the sense that you don't have to repeat yourself when you are fixing your tests.
Maintaining your tests shouldn't be painful.

This is where snapshot tests come in.
Let's take a look at a painful test setup.

## Include code snippets of tests without snapshot tests

Notice how many tests would break if we changed the text inside our <h1> tag. Or if we decided to change the <h1> tag to a <h3> tag.
We would have to manually update our test files to match the new source code.

Now let's see what our tests would look like if we used snapshots in our tests
## Include code snippets of tests with snapshot tests

What happens if we change the text inside our <h1> tag. The same tests would break as before.
But this time, you don't have to manually update anything.

Run Jest in watch mode. Jest will give you a visual diff between what your current test's output is and your snapshot files.
If you are happy with the changes, all you have to do is tell Jest that you are happy with the changes.
Jest will automatically update the snapshots itself. You don't have to do anything else.

And how do we update the snapshots?
## Include screenshot of Jest output.
Just press "u".

# Snapshot tests aren't restricted to React components.
If you have any tests where you are checking for the existence of something (or that something didn't change), consider using snapshot tests. If a test assertion can be represented nicely as a snapshot, then use snapshots

P.S. The key here is that it can be represented as JSON.
```
const a = () => { return 0; };

expect(a).toMatchSnapshot();
```
The snapshot that would get produced here is:
```
exports[`should have useless snapshot 1`] = `[Function]`;
```
This isn't a great example of using a snapshot because the snapshot of a function is '[Function]'.

Redux reducers are a great example.
## Include code snippets of tests without snapshot tests

What happens if we decide to include Price in our state. We would have to go through every single test and update our "expected" value

Would snapshots have helped?
## Include code snippets of tests with snapshot tests

Again, Jest provides us with a visual diff and does all the manual work for us.

Before you write your next test, see if snapshots will make your test maintenance easier.
