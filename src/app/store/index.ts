import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { createSelector} from 'reselect';

import * as fromData from './data/data.reducers';

export interface State {
  data: fromData.State;
};

const reducers = {
  search: fromData.reducer,
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

export const getAllData = createSelector(getDataState, fromData.getAllData);
