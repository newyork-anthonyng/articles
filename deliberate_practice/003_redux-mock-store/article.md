What is redux-mock-store
Link to github repository https://github.com/arnaudbenard/redux-mock-store
From README, "A mock store for your testing your redux async action creators and middleware"
redux-mock-store gives you a nice API to test your actions.
It is possible to test async creators without this, It is a great convenience.

How to use redux-mock-store
testing synchronous actions
We will take a look at an example of a synchronous action.
https://gist.github.com/newyork-anthonyng/e4ff717b0b4dcffa6df5b2fc1d370c30
This is a simple action creator.
What do we want to test?
https://gist.github.com/newyork-anthonyng/bcdb55add89d6996aa584520be75dd11
Here, we are testing that our store receives the correct action with our todo action creator.
We are using jest snapshots to have tests that are easier to maintain.
https://medium.com/@newyork.anthonyng/use-jest-snapshot-on-everything-4c5d4c88ca16
Read this article to learn more.
The nice thing is that everything about redux is just javascript. Action creators are no exception.
We can test this synchronous action without redux-mock-store.
https://gist.github.com/newyork-anthonyng/4edf37248bc78a352321ab2982aa12b5
Here, all we want to test is that the correct object is being returned by our action creator.

testing asynchronous actions
Let's take a look at an example of an asynchronous action that fetches information from a server.
https://gist.github.com/newyork-anthonyng/e3c24626b6c2b47c9cc2a7a930218af5 '
`fetchTodos` is an asynchronous action that is a bit more involved.
First, it dispatches another action, setFetch(true).
We will use this as a flag so that we can have some sort of loading animation when we are retrieving data.
Then, it retrieves data from a server.
When we receive the data, we will dispatch an action to add the data. This is similar to the synchronous action we looked at previously.
We will also dispatch setFetch(false) to indicate that we are done fetching information.
We also handle when the server fetch returns an error.

What do we want to test?
We want to make sure that all of our actions are getting called, and that they are called in the correct order.
This is where `redux-mock-store` shines.
https://gist.github.com/newyork-anthonyng/fe742439de461e69b246b254e711b5b0
The `redux-mock-store` API mimics that API of `redux`.
You dispatch actions the same way. There isn't a learning curve. '
`redux-mock-store` provides you with a `store.getActions()` method. This returns a list of actions that have been dispatched.

We can test this without `redux-mock-store`.
https://gist.github.com/newyork-anthonyng/c55d0baa28a1af02787aab5b52d5047b
We are using `jest.fn()` which allows us to create a mock dispatch function.
We pass this mock dispatch function into our asynchronous action, and are able to spy on it.
You can see how many times our mock function was called, and what arguments they were called with.
Using this, we can see a list of actions that have been dispatched.

Common mistakes
One of the most common mistakes I see is with `redux-thunk` and asynchronous action.
Note that your asynchronous action creators do not return Promises by default.
Note that the store.dispatch() method do not return Promises by default.
We are only able to do `store.dispatch(fetchTodos()).then` because our `fetchTodos` returns a Promise.
`store.dispatch` only returns what is returned by our action creator.

JS Standard
https://standardjs.com/
npm, Github, mongo use JS Standard.
A codebase should look like it was written by one person.
Things such as linters and style guides help with this.

Go through TODO comments inside source code

Create docco for redux
