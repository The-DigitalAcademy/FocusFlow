import { ListService } from 'src/app/services/list.service';
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { catchError, map, of, switchMap, throwError } from 'rxjs';
import { Tasks } from 'src/app/models/Tasks';
import { TaskService } from 'src/app/services/task.service';
import { Lists } from 'src/app/models/Lists';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  tasks: Tasks[] = [];
  newTask!: Omit<Tasks, "id">;
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Input() editTaskId: number | null = null;
  @Input() listId: String | null = null;
  @Input() currentList!: Lists;

  taskTitle: any = '';
  taskDueDate: any = '';
  taskPriority: any = '';
  
  constructor(
    private taskService: TaskService,
    private listService: ListService
  ){}
  onClose() {
    this.close.emit();
    this.isVisible = false;
  }

  addTask() {
  if (!this.taskTitle.trim()) return;

  const newTaskPayload: Omit<Tasks, 'id'> = {
    name: this.taskTitle,
    dueDate: this.taskDueDate,
    importance: this.taskPriority,
    isDone: false,
  };

  this.taskService.addTask(newTaskPayload).pipe(
    switchMap((createdTask: Tasks) => {
      const updatedTaskIds: Tasks[] = [
        ...this.currentList.tasksID,
        createdTask  
      ];

      const updatedList: Lists = {
        ...this.currentList,
        tasksID: updatedTaskIds
      };

      return this.listService.updateList(updatedList).pipe(
        map(() => ({ success: true, updatedList, newTaskId: createdTask.id })),
        catchError(err => of({ success: false, error: err }))
      );
    }),
    catchError(err => of({ success: false, error: err }))
  ).subscribe({
    next: (result) => {
      if (result.success) {
        console.log('Task added & list updated → new id:', result);
        this.onClose();               
      } else {
        console.error('List update failed', result);
        alert('Task created but list not updated – refresh the page.');
      }
    },
    error: (err) => {
      console.error('Task creation failed', err);
      alert('Could not create task – try again.');
    }
  });
}

showInputValues() {
  this.editTaskId
}
}