import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from 'src/app/services/task.service';
import * as TaskActions from '../actions/task.actions';
import * as ListActions from '../actions/list.actions';
import { catchError, map, mergeMap, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { Store } from '@ngrx/store';
import { selectAllLists, selectSelectedList } from '../selectors/list.selectors';

@Injectable()
export class TaskEffects {

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store,
    private listService: ListService
  ) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() => this.taskService.getAllTasks()),
      map(tasks => TaskActions.loadTasksSuccess({ tasks }))
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap(({ payload }) =>
        this.taskService.addTask(payload).pipe(
          map(task => TaskActions.addTaskSuccess({ task })),
          catchError(err => of(TaskActions.addTaskFailure({error: err})))
        )
      )
    )
  );


    removeTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.removeTask),
            withLatestFrom(this.store.select(selectSelectedList)),
            mergeMap(([{ task }, selectedList]) => {
            // If no selected list or it doesn't contain the task, just delete
            if (!selectedList || !selectedList.tasksID.includes(task)) {
                return this.taskService.deleteTask(task.id).pipe(
                map(() => TaskActions.removeTaskSuccess({ task }))
                );
            }

            // Remove task ID from the list
            const updatedTasksID = selectedList.tasksID.filter(t => t !== task);
            const updatedList = { ...selectedList, tasksID: updatedTasksID };

            return this.taskService.deleteTask(task.id).pipe(
                mergeMap(() =>
                this.listService.updateList(updatedList).pipe(
                    map(() => ListActions.updateListSuccess({ list: updatedList })),
                    catchError(err => of(ListActions.updateListFailure({ error: err.message })))
                )
                ),
                map(() => TaskActions.removeTaskSuccess({ task })),
                catchError(err => of(TaskActions.removeTaskFailure({ error: err.message })))
            );
            })
        )
    );

    updateTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.updateTask),
            mergeMap(({ task }) =>
            this.taskService.updateTask(task).pipe(
                map(updated => TaskActions.updateTaskSuccess({ task: updated })),
                catchError(err => of(TaskActions.updateTaskFailure({ error: err.message })))
            )
            )
        )
    );


}