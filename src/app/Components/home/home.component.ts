import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  boxes = [
    { name:'List 1', tasks: [{ title: 'Task 1'}, { title: 'Task 2'}, { title: 'Task 3'}]}, 
    { name:'List 2', tasks: [{ title: 'Task 1'}, { title: 'Task 2'}, { title: 'Task 3'}]}, 
    { name:'List 3', tasks: [{ title: 'Task 1'}, { title: 'Task 2'}, { title: 'Task 3'}]}, 
    { name:'List 4', tasks: [{ title: 'Task 1'}, { title: 'Task 2'}, { title: 'Task 3'}]},
    { showPlus: true },
    
  ];

  constructor(private router: Router) { }
  navigateToDetail(index: number) {
    if (this.boxes[index].showPlus) {
      this.router.navigate(['/add-list']);
    } else {
      this.router.navigate(['/list-detail', index]);
    }

  }
}
