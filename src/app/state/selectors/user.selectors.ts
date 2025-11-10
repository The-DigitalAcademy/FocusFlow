import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../models/UserState";

export const selectUserFeature = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(
    selectUserFeature,
    state => state.currentUser
);

export const selectIsLoggedIn = createSelector(
    selectCurrentUser,
    user => !!user
);

export const selectUserName = createSelector(
    selectCurrentUser,
    user => user?.name || 'Guest'
);