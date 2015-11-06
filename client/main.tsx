/// <reference path="../typings/tsd.d.ts"/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import * as ReactRouter from 'react-router';
import getStore from './store/app-store';
import ThingViewContainer from "./things/thing-view-container";

let store = getStore();

const reactContainer: Element = document.getElementById('react-container');
const hasDebug: boolean = reactContainer.hasAttribute("debug");

var providerRoot: JSX.Element = (
  <Provider store={store}>
    <ReactRouter.Route handler>
      <ReactRouter.Route path="/" component={ThingViewContainer}/>
    </ReactRouter.Route>
  </Provider>
);

if (hasDebug) {
  ReactDOM.render(
    <div>
      {providerRoot}
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor}/>
      </DebugPanel>
    </div>
    , reactContainer);
} else {
  ReactDOM.render(
    <div>
      {providerRoot}
    </div>
    , reactContainer);
}