import { GraphOptions } from './options.model';
import { AxisOptions } from './axis-options.model';
import { SetOptionsAction, Actions, ActionTypes } from './options.actions';

export interface State {
  options: GraphOptions;
}

export const initialState: State = {
  options: getDefaultOptions(),
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SET_OPTIONS:
      return {
        options: action.payload
      };
    default:
      return state;
  }
}

export const getOptions = (state: State) => state.options;

function getDefaultOptions(): GraphOptions {
    return {
      x: { min: 0, max: 10000, ticks: 1000 },
      y: { min: 0, max: 10000, ticks: 1000 }
    };
}
