import {IModelState} from "../../common/model-state";

export interface IThingModelStates {
  name: IModelState,
  category: IModelState,
  type: IModelState,
  vendor: IModelState,
  description: IModelState,
  department: IModelState,
  user: IModelState,
  assetId: IModelState,
  valid: boolean
}