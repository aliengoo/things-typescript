// used by the thing container part of the store

import {Thing} from "./thing";
import {IThingModelStates} from "./thing-model-states";
import {IThingViewContainerProps} from "../thing-view-container";
import {createDefaultModelState} from '../../common/model-state';

export interface IThingStoreContainer {

  // flags for updates broadcast by other users
  thingWasDeleted: boolean;

  // flags for deletes broadcast by other users
  thingWasUpdated: boolean;

  // server fetch in progress
  fetching: boolean,

  // the current things is being edited
  editing: boolean,

  // The thing being viewed
  thing?: Thing,

  // The thing being edited prior state
  thingPriorState?: Thing,

  // model states for each thing property
  thingModelStates: IThingModelStates
}

export function createDefaultThingStoreContainer(): IThingStoreContainer {

  let thingModelStates: IThingModelStates = {
    name: createDefaultModelState(),
    category: createDefaultModelState(),
    type: createDefaultModelState(),
    vendor: createDefaultModelState(),
    description: createDefaultModelState(),
    department: createDefaultModelState(),
    user: createDefaultModelState(),
    assetId: createDefaultModelState(),
    valid: false
  };

  return {
    thingWasDeleted: false,
    thingWasUpdated: false,
    fetching: false,
    editing: false,
    thing: undefined,
    thingPriorState: undefined,
    thingModelStates: thingModelStates
  };
}