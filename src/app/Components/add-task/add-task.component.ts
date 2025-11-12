import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TaskActions from '../../state/actions/task.actions'
import * as ListActions from '../../state/actions/list.actions'
import { Actions, ofType } from '@ngrx/effects';
import { Subject, take, takeUntil } from 'rxjs';
import { Tasks } from 'src/app/models/Tasks';
import { Lists } from 'src/app/models/Lists';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnDestroy{
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Input() editTaskId: number | null = null;
  @Input() currentList: Lists | null = null;

  taskTitle = '';
  taskDueDate = '';
  taskPriority = '';
  
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private actions$: Actions,
    private taskService: TaskService
  ) {}

  
  onClose() {
    this.close.emit();
    this.isVisible = false;
  }

  addTask() {
    if (!this.taskTitle.trim()) return;

    const payload: Omit<Tasks, 'id'> = {
      name: this.taskTitle,
      dueDate: this.taskDueDate,
      importance: this.taskPriority,
      isDone: false
    };

    this.store.dispatch(TaskActions.addTask({ payload }));
    this.actions$
      .pipe(
        ofType(ListActions.updateListSuccess),
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.resetForm();
        this.onClose();
      });
  }

  private resetForm() {
    this.taskTitle = '';
    this.taskDueDate = '';
    this.taskPriority = '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
      

  deleteTask(id: string) {
    this.taskService.getTaskById(id).subscribe({
      next: response => {
        //get the task and remove it
        this.store.dispatch(TaskActions.removeTask({task: response}));
        //update the state
        this.actions$.pipe(
          ofType(TaskActions.removeTaskSuccess),
          take(1),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          console.log("Removed successfully");
          this.onClose();
        })
      },
      error: err => {
        console.log(err);
      }
    })
    
  }

  showInputValues() {
    this.editTaskId
  }
}