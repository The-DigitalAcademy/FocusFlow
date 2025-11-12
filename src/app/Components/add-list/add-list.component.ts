import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ListActions from '../../state/actions/list.actions'
import { Lists } from '../../models/Lists'
import { selectCurrentUser } from 'src/app/state/selectors/user.selectors';
import { take, withLatestFrom } from 'rxjs';
import { Users } from 'src/app/models/Users';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css'],
})
export class AddListComponent {
  taskForm: FormGroup;
  
  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.taskForm = this.fb.group({
      listName: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  get tasks() {
    return this.taskForm.get('tasks') as FormArray;
  }

  user!: Users;

onSubmit() {
  this.store.select(selectCurrentUser).pipe(take(1)).subscribe(u => {
    if (!u) {
      alert('No user is currently selected.');
      return;
    }
    this.user = u;

    const newList: Lists = {
      id: crypto.randomUUID(),
      name: this.taskForm.value.listName,
      category: this.taskForm.value.category, 
      userId: this.user.id, 
      tasksID: []
    };

    this.store.dispatch(ListActions.createList({ list : newList }));

    console.log('Dispatched list:', newList);
    alert('List created successfully!');
    this.router.navigate(['/home']);
  });
}

  onCancel() {
    this.taskForm.reset();
  }
}


  
