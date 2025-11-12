import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ListActions from '../../state/actions/list.actions'
import { Lists } from '../../models/Lists'


@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css'],
})
export class AddListComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
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

  const newList: Lists = {
    id: '2', 
    name: this.taskForm.value.listName,
    category: 'Default', 
    userId: '123', 
    tasksID: this.taskForm.value.tasks.map((task: string, index: number) => ({
      id: '2',
      title: task,
      completed: false
    }))
  };

  this.store.dispatch(ListActions.createListsSuccess({ list : newList }));

  console.log('Dispatched list:', newList);
  alert('Tasks added successfully!');
  this.taskForm.reset();
}

  onCancel() {
    this.taskForm.reset();
  }
}


  
