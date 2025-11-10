import { HttpClient } from '@angular/common/http';
import { Component, computed, OnInit, signal } from '@angular/core';
import { Lists } from 'src/app/models/Lists';
import { FilterService } from 'src/app/services/filter.service';
import { ListService } from 'src/app/services/list.service';
import * as ListActions from '../../state/actions/list.actions'
import { Router } from '@angular/router';
import { selectAllLists, selectFilteredLists, selectLoading } from 'src/app/state/selectors/list.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  list = this.store.select(selectFilteredLists);
  loading = this.store.select(selectLoading);

  //Constructor
  constructor(
    private store: Store<AppState>,
    public router: Router
  ){}

  ngOnInit(): void {
    this.store.dispatch(ListActions.loadLists());
  }

  navigateToDetail(index: number) {
    this.store.dispatch(ListActions.selectList({listId: index}));
    this.router.navigate(['/list-detail', index]);
  }

  
}

