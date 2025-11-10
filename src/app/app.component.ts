import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from './state/actions/user.actions'
import { selectCurrentUser } from './state/selectors/user.selectors';
import { filter, take } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FocusFlow';

  constructor(
    public router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUserFromStorage());
    
    this.store.select(selectCurrentUser).pipe(
      filter(user => !!user),
      take(1)
    ).subscribe(() => {
      if (this.router.url === '/login' || this.router.url === '/landing') {
        this.router.navigate(['/home']);
      }
    });
  }
  shouldShowSidebar(): boolean {
    // list all routes where the sidebar should NOT appear
    return !['/login', '/register', '/add-list', '/landing'].includes(this.router.url);
  }
}
