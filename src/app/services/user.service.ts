import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/Users';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  //accessing the endpoints
  private url = 'http://localhost:3000/users'
  //register user
  register(user: Omit<Users, "id">): Observable<Users>{
    return this.httpClient.post<Users>(this.url, user);
  }

  //Login
  login(email: string, pass: string): Observable<Users>{
    return this.httpClient.get<Users[]>(`${this.url}?email=${email}&password=${pass}`).pipe(
      map(users => {
        if(users.length === 0) throw new Error('Invalid credentials');
        return users[0];
      })
    )
  }

  //get current user
  getCurrentUser(): Users | null {
    const data = localStorage.getItem('current_user');
    return data ? JSON.parse(data) : null;
  }

  //set current user
  setCurrentUser(user: Users): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  //Logout
  logout(): void {
    localStorage.removeItem('current_user');
  }

  //Delete user?
  deleteUser(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.url}?id=${id}`);
  }
  
  //Edit user?
  editUser(editedUser: Users): Observable<Users>{
    return this.httpClient.put<Users>(this.url, editedUser);
  }
}
