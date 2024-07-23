import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

 private baseURL= environment.baseURL+ "users";

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}/list`);
  }

  getUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }

  addUser(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.baseURL}`, user);
  }


  updateUser(id: number, user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.baseURL}/${id}`, User);
  }

  deleteUser(id: number): Observable<User>{
    return this.httpClient.delete<User>(`${this.baseURL}/${id}`);
  }


}
