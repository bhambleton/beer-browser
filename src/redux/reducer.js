import { combineReducers } from 'redux';

import {
  RECEIVE_BEERS,
  RECEIVE_STYLES,
  RECEIVE_YEAST,
  RECEIVE_MALTS
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

function maltsReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_MALTS:
      return [
        ...state,
        ...action.malts
      ];
    default:
      return state;
  }
}

function yeastReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_YEAST:
      return [
        ...state,
        ...action.yeast
      ];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  beers: beersReducer,
  styles: stylesReducer,
  yeast: yeastReducer,
  malts: maltsReducer
});

export default rootReducer;
