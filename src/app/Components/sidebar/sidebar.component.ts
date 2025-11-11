import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/reducers';
import * as ListActions from '../../state/actions/list.actions';
import * as UserActions from '../../state/actions/user.actions';
import { Router } from '@angular/router';
import { selectCurrentUser, selectIsLoggedIn } from 'src/app/state/selectors/user.selectors';
import { selectListFeature, selectUserCategories } from 'src/app/state/selectors/list.selectors';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(
    private router: Router,
    private store: Store<AppState>
  ){}

  categories = this.store.select(selectUserCategories);
  currentFilter = this.store.select(state => state.list.filter);
  
  _user = this.store.select(selectCurrentUser);
  _isLoggedIn = this.store.select(selectIsLoggedIn);

  filter(filterVal: string | null){
    this.store.dispatch(ListActions.setFilter({ category: filterVal}))
  }
  getCount(category: string): number {
    let count = 0;
    this.store.select(selectListFeature).subscribe(state => {
      count = state.lists.filter(l => l.category === category).length;
    }).unsubscribe();
    return count;
  }
  toggleDark(){

  }
  logout(){
    this.store.dispatch(UserActions.logout());
    localStorage.removeItem('current_user');
    this.router.navigate(['/landing']);
  }
}
