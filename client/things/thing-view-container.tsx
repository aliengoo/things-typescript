import * as React from 'react';
import {connect} from 'react-redux';
import {Thing} from "./models/thing";
import {IThingModelStates} from "./models/thing-model-states";
import {IAppStore} from "../store/app-store";
import {IThingStoreContainer} from "./models/thing-store-container";

export interface IThingViewContainerProps {
  fetching: boolean,
  editing: boolean,
  thing: Thing,
  thingPriorState: Thing,
  thingModelsState: IThingModelStates,
  thingWasDeleted: boolean,
  thingWasUpdated: boolean,
  err: string
}

class ThingViewContainer extends React.Component<IThingViewContainerProps, any> {
  render(): JSX.Element {
    return (
      <div>
        Thing
      </div>
    );
  }
}

function select(appStore: IAppStore): IThingViewContainerProps {
  var thingStoreContainer: IThingStoreContainer = appStore.thing;

  return {
    fetching: thingStoreContainer.fetching,
    editing: thingStoreContainer.editing,
    thing: thingStoreContainer.thing,
    thingModelsState: thingStoreContainer.thingModelStates,
    thingPriorState: thingStoreContainer.thingPriorState,
    thingWasDeleted: thingStoreContainer.thingWasDeleted,
    thingWasUpdated: thingStoreContainer.thingWasDeleted,
    err: appStore.err
  };
}

export default connect(select)(ThingViewContainer);