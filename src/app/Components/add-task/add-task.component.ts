import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TaskActions from '../../state/actions/task.actions'
import * as ListActions from '../../state/actions/list.actions'
import { Tasks } from '../../models/Tasks';
import { Lists } from '../../models/Lists';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, take, takeUntil } from 'rxjs';

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
    private actions$: Actions
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
}