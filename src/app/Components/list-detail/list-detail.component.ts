import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Tasks } from 'src/app/models/Tasks';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/services/list.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/reducers';
import { selectSelectedList } from 'src/app/state/selectors/list.selectors';
import * as ListActions from '../../state/actions/list.actions';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit{
   
  constructor( 
    private taskService : TaskService,
    private route: ActivatedRoute,
    private listService: ListService,
    private store: Store<AppState>
  ) {}

  tasks: Tasks[] = [];
  listName: string = '';
  list = this.store.select(selectSelectedList);
    ngOnInit(): void {
      const paramListID = this.route.snapshot.paramMap.get('id');
      this.store.dispatch(ListActions.selectList({ listId: Number(paramListID)}))
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

}
