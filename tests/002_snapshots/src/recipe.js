const initialState = {
  ingredients: [],
  name: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: state.ingredients.concat(action.ingredient),
      };
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};

export default reducer;
