import { createReducer, on } from "@ngrx/store";
import * as UserActions from '../actions/user.actions';
import { initialUserState, UserState } from "../models/UserState";

export const userReducer = createReducer<UserState>(
    initialUserState,

    on(UserActions.login, state => ({ ...state, loading: true, error: null})),

    on(UserActions.loginSuccess, (state, {user}) => ({
        ...state,
        currentUser: user,
        loading: false,
        error: null
    })),

    on(UserActions.RegistrationFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    })),

    on(UserActions.logout, () => initialUserState),

    on(UserActions.loadUserFromStorage, (state, {type}) => {
        const saved = localStorage.getItem('current_user');
        if(saved){
            return {
                ...state,
                currentUser: JSON.parse(saved)
            };
        }
        return state;
    })
);