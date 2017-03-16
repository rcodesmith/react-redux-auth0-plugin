import {
  LOGIN,
  LOGOUT
} from './constants';

export function login(nextLoc) {
  return {
    type: LOGIN,
    nextLoc,
  };
}

/**
 * Log the current user out, clearing out any credentials
 * @returns {{type}}
 */
export function logout() {
  return {
    type: LOGOUT,
  };
}
