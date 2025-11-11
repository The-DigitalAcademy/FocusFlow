import { ListService } from 'src/app/services/list.service';
import { catchError, mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ListActions from '../actions/list.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { selectCurrentUser } from '../selectors/user.selectors';
import { Store } from '@ngrx/store';


@Injectable()
export class ListEffects {

    constructor(
        private actions: Actions,
        private listService: ListService,
        private store: Store
    ){}

    loadLists = createEffect(() => 
        this.actions.pipe(
            ofType(ListActions.loadLists),
            withLatestFrom(this.store.select(selectCurrentUser)),
            mergeMap(([action, user]) => {
                if (!user) {
                    return of(ListActions.loadListsFailure({ error: 'No user logged in' }));
                }
                return this.listService.getUserLists(user.id).pipe(
                    map(lists => ListActions.loadListsSuccess({ lists })),
                    catchError(error => of(ListActions.loadListsFailure({ error: error.message })))
                );
            })
        ));
}