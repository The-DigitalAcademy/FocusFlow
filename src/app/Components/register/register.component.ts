import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateLocaleAndSetLanguage } from 'typescript';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm: FormGroup;

  constructor() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }

}
