import { createAction, props } from '@ngrx/store';
import { Tasks } from 'src/app/models/Tasks';

export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task API] Load Tasks Success',
  props<{ tasks: Tasks[] }>()
);

export const loadTasksFailure = createAction(
    '[Task API] Load Tasks Failure',
    props<{ error: string}>()
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ payload: Omit<Tasks, 'id'> }>()
);

export const addTaskSuccess = createAction(
  '[Task API] Add Task Success',
  props<{ task: Tasks }>()
);

export const addTaskFailure = createAction(
  '[Task API] Add Task Failure',
  props<{error: string}>()
);

export const removeTask = createAction(
  '[Task] Remove Task',
  props<{ task: Tasks}>()
);

export const removeTaskSuccess = createAction(
  '[Task API] Remove Task Success',
  props<{task: Tasks}>()
);

export const removeTaskFailure = createAction(
  '[Task API] Remove Task Failure',
  props<{error: string}>()
);