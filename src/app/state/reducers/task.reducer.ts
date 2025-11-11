import { createReducer, on } from '@ngrx/store';
import * as TaskActions from '../actions/task.actions';
import { initialState, TaskState } from '../models/TaskState';


export const taskReducer = createReducer<TaskState>(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
    error: null
  }))
);