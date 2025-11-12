import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/reducers';
import { selectFilteredUserListsWithTasks, selectSelectedList } from 'src/app/state/selectors/list.selectors';
import * as ListActions from '../../state/actions/list.actions';
import { TaskService } from 'src/app/services/task.service';
import { Tasks } from 'src/app/models/Tasks';
import { flatMap, map, take } from 'rxjs/operators';
import { Lists } from 'src/app/models/Lists';

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
  listId!: any;
  currentList: Lists | null = null;
  tasks$ = this.store.select(selectFilteredUserListsWithTasks).pipe(
    map(lists => {
      const selected = lists.find(l => l.id === this.listId);
      return selected?.tasksID || [];
    })
  );
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

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