import { Action } from '@ngrx/store';
import { type } from '../utils';
import { DataItem } from './data-item.model';

export const ActionTypes = {
  ADD_DATA: type('[Data] Add Data'),
  CLEAR_DATA: type('[Data] Clear Data')
};

export class AddDataAction implements Action {
  public type = ActionTypes.ADD_DATA;

  constructor(public payload: DataItem) { }
}

export class ClearDataAction implements Action {
  public type = ActionTypes.CLEAR_DATA;
}

export type Actions
  = AddDataAction
  | ClearDataAction;
