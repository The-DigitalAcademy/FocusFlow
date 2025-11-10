import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { UserService } from "src/app/services/user.service";

@Injectable()
export class UserEffects{

    constructor(
        private actions: Actions,
        private userService: UserService
    ){}

    login = createEffect(() =>
        this.actions.pipe(
        ofType(UserActions.login),
        mergeMap(({ email, password }) =>
            this.userService.login(email, password).pipe(
            map(user => {
                this.userService.setCurrentUser(user); // ← SAVE HERE
                return UserActions.loginSuccess({ user });
            }),
            catchError(error => of(UserActions.loginFailure({ error: error.message })))
            )
        )
        )
    );

    loadUserFromStorage = createEffect(() =>
        this.actions.pipe(
        ofType(UserActions.loadUserFromStorage),
        map(() => {
            const user = this.userService.getCurrentUser();
            if (user) return UserActions.loginSuccess({ user });
            return UserActions.logout();
        })
        )
    );
}
