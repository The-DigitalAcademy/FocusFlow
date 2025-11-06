import { HttpClient } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { Lists } from 'src/app/models/Lists';
import { FilterService } from 'src/app/services/filter.service';
import { ListService } from 'src/app/services/list.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  list = signal<Lists[]>([]);

  //Constructor
  constructor(
    private httpClient: HttpClient,
    private filterService: FilterService,
    private taskService: TaskService,
    private listService: ListService
  ){}

  filteredItems = computed(() => {
    const filter = this.filterService.selectedFilter();
    if(!filter) return this.list();
    return this.list().filter(item => item.category === filter);
  });

  ngOnInit(): void {
    this.listService.getAll().subscribe({
      next: (response: Lists[]) => this.list.set(response),
      error: (err) => console.log('Error loading lists: ', err)
    })
  }
}
