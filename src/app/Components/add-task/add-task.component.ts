import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
    this.isVisible = false;
  }

  addTask() {
    alert('Task Adde Successfully!');
    this.close.emit();
    this.isVisible = false;
}
}