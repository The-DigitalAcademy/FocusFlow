import { createReducer, on } from "@ngrx/store";
import * as ListActions from '../actions/list.actions';
import { initialState, ListState } from "../models/ListState";
import { Lists } from "src/app/models/Lists";

export const listReducer = createReducer<ListState>(
    initialState,

    on(ListActions.loadLists, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(ListActions.loadListsSuccess, (state, {lists}) => ({
        ...state,
        lists,
        loading: false
    })),

    on(ListActions.loadListsFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    })),

    on(ListActions.selectList, (state, {listId}) => ({
        ...state,
        selectedListId: listId
    })),

    on(ListActions.setFilter, (state, {category}): ListState => ({
        ...state,
        filter: category
    })),

    on(ListActions.updateListSuccess, (state, { list }) => ({
        ...state,
        lists: state.lists.map(l => l.id === list.id ? list : l)
    })),

    on(ListActions.updateListFailure, (state, { error }) => ({
        ...state,
        error
    })),

    on(ListActions.removeList, (state) => ({
        ...state,
        loading: true
    })),

    on(ListActions.removeListFailure, (state, {error}) => ({
        ...state,
        error,
        loading: false
    })),

    on(ListActions.removeListSuccess, (state, {list}) => ({
        ...state,
        lists: state.lists.filter(l => l.id !== list.id),
        loading: false
    })),

    on(ListActions.updateTaskList, (state, {id}) => ({
        ...state,
        loading: true,
        lists: state.lists.map(l =>
            l.id === state.selectedListId
            ? {
                ...l,
                taskIDs: l.tasksID.filter(task => task.id !== id)
                }
            : l
        )
    })),

    on(ListActions.updateTaskListSuccess, (state, { taskId }) => ({
    ...state,
    loading: false
    })),
    
    on(ListActions.updateTaskListFailure, (state, {error}) => ({
        ...state,
        error
    }))
);