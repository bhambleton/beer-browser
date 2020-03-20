export function getBeers(state) {
  return state.beers;
}

export function getBeerCount(state) {
  return getBeers(state).length;
}

export function getStyles(state) {
  return state.styles;
}

export function getStylesCount(state) {
  return getStyles(state).length;
}
