import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Counter from './counter';

describe('Without snapshots 😥', () => {
  it('should render an h1 tag', () => {
    const wrapper = shallow(
      <Counter />
    );

    expect(wrapper.find('h1').length).toEqual(1);
    expect(wrapper.find('h1').at(0).html()).toEqual('<h1>0</h1>');
  });

  it('should render a button', () => {
    const wrapper = shallow(
      <Counter />
    );

    expect(wrapper.find('button').length).toEqual(1);
  });

  it('should update text when clicking on button', () => {
    const wrapper = shallow(
      <Counter />
    );

    const button = wrapper.find('button');
    button.simulate('click');

    expect(wrapper.find('h1').html()).toEqual('<h1>1</h1>');
  });
});

describe('With snapshots 🎉', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Counter />
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should update text when clicking on button', () => {
    const wrapper = shallow(
      <Counter />
    );

    const button = wrapper.find('button');
    button.simulate('click');

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
