import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tasks } from 'src/app/models/Tasks';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  // Has the new task data on it.
  addedTasks: Tasks[] = [];

  // Form fields 
  taskTitle: any = ''
  taskDueDate: any = ''
  taskPriority: any = ''


  @Input() isVisible: boolean = false;
  @Output() closeEdit = new EventEmitter<void>();
  @Input() editTaskId: string | null = null;

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
    this.closeEdit.emit();
    this.isVisible = false;
    
  }

  editTask() {
  const updateTask: Tasks = {
    id: String(this.editTaskId),
    name: this.taskTitle,
    dueDate: this.taskDueDate,
    importance: this.taskPriority,
    isDone: this.done
  };

  this.taskService.updateTask(updateTask).subscribe({
    next: (editedTask) => {
      const index = this.addTaskArr.findIndex(t => t.id === editedTask.id);
      if (index !== -1) {
        this.addTaskArr[index] = editedTask;
      }

      // Emit the updated array to the parent
      this.addTaskArrChange.emit(this.addTaskArr);

      // Tell parent to close the modal
      this.closeEdit.emit();

      console.log('Updated task array:', this.addTaskArr);
      alert('Updated Successfully');
    },
    error: (err) => {
      console.error('Error updating task:', err);
      alert('Failed to update task');
    }
  });
  }}