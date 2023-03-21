import konnect from '../../config/konnect';
import {COUNTRIES, STATES,CITIES} from './types';

export const get_countries = () => async dispatch => {
  try {
    const res = await konnect.post('/v1/common/receive/countries');
    // const res = await konnect.get('/v1/campaigns/countries');
    const updatedCountriesList = res.data.message.map(item => {
      return {label: item.name, value: item.code1};
    });

    dispatch({
      type: COUNTRIES,
      payload: updatedCountriesList,
    });
  } catch (err) {
    console.log(err);
  }
};

export const get_states = country_code => async dispatch => {
  try {
    const res = await konnect.post('/v1/common/receive/states', {country_code});
    const updatedStatesList = res.data.message.map(item => {
      return {label: item.name, value: item.isoCode};
    });
    dispatch({
      type: STATES,
      payload: updatedStatesList,
    });
  } catch (err) {
    console.log(err);
  }
};

export const get_cities = (country_code, state_code) => async dispatch => {
  try {
    const res = await konnect.post('/v1/common/receive/cities', {
      country_code,
      state_code,
    });
    const updatedCitiesList = res.data.message.map(item => {
      return {label: item.name, value: item.name};
    });
    dispatch({
      type: CITIES,
      payload: updatedCitiesList,
    });
  } catch (err) {
    console.log(err);
  }
};
