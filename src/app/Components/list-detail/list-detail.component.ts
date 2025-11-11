import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/reducers';
import { selectSelectedList } from 'src/app/state/selectors/list.selectors';
import * as ListActions from '../../state/actions/list.actions';
import { TaskService } from 'src/app/services/task.service';
import { Tasks } from 'src/app/models/Tasks';
import { flatMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  list$ = this.store.select(selectSelectedList);
  tasks: Tasks[] = [];
  loading = true;
  listTitle = '';
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(ListActions.selectList({ listId }));

    this.list$.pipe(take(1)).subscribe(list => {
      if (list && list.tasksID && list.tasksID.length > 0) {
        this.loading = true;
        this.tasks = [];

        const taskIds: number[] = list.tasksID.map((id: any) => 
          typeof id === 'object' ? id.id : id
        );
        this.listTitle = list.name;
        taskIds.forEach(id => {
          this.taskService.getTaskById(String(id)).subscribe({
            next: (task: Tasks) => {
              this.tasks.push(task);
              console.log(this.tasks);
            },
            error: (err) => console.error(`Task ${id} failed:`, err),
            complete: () => {
              if (this.tasks.length === taskIds.length) {
                this.loading = false;
                
              }
            }
          });
        });
      } else {
        this.loading = false;
      }
    });
  }

  selectedTaskId: number | null = null;
  showModal = false;

  addTask() {
    this.showModal = true;
    this.selectedTaskId = null;
  }

  editTask(id: string) {
    this.selectedTaskId = Number(id);
    this.showModal = true;
  }

  onClose() {
    this.showModal = false;
    this.selectedTaskId = null;
  }

  
}