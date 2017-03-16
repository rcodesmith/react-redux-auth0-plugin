/**
 * @flow
 */

import { initAuth0Lock } from './sagas';

import type { Auth0LoginConfig } from './sagas';

import reducer from './reducer';

export function init(config: Auth0LoginConfig) {
  initAuth0Lock(config);
}

export function postAppInitHook(config: Auth0LoginConfig, app) {

}

/**
 * Get saga modules that should be included in each route
 */
export function getGlobalSagaModules(config) {
  return [import('./sagas')];
}

/**
 * Get reducers that should be included in every route
 *
 * TODO: Make state container name less generic
 *
 * @param config
 * @returns {{login: authControlsReducer}}
 */
export function getGlobalReducers(config) {
  return {
      login: reducer
  }
}

/**
 * Example of adding a route
 */
export function getRoutes(config, loadModule, errorLoading, injectSagas) {
  return [
    // {
    //   path: '/login',
    //   name: 'Login',
    //   // onEnter: requireAuth,
    //   getComponent(nextState, cb) {
    //     const importModules = Promise.all([
    //     import('containers/ConnectedAuthControls/index'),
    //     import('containers/ConnectedAuthControls/sagas'),
    //   ]);
    //
    //     const renderRoute = loadModule(cb);
    //
    //     importModules.then(([component, sagas]) => {
    //       injectSagas(sagas.default);
    //       try {
    //         renderRoute(component);
    //       } catch(err) {
    //         log.error({err}, "Error");
    //       }
    //     });
    //
    //     importModules.catch(errorLoading);
    //   },
    // }
  ];
}
