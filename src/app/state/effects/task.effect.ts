import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from 'src/app/services/task.service';
import * as TaskActions from '../actions/task.actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class TaskEffects {

  constructor(private actions$: Actions, private taskService: TaskService) {}

    
    loadTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.loadTasks),
            switchMap(() => this.taskService.getAllTasks()),
            map(tasks => TaskActions.loadTasksSuccess({ tasks }))
        )
    );

}