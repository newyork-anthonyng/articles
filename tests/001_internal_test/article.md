# Testing React Component's State

We unit test normal JavaScript functions to make sure they work as intended. For a certain input, it should return the correct output.

```js
// sum.js
function sum(a, b) {
  return a + b;
};

// sum.spec.js
it('should return correct sum for 2 + 3', () => {
  expect(sum(2, 3)).toEqual(5);
});
```

This is a good test. It tests what we care about; that we receive the correct answer. We are not concerned about the internal implementation of the sum function. Imagine if we had this implementation of the sum function.

```js
// sum.js
let sumArray = [];

function sum() {
  const args = Array.prototype.slice.call(arguments);
  sumArray = sumArray.concat(args);

  const result = sumArray((prev, current) => {
    return prev + current;
  }, 0);

  sumArray = [];
  return result;
}

// sum.spec.js
it('should return correct sum for 2 + 3', () => {
  expect(sum(2, 3)).toEqual(5);
});
```

The same test we had before still works for this new implementation.

You can imagine a bad test to have tested the internal implementation of the function. Take a look at the following test.

```js
// sum.spec.js
it('should reset the sumArray after every call', () => {
  expect(sumArray.length).toEqual(0);
  sum(2, 3);
  expect(sumArray.length).toEqual(0);
});
```

This is a bad test because we're testing something that we don't care about.

This is how we should think about testing React components as well. Imagine we have this basic React Component.

```jsx
class Button extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
    };
  }

  handleClick = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          First Button
        </button>
        <button disabled={this.state.disabled}>
          Second Button
        </button>
      </div>
    );
  }
}
```

In this basic component, a button will toggle its disabled state when I click the other button. A good test for this might be:

```jsx
// using enzyme

it('should toggle second button's disabled state when clicking on first button', () => {
  const wrapper = shallow(<Button />);

  const firstButton = wrapper.find('button').at(0);
  const secondButton = wrapper.find('button').at(1);

  firstButton.simulate('click');
  expect(secondButton.props().disabled).toEqual(true);

  firstButton.simulate('click');
  expect(secondButton.props().disabled).toEqual(false);
});
```

A bad test to write is to test how we are implementing this logic. In our sum function example, an implementation detail was the array we had. In our React Component example, the implementation detail is the state we are using.

```jsx
// using enzyme

it('should toggle the state.disabled property when clicking on first button', () => {
  const wrapper = shallow(<Button />);

  const firstButton = wrapper.find('button').at(0);

  firstButton.simulate('click');
  expect(wrapper.state().disabled).toEqual(true);

  firstButton.simulate('click');
  expect(wrapper.state().disabled).toEqual(false);
});
```

Again, this is a bad test because we could refactor our Component to this:

```jsx
class Button extends React.Component {
  constructor() {
    super();

    this.disabled = false;
  }

  handleClick = () => {
    this.disabled = !this.disabled;
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>First Button</button>
        <button disabled={this.disabled}>Second Button</button>
      </div>
    );
  }
}
```

Our component is still doing what we want, but our new test is now failing.

Remember that React components are functions. You pass it inputs (as props) and you receive an output (from its render function). The component's state is an implementation detail.

Before you test a component's state, step back and see if you're testing the right thing.
