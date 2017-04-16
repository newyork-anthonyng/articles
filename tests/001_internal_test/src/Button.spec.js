import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

it('should toggle the state.disabled property when clicking on first button', () => {
  const wrapper = shallow(<Button />);

  const firstButton = wrapper.find('button').at(0);

  firstButton.simulate('click');
  expect(wrapper.state().disabled).toEqual(true);

  firstButton.simulate('click');
  expect(wrapper.state().disabled).toEqual(false);
});
