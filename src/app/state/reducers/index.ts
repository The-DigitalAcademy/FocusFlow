import { ActionReducerMap } from '@ngrx/store';
import { listReducer } from './list.reducer';
import { ListState } from '../models/ListState';
import { UserState } from '../models/UserState';
import { userReducer } from './user.reducer';

export interface AppState {
  list: ListState;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  list: listReducer,
  user: userReducer
};