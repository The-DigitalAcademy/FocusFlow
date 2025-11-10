import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import * as UserActions from '../../state/actions/user.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store
  ) {}
  ngOnInit(): void {
    
  }
  onSubmit(){
    // to call your Login API here
    this.store.dispatch(UserActions.login({email: this.loginForm.value.email!, password: this.loginForm.value.password!}))

    // this.userService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe({
    //   next: (response) => {
    //     this.router.navigate(['/home']);
    //   },
    //   error: (err) => {
    //     throwError(() => Error(err));
    //   }
    // })
  }
  register(){
    this.router.navigate(['/register']);
  }
}