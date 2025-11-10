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