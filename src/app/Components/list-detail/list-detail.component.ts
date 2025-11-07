import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Tasks } from 'src/app/models/Tasks';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent {
   constructor( 
    private taskService : TaskService,
    private route: ActivatedRoute,
    private listService: ListService
   ) {}
    tasks: Tasks[] = [];
  listName: string = '';
    ngOnInit(): void {
      const paramListID = this.route.snapshot.paramMap.get('id');
      this.listService.getSingleList(Number(paramListID)).subscribe({
        next: (response) => {
          this.listName = response.name;
          //get the task array
          const taskArray = response.tasksID;
          console.log('Task IDs:', taskArray);
          for(let id of taskArray){
            //fetch each task by its ID
            this.taskService.getTaskById(Number(id)).subscribe({
              next: (taskResponse) => {
                this.tasks.push(taskResponse);
              },
              error: (err) => console.log('Error loading task: ', err)
            })
          }
          console.log('List details:', response);
        },
        error: (err) => console.log('Error loading list details: ', err)
      })
    }
  

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

  deleteTask(id: number) {
    console.log('Deleting task with ID:', id);
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        // Remove the deleted task from the tasks array
        this.tasks = this.tasks.filter(task => task.id !== id);
      }
    });
}

}