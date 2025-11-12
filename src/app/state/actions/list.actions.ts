import { createAction, props } from "@ngrx/store";
import { Lists } from "src/app/models/Lists";

export const loadLists = createAction('[List Page] Load Lists');

export const loadListsSuccess = createAction(
    '[List API] Load Lists Success',
    props<{lists: Lists[]}>()
);

export const loadListsFailure = createAction(
    '[List API] Load List Failure',
    props<{error: string}>()
);

export const selectList = createAction(
    '[List Page] Select List',
    props<{listId: string}>()
);

export const setFilter = createAction(
    '[Sidebar] Set filter',
    props<{ category: string | null}>()
);

export const updateListSuccess = createAction(
    '[List API] Update list Success',
    props<{list: Lists}>()
);

export const updateListFailure = createAction(
    '[List API] Update List Failure',
    props<{error: string}>()
);

export const removeList = createAction(
  '[List] Remove List',
  props<{list: Lists}>()
);

export const removeListSuccess = createAction(
  '[List API] Remove List Success',
  props<{list: Lists}>()
);

export const removeListFailure = createAction(
  '[List API] Remove List Failure',
  props<{error: string}>()
);

export const updateTaskList = createAction(
    '[Update Task List] Update task list',
    props<{id: number}>()
);

export const updateTaskListSuccess = createAction(
    '[List API] Update task list sucess',
    props<{ taskId: string}>()
);

export const updateTaskListFailure = createAction(
    '[List API] Update task list failure',
    props<{error:string}>()
);

