import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(
    private authService: UserService,
    private filterService: FilterService
  ){}

  filter(filterVal: string){
    this.filterService.setFilter(filterVal);
  }
  
  toggleDark(){

  }
  logout(){
    this.authService.logout();
  }
}
