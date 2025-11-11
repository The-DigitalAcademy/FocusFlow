import { Users } from './../../models/Users';
import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[Login Page] Login',
    props<{email: string, password: string}>()
);

export const loginSuccess = createAction(
    '[User API] Login success',
    props<{user: Users}>()
);

export const loginFailure = createAction(
    '[User API] login failure',
    props<{error: string}>()
);

export const logout = createAction('[Sidebar] logout');

export const loadUserFromStorage = createAction('[App] load user from storage');

export const saveUserToStorage = createAction('[App] save user to storage');

export const Registration = createAction(
    '[Registration Page] Register',
    props<{user: Users}>()
);

export const RegistrationSuccess = createAction(
    '[API Register] Registration Success',
    props<{user: Users}>()
);

export const RegistrationFailure = createAction(
    '[API Register] Registration Failure',
    props<{error: string}>()
);