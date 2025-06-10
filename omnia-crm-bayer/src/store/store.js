import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

const defaultState = {
  sheet: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_SHEET_DATA":
      return { ...state, sheet: action.payload };
    default:
      return state;
  }
};

export const store = createStore(reducer, composeWithDevTools());