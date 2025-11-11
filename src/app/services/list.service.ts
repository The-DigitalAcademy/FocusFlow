import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/Users';
import { Lists } from '../models/Lists';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  private url = 'http://localhost:3000/lists';

  loggedUser: Users | null = this.userService.getCurrentUser();
  
  //Add a list
  addList(list: Omit<Lists, "id">): Observable<Lists>{
    return this.httpClient.post<Lists>(this.url, list);
  }

  //Update list
  updateList(list: Lists): Observable<Lists>{
    return this.httpClient.put<Lists>(this.url, list);
  }

  //get a single list
  getSingleList(id: string): Observable<Lists>{
    return this.httpClient.get<Lists>(`${this.url}/${id}`);
  }

  //get user lists
  getUserLists(userId: string): Observable<Lists[]>{
    return this.httpClient.get<Lists[]>(`${this.url}?userId=${userId}`)
  }
  //get all lists
  getAll(): Observable<Lists[]>{
    return this.httpClient.get<Lists[]>(this.url);
  }

  //delete list
  deleteList(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
