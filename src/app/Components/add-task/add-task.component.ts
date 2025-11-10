import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  // Form fields 
  taskTitle: any = ''
  taskDueDate: any = ''
  taskPriority: any = ''


  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Input() editTaskId: number | null = null;

  // Updates the task array for both parent and child
  @Input() addTaskArr: Tasks[] = []
  @Output() addTaskArrChange = new EventEmitter<Tasks[]>();

  @Input() done: boolean = false 

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit() {
    if (this.editTaskId !== null) {
      const taskToEdit = this.addTaskArr.find(t => t.id === this.editTaskId);
      if (taskToEdit) {
        this.taskTitle = taskToEdit.name;
        this.taskDueDate = taskToEdit.dueDate;
        this.taskPriority = taskToEdit.importance;
      }
    } else {
      // Add task input is empty when clicked 
      this.taskTitle = '';
      this.taskDueDate = '';
      this.taskPriority = '';
    }
  }

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
        this.addTaskArrChange.emit(this.addTaskArr);
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

  editTask() {
     const updateTask = {
      id: Number(this.editTaskId),
      name: this.taskTitle,
      dueDate: this.taskDueDate,
      importance: this.taskPriority,
      isDone: this.done
     }

     this.taskService.updateTask(updateTask).subscribe({
      next: (editTask) => {
        const index = this.addTaskArr.findIndex(t => t.id === editTask.id);
        if (index !== -1) {
        this.addTaskArr[index] = editTask;
      }
       this.addTaskArrChange.emit(this.addTaskArr);
        // Tells the parent to close the model 
        this.close.emit();
        console.log(this.addTaskArr);
      }
     })
  }

}