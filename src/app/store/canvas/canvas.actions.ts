import { Action } from '@ngrx/store';
import { type } from '../utils';
import { CanvasPos } from './canvas-pos.model';

export const ActionTypes = {
  ADD_POINT: type('[Canvas] Add Point'),
};

export class AddPointAction implements Action {
  public type = ActionTypes.ADD_POINT;

  constructor(public payload: CanvasPos) { }
}

export type Actions
  = AddPointAction;
