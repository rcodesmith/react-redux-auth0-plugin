
import Auth0Lock from 'auth0-lock'

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';

import { delay } from 'redux-saga'

import { LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL } from './constants';

let lock = undefined;

export type Auth0LoginConfig = {
  clientId: string,     // Client ID assigned from Auth0
  domain: string,       // Domain assigned from Auth0
  redirectUrl: string,  // URL to redirect to from Auth0 after login
};

let auth0Domain = undefined;

export function initAuth0Lock(config: Auth0LoginConfig) {
  const { clientId, domain, redirectUrl } = config;

  auth0Domain = domain;
  lock = new Auth0Lock(clientId, domain, {
    auth: {
      redirectUrl,
      responseType: 'token',
    }
  });

  lock.on('authenticated', (authResult) => {
    // Verify the previously stored nonce against what is passed in from Auth0 in the redirect
    const storedRedirNonce = localStorage.getItem('login.redirNonce');
    if(storedRedirNonce != authResult.state) {
      console.log(`Received nonce ${authResult.state} does not match stored ${storedRedirNonce}.  Ignoring auth result`);
      return;
    }

    localStorage.setItem('login.idToken', authResult.idToken);
    localStorage.setItem('login.accessToken', authResult.accessToken);
  });
}

/**
 * From http://stackoverflow.com/a/1349426
 * @param length
 * @returns {string} Random string with length characters
 */
function randomString(length) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function* processLoginAction(action) : Generator<any, void, void> {
  // log.info("processLogin()");
  const { nextLoc } = action;
  const loginRedirNonce = randomString(20);
  localStorage.setItem('login.nextLoc', nextLoc);
  localStorage.setItem('login.redirNonce', loginRedirNonce);
  //log.info({loginRedirNonce}, "Stored redirNonce");
  try {
    const lockOverrideOptions = {
      auth: {
        params: {state: loginRedirNonce},
      }
    };

    const authResults = yield call(() => lock.show(lockOverrideOptions));
  } catch (error) {
    //log.error({error}, "Error");
    yield put({type: LOGIN_FAIL});
  }
}

function* processLogoutAction(): Generator<any, void, void> {
  localStorage.removeItem('login.idToken');
  localStorage.removeItem('login.accessToken');
  window.location.assign(`https://${auth0Domain}/v2/logout?returnTo=${encodeURIComponent(window.location.href)}`);
}

function* loginRequestSaga() : Generator<any, void, void> {
  //log.info("login saga");

  const watcher = yield takeLatest(LOGIN, processLoginAction);

}

function getUserProfile(accessToken) {
  return new Promise(function(resolve, reject) {
    lock.getUserInfo(accessToken, function(error, profile) {
      if (error) {
        reject(error);
        return;
      }

      resolve(profile);
    });
  });
}

/**
 * Login result saga.
 * This saga checks local storage for the access token and id token, set when a redirect from
 * Auth0 occurs after a successful login.
 * If found, this saga processes the login result (processLoginResult saga).
 * If not found, the saga will retry N times with a delay.
 */
function* loginResultSaga() : Generator<any, void, void> {
  //log.info("loginResult saga started");

  for(let i = 0; i < 5; i++) {
    const accessToken = localStorage.getItem('login.accessToken');
    const idToken = localStorage.getItem('login.idToken');

    if (accessToken) {
      yield call(processLoginResult, accessToken, idToken);
    } else {
      yield call(delay, 500);
    }
  }
}

/**
 * Process the login result, issuing the LOGIN_SUCCESS or LOGIN_FAIL actions
 * Finally, await for and process a LOGOUT action.
 *
 * @param accessToken
 * @param idToken
 */
function* processLoginResult(accessToken, idToken) : Generator<any, void, void> {
  const nextLoc = localStorage.getItem('login.nextLoc');

  localStorage.removeItem('login.redirNonce');
  localStorage.removeItem('login.nextLoc');

  try {
    const profile = yield call(getUserProfile, accessToken);
    yield put({type: LOGIN_SUCCESS, profile: profile, idToken, accessToken});
  } catch (error) {
    yield put({type: LOGIN_FAIL, error:error});
  }

  const watcher = yield takeLatest(LOGOUT, processLogoutAction);
}

export default [
  loginRequestSaga,
  loginResultSaga
];
