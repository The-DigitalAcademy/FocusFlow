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