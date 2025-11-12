import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListState } from '../models/ListState';
import { selectCurrentUser } from './user.selectors';
import { TaskState } from '../models/TaskState';
import { Lists } from 'src/app/models/Lists';

const selectTaskState = (state: any) => state.task as TaskState;

export const selectListFeature = createFeatureSelector<ListState>('list');

export const selectAllLists = createSelector(
  selectListFeature,
  (state) => state?.lists ?? []
);

export const selectLoading = createSelector(
  selectListFeature,
  (state) => state?.loading ?? false
);

export const selectFilter = createSelector(
  selectListFeature,
  (state) => state?.filter ?? null
);

export const selectFilteredLists = createSelector(
  selectAllLists,
  selectFilter,
  (lists, filter) => {
    if (!filter) return lists;
    return lists.filter(list => list.category === filter);
  }
);

export const selectSelectedList = createSelector(
  selectAllLists,
  selectListFeature,
  (lists, state) => lists.find(l => l.id === state?.selectedListId) || null
);

export const selectUserCategories = createSelector(
  selectListFeature,
  (state) => {
    const categories = new Set<string>();
    state.lists.forEach(list => {
      if(list.category) categories.add(list.category);
    });
    return Array.from(categories).sort()
  }
);

export const selectUserLists = createSelector(
  selectAllLists,
  selectCurrentUser,
  (lists, user) => {
    if (!user) return [];
    return lists.filter(list => list.userId === user.id);
  }
);

export const selectFilteredUserLists = createSelector(
  selectUserLists,
  selectFilter,
  (lists, filter) => {
    if (!filter) return lists;
    return lists.filter(list => list.category === filter);
  }
);

export const selectFilteredUserListsWithTasks = createSelector(
  selectFilteredUserLists,
  selectTaskState,
  (lists: Lists[], taskState: TaskState): Lists[] => {
    const taskMap = new Map<string, any>();
    taskState.tasks.forEach(t => taskMap.set(String(t.id), t));

    const getId = (entry: any): string | null => {
      if (entry === null || entry === undefined) return null;
      if (typeof entry === 'string') return entry;
      if (typeof entry === 'number') return String(entry);
      if (typeof entry === 'object' && 'id' in entry) return String(entry.id);
      return null;
    };

    return lists.map(list => {
      const validEnrichedTasks: any[] = [];

      list.tasksID.forEach(entry => {
        const id = getId(entry);
        if (!id) return;

        const fullTask = taskMap.get(id);
        if (fullTask) {
          validEnrichedTasks.push(fullTask);
        }
        // Invalid/missing task → silently removed
      });

      return { ...list, tasksID: validEnrichedTasks };
    });
  }
);