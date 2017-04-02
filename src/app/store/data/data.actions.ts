import { Action } from '@ngrx/store';
import { type } from '../utils';
import { DataItem } from './data-item.model';

export const ActionTypes = {
  ADD_DATA: type('[Data] Add Data'),
};

export class AddDataAction implements Action {
  public type = ActionTypes.ADD_DATA;

  constructor(public payload: DataItem) { }
}

export type Actions
  = AddDataAction;
