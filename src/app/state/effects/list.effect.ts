import { removeList } from './../actions/list.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ListService } from 'src/app/services/list.service';
import * as ListActions from '../actions/list.actions';
import * as TaskActions from '../actions/task.actions';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../selectors/user.selectors';
import { selectSelectedList } from '../selectors/list.selectors';

@Injectable()
export class ListEffects {

  constructor(
    private actions$: Actions,
    private listService: ListService,
    private store: Store
  ) {}

  loadLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.loadLists),
      withLatestFrom(this.store.select(selectCurrentUser)),
      mergeMap(([_, user]) => {
        if (!user) {
          return of(ListActions.loadListsFailure({ error: 'No user logged in' }));
        }
        return this.listService.getUserLists(user.id).pipe(
          map(lists => ListActions.loadListsSuccess({ lists })),
          catchError(error => of(ListActions.loadListsFailure({ error: error.message })))
        );
      })
    )
  );

  updateListAfterTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTaskSuccess),
      withLatestFrom(this.store.select(selectSelectedList)),
      mergeMap(([{ task }, currentList]) => {
        if (!currentList) return of();

        const updatedTasks = [...currentList.tasksID, task];
        const updatedList = { ...currentList, tasksID: updatedTasks };

        return this.listService.updateList(updatedList).pipe(
          map(() => ListActions.updateListSuccess({ list: updatedList })),
          catchError(err => of(ListActions.updateListFailure({ error: err.message })))
        );
      })
    )
  );

    removeList$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ListActions.removeList),
            mergeMap(({list}) => 
              this.listService.deleteList(list.id).pipe(
                 map(() => ListActions.removeListSuccess({list})),
                 catchError((err) => of(ListActions.removeListFailure({error: err})))
             )
         )
        )
    )

    updateList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ListActions.updateTaskList),
            withLatestFrom(this.store.select(selectSelectedList)),
            mergeMap(([_, currentList]) => {
                if (!currentList) return of();

                return this.listService.updateList(currentList).pipe(
                    map(() => ListActions.updateListSuccess({ list: currentList })),
                    catchError(err => of(ListActions.updateListFailure({ error: err.message })))
                );
            })
        )
    )
}