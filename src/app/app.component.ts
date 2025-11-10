import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from './state/actions/user.actions'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FocusFlow';

  constructor(
    public router: Router,
    private store: Store
  ) {
    this.store.dispatch(UserActions.loadUserFromStorage());
  }

  shouldShowSidebar(): boolean {
    // list all routes where the sidebar should NOT appear
    return !['/login', '/register', '/add-list', '/landing'].includes(this.router.url);
  }
}
