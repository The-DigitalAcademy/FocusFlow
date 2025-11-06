import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router"

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

constructor(private router: Router) {}
ngOnInit(): void {
  
}
onSubmit(){
  // to call your Login API here
  console.log(this.loginForm.value);
  // if login is successful, navigate to the desired route
  // this.routeer.navigate(['/dashboard]);
}
register(){
  this.router.navigate(['/register']);
}
}