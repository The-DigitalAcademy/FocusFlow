import { Component } from '@angular/core';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent {
  tasks: Array<any> = [
    {title: "Item 1", id: 1},
    {title: "Item 2", id: 2},
    {title: "Item 3", id: 3}
  ];

  editTask ( id: number) {
    console.log("Editing task with id:", id);
  }

}
