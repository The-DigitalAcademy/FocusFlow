import { setFilter } from './../../state/actions/list.actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterService } from 'src/app/services/filter.service';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/state/reducers';
import * as ListActions from '../../state/actions/list.actions';
import * as UserActions from '../../state/actions/user.actions';
import { Router } from '@angular/router';
import { selectCurrentUser, selectIsLoggedIn } from 'src/app/state/selectors/user.selectors';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(
    private router: Router,
    private filterService: FilterService,
    private store: Store<AppState>
  ){}

  currentFilter = this.store.select(state => state.list.filter);
  _user = this.store.select(selectCurrentUser);
  _isLoggedIn = this.store.select(selectIsLoggedIn);

  filter(filterVal: string | null){
    this.store.dispatch(ListActions.setFilter({ category: filterVal}))
    this.filterService.setFilter(filterVal);
  }
  
  toggleDark(){

  }
  logout(){
    this.store.dispatch(UserActions.logout());
    localStorage.removeItem('current_user');
    this.router.navigate(['/landing']);
  }
}
