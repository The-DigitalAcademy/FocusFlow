import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  selectedFilter = signal<string | null>(null);

  setFilter(filter: string | null){
    this.selectedFilter.set(filter);
    console.log(this.selectedFilter());
  }
}
