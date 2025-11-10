
import { Component, OnInit } from '@angular/core';
import * as ListActions from '../../state/actions/list.actions'
import { Router } from '@angular/router';
import { selectFilteredUserLists, selectLoading } from 'src/app/state/selectors/list.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/reducers';
import { selectCurrentUser } from 'src/app/state/selectors/user.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  list = this.store.select(selectFilteredUserLists);
  loading = this.store.select(selectLoading);

  //Constructor
  constructor(
    private store: Store<AppState>,
    public router: Router
  ){}

  ngOnInit(): void {
    this.store.select(selectCurrentUser).pipe(
      take(1),
    ).subscribe(user => {
      if(user){
        this.store.dispatch(ListActions.loadLists());
      } else {
        this.router.navigate(['/landing']);
      }
    })
    console.log(this.list)
  }

  navigateToDetail(index: string) {
    this.store.dispatch(ListActions.selectList({listId: index}));
    this.router.navigate(['/list-detail', index]);
  }

  
}

