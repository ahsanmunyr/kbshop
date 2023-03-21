import {MARKET_SELECTED} from '../../actions/types';

const initialStateOfMarket = {
  type: 'Category',
};

export function categoryType(state = initialStateOfMarket, action) {
  switch (action.type) {
    case MARKET_SELECTED:
      return action.payload;
    case "resetMarketTabs":
    return {type:'Category'}
    default:
      return state;
  }
}
