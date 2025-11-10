import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListState } from '../models/ListState';
import { selectCurrentUser } from './user.selectors';

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