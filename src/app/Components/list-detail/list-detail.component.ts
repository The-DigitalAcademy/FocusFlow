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

  selectedTaskId: number | null = null;
   showModal = false

  addTask() {
    this.showModal = true;
  }

  editTask ( id: number) {
    this.selectedTaskId = id;
    this.showModal = true;
  }

  onClose() {
  this.showModal = false;
  }

}
