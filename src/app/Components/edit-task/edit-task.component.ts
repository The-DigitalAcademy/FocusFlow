import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, take, takeUntil } from 'rxjs';

import * as TaskActions from '../../state/actions/task.actions';
import * as ListActions from '../../state/actions/list.actions';
import { selectTaskById } from '../../state/selectors/task.selector';
import { Tasks } from 'src/app/models/Tasks';
import { Lists } from 'src/app/models/Lists';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnDestroy {
  @Input() isVisible = false;
  @Input() editTaskId: string | null = null;  
  @Output() editClose = new EventEmitter<void>();
  
  // Form fields – bound to the template
  taskTitle = '';
  taskDueDate = '';
  taskPriority = '';
  isDone = false;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    if (!this.editTaskId) {
      this.resetForm();
      return;
    }

    this.store
      .select(selectTaskById(String(this.editTaskId)))
      .pipe(takeUntil(this.destroy$))
      .subscribe(task => {
        if (task) {
          this.taskTitle = task.name;
          this.taskDueDate = task.dueDate;
          this.taskPriority = task.importance;
          this.isDone = task.isDone;
        }
      });
  }

  editTask(): void {
    if (!this.editTaskId) return;

    const updated: Tasks = {
      id: String(this.editTaskId),
      name: this.taskTitle,
      dueDate: this.taskDueDate,
      importance: this.taskPriority,
      isDone: this.isDone
    };

    this.store.dispatch(TaskActions.updateTask({ task: updated }));
    
    this.actions$
    .pipe(
      ofType(TaskActions.updateTaskSuccess, ListActions.updateListSuccess),
      take(1),
      takeUntil(this.destroy$)
    )
    .subscribe(() => this.onClose());
  }

  onClose(): void {
    this.isVisible = false;
    this.resetForm();
    this.editClose.emit();
  }

  private resetForm(): void {
    this.taskTitle = '';
    this.taskDueDate = '';
    this.taskPriority = '';
    this.isDone = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}