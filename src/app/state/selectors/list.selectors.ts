import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListState } from '../models/ListState';

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