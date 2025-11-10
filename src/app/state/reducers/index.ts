import { ActionReducerMap } from '@ngrx/store';
import { listReducer } from './list.reducer';
import { ListState } from '../models/ListState';

export interface AppState {
  list: ListState;
}

export const reducers: ActionReducerMap<AppState> = {
  list: listReducer 
};