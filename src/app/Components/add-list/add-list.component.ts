import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      listName: ['', Validators.required],
      tasks: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ])
    });
  }

  get tasks() {
    return this.taskForm.get('tasks') as FormArray;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      alert('Tasks added successfully!');
    }
  }

  onCancel() {
    this.taskForm.reset();
  }
}


  
