import { Action } from '@ngrx/store';
import { type } from '../utils';
import { GraphOptions } from './options.model';

export const ActionTypes = {
  SET_OPTIONS: type('[Options] Set Options'),
};

export class SetOptionsAction implements Action {
  public type = ActionTypes.SET_OPTIONS;

  constructor(public payload: GraphOptions) { }
}

export type Actions
  = SetOptionsAction;
