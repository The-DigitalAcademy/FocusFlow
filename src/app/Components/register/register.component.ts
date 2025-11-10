import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { validateLocaleAndSetLanguage } from 'typescript';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  
  registerForm: FormGroup;

  constructor(
    private userService: UserService, 
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
  
        this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed', error);
        }
      )
      
    }
  }

}
