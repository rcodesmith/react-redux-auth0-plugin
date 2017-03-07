/**
 * @flow
 */

import { initAuth0Lock } from './sagas';

import type { Auth0LoginConfig } from './sagas';

export function init(config: Auth0LoginConfig) {
  initAuth0Lock(config);
}

/**
 * Get saga modules that should be included in each route
 */
export function getGlobalSagaModules(config) {
  return [import('./sagas')];
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
