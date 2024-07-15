import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../classes/users';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseURL = environment.baseURL+ "login";

  constructor(private httpClient: HttpClient) {}

  loginUsers(users: Users): Observable<object> {
    console.log(users);

    // Create headers with Content-Type set to application/json
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Send the POST request with the users data and headers
    return this.httpClient.post<Object>(`${this.baseURL}`, users, { headers });

  }


  getUserss(): Observable<Users[]>{
    return this.httpClient.get<Users[]>(`${this.baseURL}/list`);
  }

  // getUsersById(id: number): Observable<Users>{
  //   return this.httpClient.get<Users>(`${this.baseURL}/${id}`);
  // }

  addUsers(users: Users): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseURL}`, users);
  }

}


//   updateUsers(id: number, users: Users): Observable<Object>{
//     return this.httpClient.put<Object>(`${this.baseURL}/${id}`, Users);
//   }

//   deleteUsers(id: number): Observable<Object>{
//     return this.httpClient.delete<Object>(`${this.baseURL}/${id}`);
//   }


// }



//spring security 6
// private baseUrl = environment.baseURL+ "login";

// constructor(private httpClient: HttpClient) {}

// loginUsers(users: Users): Observable<object> {
//   console.log(users);

//   // Create headers with Content-Type set to application/json
//   const headers = new HttpHeaders().set('Content-Type', 'application/json');

//   // Send the POST request with the user data and headers
//   return this.httpClient.post(`${this.baseUrl}`, users, { headers });
// }
// }
