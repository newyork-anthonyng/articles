import React, { Component } from 'react';

class Counter extends Component {
  constructor() {
    super();

    this.state = {
      count: 0,
    };
  }

  handleClick = () => {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1,
      };
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <p>
          {this.state.count % 2 === 0 ? 'Even' : 'Odd'}
        </p>

        <button onClick={this.handleClick}>Increase</button>
      </div>
    );
  }
}

export default Counter;
