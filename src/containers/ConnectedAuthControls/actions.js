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

export function logout() {
  return {
    type: LOGOUT,
  };
}
