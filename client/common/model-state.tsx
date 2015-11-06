import {ReactElement} from 'react';
import {ElementValidity} from "./element-validity";

export interface IModelState {
  modelPropertyElement: ReactElement<any>,
  modelProperty: string,
  valueHistory: Array<any>,
  value: any,
  validity: ElementValidity,
  hasChanged: boolean,
  dirty: boolean
}

export function createDefaultModelState(): IModelState {
  return {
    modelPropertyElement: undefined,
    modelProperty: undefined,
    valueHistory: [],
    value: undefined,
    validity: undefined,
    hasChanged: false,
    dirty: false
  };
}