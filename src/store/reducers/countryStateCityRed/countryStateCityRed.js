import {COUNTRIES, STATES,CITIES,REFRESH_CITY} from '../../actions/types';

const initialState = {countries: [], states: [], cities: []};

export default function countryStateCityRed(state = initialState, action) {
  switch (action.type) {
    case COUNTRIES:
      return {...state, countries: [...action.payload]};
    case STATES:
      return {...state, states: [...action.payload]};
    case CITIES:
      return {...state, cities: [...action.payload]};
    case "CLEAR_CITY":
      return {...state, cities: []};
    default:
      return state;
  }
}
