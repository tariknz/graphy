import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { createSelector} from 'reselect';

import * as fromData from './data/data.reducers';
import * as fromCanvas from './canvas/canvas.reducers';
import * as fromOptions from './options/options.reducers';

export interface State {
  data: fromData.State;
  canvas: fromCanvas.State;
  options: fromOptions.State;
};

const reducers = {
  data: fromData.reducer,
  canvas: fromCanvas.reducer,
  options: fromOptions.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getDataState = (state: State) => state.data;
export const getCanvasState = (state: State) => state.canvas;
export const getOptionsState = (state: State) => state.options;

export const getAllData = createSelector(getDataState, fromData.getAllData);
export const getAllCanvasPoints = createSelector(getCanvasState, fromCanvas.getAllPoints);
export const getLastCanvasPoint = createSelector(getCanvasState, fromCanvas.getLastPoint);
export const getOptions = createSelector(getOptionsState, fromOptions.getOptions);
export const getTotalDataItems = createSelector(getDataState, fromData.getTotalDataItems);
