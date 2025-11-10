import { setFilter } from './../../state/actions/list.actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterService } from 'src/app/services/filter.service';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/state/reducers';
import * as ListActions from '../../state/actions/list.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(
    private authService: UserService,
    private filterService: FilterService,
    private store: Store<AppState>
  ){}
  currentFilter = this.store.select(state => state.list.filter);
  filter(filterVal: string | null){
    this.store.dispatch(ListActions.setFilter({ category: filterVal}))
    this.filterService.setFilter(filterVal);
  }
  
  toggleDark(){

  }
  logout(){
    this.authService.logout();
  }
}
