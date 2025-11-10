import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Tasks } from 'src/app/models/Tasks';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  tasks: Tasks[] = [];

  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Input() editTaskId: number | null = null;

  taskTitle: any = '';
  taskDueDate: any = '';
  taskPriority: any = '';
  

  onClose() {
    this.close.emit();
    this.isVisible = false;
  }

  addTask() {
    alert('Task Added Successfully!');
    this.close.emit();
    this.isVisible = false;
    this.tasks.push({id: 1 , name: this.taskTitle, dueDate: this.taskDueDate, importance: this.taskPriority, isDone: false});
    console.log(this.tasks);
}

showInputValues() {
  this.editTaskId
}
}