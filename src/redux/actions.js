export const RECEIVE_BEERS = 'RECEIVE_BEERS';
export const RECEIVE_STYLES = 'RECEIVE_STYLES';
export const RECEIVE_HOPS = 'RECEIVE_HOPS';
export const RECEIVE_MALTS = 'RECEIVE_MALTS';
export const RECEIVE_YEAST = 'RECEIVE_YEAST';
export const RECEIVE_MISC_INGREDIENTS = 'RECEIVE_MISC_INGREDIENTS';

export function receiveBeers(beers) {
  return { type: RECEIVE_BEERS, beers };
}

export function receiveStyles(styles) {
  return { type: RECEIVE_STYLES, styles };
}

export function receiveHops(hops) {
  return { type: RECEIVE_HOPS, hops };
}

export function receiveMalts(malts) {
  return { type: RECEIVE_MALTS, malts };
}

export function receiveYeast(yeast) {
  return { type: RECEIVE_YEAST, yeast };
}

export function receiveMiscIngredients(misc) {
  return { type: RECEIVE_MISC_INGREDIENTS, misc };
}
