import { Actions, ActionTypes } from './canvas.actions';
import { CanvasPos } from './canvas-pos.model';

export interface State {
  items: CanvasPos[];
  lastPoint: CanvasPos;
}

export const initialState: State = {
  items: [],
  lastPoint: undefined,
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.ADD_POINT:
      return {
        items: [...state.items, action.payload],
        lastPoint: action.payload,
      };
    default:
      return state;
  }
}

export const getAllPoints = (state: State) => state.items;
export const getLastPoint = (state: State) => state.lastPoint;
