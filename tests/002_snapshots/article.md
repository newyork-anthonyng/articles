Snapshot all the things

This article is about using Jest's snapshot feature.
Video about Jest snapshots https://www.youtube.com/watch?v=HAuXJVI_bUs&t=1s

Annoying thing about tests is maintaining them

You want to keep tests DRY
But DRY in the sense that you do not have to fix multiple broken tests after a code change

Take a look at this example
## Include code snippets of tests without snapshot tests

Notice how many tests would break if we changed the text inside our <h1> tag. Or if we decided to change the <h1> tag to a <h3> tag.
We would have to manually update our test files to match the new source code.

Now let's see what our tests would look like if we used snapshots in our tests
## Include code snippets of tests with snapshot tests

What happens if we change the text inside our <h1> tag. The same tests would break as before.
But this time, you don't have to manually update anything.

When you run watch feature in Jest, it will tell you what part of spec files have changed.
If you are happy with the changes, all you have to do is tell Jest that you are happy with the changes.
Jest will automatically update the snapshots itself. You don't have to do anything else.
## Include screenshot of Jest output.

Snapshot tests aren't restricted to React components.
If you have any tests where you are checking for the existence of something, or that something didn't change, consider using snapshot tests.

For example, take a look at Redux reducers.
## Include code snippets of tests without snapshot tests

What happens if we decide to include Price in our state. We would have to go through every single test and update our "expected" value

Would snapshots have helped?
## Include code snippets of tests with snapshot tests

With snapshot tests, the same tests would fail. But Jest is going to do all the manual work for us. All we have to do is see if the changes are intended.

When I write my tests now, I always default to see if I can write the test using snapshots.
Makes life easier. Etc.
