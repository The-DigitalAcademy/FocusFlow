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
        next: (list) => {
          this.listName = list.name;
          //get the task array
          const taskIDArray = list.tasksID;
          console.log('Task IDs:', taskIDArray);
          for(let id of taskIDArray){
            //fetch each task by its ID
            this.taskService.getTaskById(Number(id)).subscribe({
              next: (taskResponse) => {
                // Adds the tasks from api to tasks array
                this.tasks.push(taskResponse);
                console.log("Tasks", this.tasks)
              },
              error: (err) => console.log('Error loading task: ', err)
            })
          }
          console.log('List details:', list);
        },
        error: (err) => console.log('Error loading list details: ', err)
      })
    }
  

   selectedTaskId: number | null = null;
   showModal = false
   addTaskArr = this.tasks

  addTask() {
    this.showModal = true;
  }

  editTask ( id: number) {
    this.selectedTaskId = id;
    this.showModal = true;

  }

   deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        // Remove the deleted task from the tasks array
        this.tasks = this.tasks.filter(task => task.id !== id);
      }
    });
}

  onClose() {
  this.showModal = false;
  }

}