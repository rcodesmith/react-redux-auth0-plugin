import { fromJS } from 'immutable';

import { LOCATION_CHANGE } from 'react-router-redux';

import Immutable from "immutable";

import { LOGIN_SUCCESS, LOGIN_FAIL } from './constants';

const initialState = fromJS({
  loggedIn: false
});

function authControlsReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state;

    case LOGIN_SUCCESS:
      return state.set('profile', Immutable.fromJS(action.profile)).set('loggedIn', true);

    case LOGIN_FAIL:
      return state.remove('profile').set('loggedIn', false);

    default:
      return state;
  }
}

export default authControlsReducer;
