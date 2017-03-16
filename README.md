# react-redux-auth0-plugin

Auth0 plugin for react-boilerplate-framework

This plugin provides authentication via Auth0 for React/Redux apps based on react-boilerplate.  It could be made
to work with other React/Redux frameworks and starter kits.  See react-boilerplate-framework for an example of how to
integrate it.

Features:

* Uses Nonce value stored in local storage to ensure the Auth0 result is processed only once and
  guard against a replay attack
* URL for Auth0 to redirect to configured in plugin
* Redux state includes login status and user profile
* Example ConnectedAuthControl component supporting login & logout, and access to state

