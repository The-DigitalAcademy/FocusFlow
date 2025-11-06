import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Tasks } from 'src/app/models/Tasks';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent {
   constructor( private taskService : TaskService) {}
    tasks: Tasks[] = [];
  
    ngOnInit(): void {
      this.taskService.getAllTasks().subscribe((data: Tasks[]) => {
        this.tasks = data;
      })}
  

   selectedTaskId: number | null = null;
   showModal = false

  addTask() {
    this.showModal = true;
  }

  editTask ( id: number) {
    this.selectedTaskId = id;
    this.showModal = true;
  }

  onClose() {
  this.showModal = false;
  }

}
