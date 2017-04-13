import { DataItem } from './data-item.model';
import { Actions, ActionTypes, AddDataAction } from './data.actions';

export interface State {
  items: DataItem[];
}

export const initialState: State = {
  items: [],
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.CLEAR_DATA:
      return {
        items: []
      };
    case ActionTypes.ADD_DATA:
      return {
        items: [...state.items, (action as AddDataAction).payload]
      };
    default:
      return state;
  }
}

export const getAllData = (state: State) => state.items;
export const getTotalDataItems = (state: State) => state.items.length;
