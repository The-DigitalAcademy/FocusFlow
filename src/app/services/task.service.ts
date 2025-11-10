import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from '../models/Tasks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  private url = 'http://localhost:3000/tasks';
  
  //add a task
  addTask(newTask: Omit<Tasks, "id">): Observable<Tasks>{
    return this.httpClient.post<Tasks>(this.url, newTask);
  };

  //get a single task
  getTaskById(id: string): Observable<Tasks>{
    return this.httpClient.get<Tasks>(`${this.url}?id=${id}`);
  };

  //get all tasks
  getAllTasks(): Observable<Tasks[]>{
    return this.httpClient.get<Tasks[]>(this.url);
  }

  //Update task
  updateTask(task: Tasks): Observable<Tasks>{
    return this.httpClient.put<Tasks>(this.url, task);
  }

  //Delete task
  deleteTask(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.url}?email=${id}`);
  }
}
