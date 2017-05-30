import reducer from './recipe';

describe('Without snapshots 😥', () => {
  it('should return initial state', () => {
    const expected = {
      ingredients: [],
      name: '',
    };

    expect(reducer(undefined, {})).toEqual(expected);
  });

  it('should handle ADD_INGREDIENT', () => {
    const action = {
      type: 'ADD_INGREDIENT',
      ingredient: 'Papaya',
    };
    const expected = {
      ingredients: ['Papaya'],
      name: '',
    };

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle UPDATE_NAME', () => {
    const action = {
      type: 'UPDATE_NAME',
      name: 'Salad',
    };
    const expected = {
      ingredients: [],
      name: 'Salad',
    };

    expect(reducer(undefined, action)).toEqual(expected);
  });
});

describe('With snapshots 🎉', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle ADD_INGREDIENT', () => {
    const action = {
      type: 'ADD_INGREDIENT',
      ingredient: 'Papaya',
    };

    expect(reducer(undefined, action)).toMatchSnapshot();
  });

  it('should handle UPDATE_NAME', () => {
    const action = {
      type: 'UPDATE_NAME',
      name: 'Salad',
    };

    expect(reducer(undefined, action)).toMatchSnapshot();
  });
});
