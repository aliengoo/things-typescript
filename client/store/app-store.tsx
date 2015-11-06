import {Thing} from "../things/models/thing";
import {IThingStoreContainer, createDefaultThingStoreContainer} from "../things/models/thing-store-container";
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { compose, createStore, applyMiddleware, Middleware, Store } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import rootReducer from '../reducers/root-reducer';

export interface IAppStore {
  err: any;
  thing: IThingStoreContainer
}

const InitialState: IAppStore = {
  err: undefined,
  thing: createDefaultThingStoreContainer()
};

const loggerMiddleware: Middleware = createLogger();

let finalCreateStore: any;

if (document.getElementById("react-container").hasAttribute("debug")) {
  // include debug information in page
  finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )(createStore);
}

let store:Store;

export default function getStore(): Store {
  if (!store) {
    store = finalCreateStore(rootReducer, InitialState);
  }
  return store;
};






