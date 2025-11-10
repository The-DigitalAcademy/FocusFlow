import { ListService } from 'src/app/services/list.service';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ListActions from '../actions/list.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';


@Injectable()
export class ListEffects {

    constructor(
        private actions: Actions,
        private listService: ListService
    ){}

    loadLists = createEffect(() => 
        this.actions.pipe(
            ofType(ListActions.loadLists),
            mergeMap(() => 
                this.listService.getAll().pipe(
                    map(lists => ListActions.loadListsSuccess({lists})),
                    catchError(error =>
                        of(ListActions.loadListsFailure({error: error.message}))
                    )
                ))
        ));
}