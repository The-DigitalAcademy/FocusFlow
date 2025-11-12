import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/reducers';
import { selectFilteredUserListsWithTasks, selectSelectedList } from 'src/app/state/selectors/list.selectors';
import * as ListActions from '../../state/actions/list.actions';
import { TaskService } from 'src/app/services/task.service';
import { Tasks } from 'src/app/models/Tasks';
import { flatMap, map, take, takeUntil } from 'rxjs/operators';
import { Lists } from 'src/app/models/Lists';
import { Actions, ofType } from '@ngrx/effects';
import * as TaskActions from '../../state/actions/task.actions'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit, OnDestroy {
  list$ = this.store.select(selectSelectedList);
  tasks: Tasks[] = [];
  loading = true;
  listTitle = '';
  listId!: any;
  currentList: Lists | null = null;
  tasks$ = this.store.select(selectFilteredUserListsWithTasks).pipe(
    map(lists => {
      const selected = lists.find(l => l.id === this.listId);
      return selected?.tasksID || [];
    })
  );
  private destroy$ = new Subject<void>();
  
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private actions$: Actions,
    private taskService: TaskService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(ListActions.selectList({ listId: this.listId }));

    // Subscribe to enriched tasks
    this.tasks$.subscribe(tasks => {
      this.tasks = tasks as Tasks[];
      this.loading = false;
    });

    // Get title from selected list
    this.list$.subscribe(list => {
      if (list) {
        this.currentList = list;
        this.listTitle = list.name;
      }
    });
  }
  
  selectedTaskId: number | null = null;
  showModal = false;
   addTaskArr = this.tasks
   selectedTaskIsDone: boolean = false
   showEditModal = false

  addTask() {
    this.showModal = true;
    this.selectedTaskId = null;
  }

  editTask(id: string, isDone: boolean) {
    this.selectedTaskId = String(id);
    this.selectedTaskIsDone = isDone
    this.showEditModal = true;

  }

   deleteTask(id: string) {
       this.taskService.getTaskById(id).subscribe({
         next: response => {
           //get the task and remove it
           this.store.dispatch(TaskActions.removeTask({task: response}));
           //update the state
           this.actions$.pipe(
             ofType(TaskActions.removeTaskSuccess),
             take(1),
             takeUntil(this.destroy$)
           )
           .subscribe(() => {
             console.log("Removed successfully");
             this.onClose();
           })
         },
         error: err => {
           console.log(err);
         }
       })
       
     }

onClose() {
    this.showModal = false;
    this.selectedTaskId = null;
  this.showEditModal = false;
  }

isComplete(index: number) {
  this.tasks[index].isDone = !this.tasks[index].isDone;
}

}