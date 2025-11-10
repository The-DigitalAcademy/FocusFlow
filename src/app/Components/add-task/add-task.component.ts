import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Tasks } from 'src/app/models/Tasks';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
// Has the new task data on it.
  addedTasks: Tasks[] = [];
  
  constructor( 
      private taskService : TaskService,
     ) {}

  taskTitle: any = '';
  taskDueDate: any = '';
  taskPriority: any = '';

  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Input() editTaskId: number | null = null;
  @Input() addTaskArr: Tasks[] = []


  onClose() {
    this.close.emit();
    this.isVisible = false;
  }

  addTask() {
  const newTask = {
    id: 1, 
    name: this.taskTitle,
    dueDate: this.taskDueDate,
    importance: this.taskPriority,
    isDone: false
  };

    this.taskService.addTask(newTask).subscribe({
      next: (createdTask) => {
      this.addTaskArr.push(createdTask);
      alert('Task Added Successfully!');
      // Tells the parent to close the model 
      this.close.emit();
    
      console.log(this.addTaskArr);

    },
    error: (err) => {
      console.error('Error adding task:', err);
      alert('Failed to add task.');
    }
   })
    
}

showInputValues() {
  this.editTaskId
}
}