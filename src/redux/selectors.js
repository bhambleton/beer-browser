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

export function getYeast(state) {
  return state.yeast;
}

export function getYeastCount(state) {
  return getYeast(state).length;
}

export function getMalts(state) {
  return state.yeast;
}

export function getMaltsCount(state) {
  return getMalts(state).length;
}
