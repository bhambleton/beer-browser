import { combineReducers } from 'redux';

import {
  RECEIVE_BEERS,
  RECEIVE_STYLES
} from './actions';

function beersReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_BEERS:
      return [
        ...state,
        ...action.beers
      ];
    default:
      return state;
  }
}

function stylesReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_STYLES:
      return [
        ...action.styles,
        ...state
      ];
    default:
      return state;
  }
}

function ingredientsReducer(state = { hops: [], malts: [], yeasts: [], misc: [] }, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  beers: beersReducer,
  styles: stylesReducer,
  ingredients: ingredientsReducer
});

export default rootReducer;
