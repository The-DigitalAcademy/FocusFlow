import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/Users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  //accessing the endpoints
  private url = 'http://localhost:3000/users'
  //register user
  register(user: Users): Observable<Users>{
    const registerUser: Users = {
      ...user,
      id: 1     
    };

    return this.httpClient.post<Users>(this.url, registerUser);
  }

  //Login
  login(email: string, pass: string): Observable<Users>{
    return this.httpClient.get<Users>(`${this.url}/email=${email}&password=${pass}`);
  }

  //get current user
  getCurrentUser(): Users | null {
    const data = localStorage.getItem('current_user');
    return data ? JSON.parse(data) : null;
  }

  //Logout
  logout(): void {
    localStorage.removeItem('current_user');
  }

  //Delete user?
  deleteUser(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
  
  //Edit user?
  editUser(editedUser: Users): Observable<Users>{
    return this.httpClient.put<Users>(this.url, editedUser);
  }
}
