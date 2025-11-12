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
  })),

  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),

  on(TaskActions.removeTask, (state) => ({
    ...state,
    loading: true
  })),

  on(TaskActions.removeTaskSuccess, (state, {task}) => ({
    ...state,
    loading: false,
    tasks: state.tasks.filter(t => t.id !== task.id)
  })),

  on(TaskActions.removeTaskFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  }))
);