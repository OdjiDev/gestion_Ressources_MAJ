
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private baseUrl: string = 'http://localhost:8080/api/command/execute'; // Replace with your backend URL


  constructor(private http: HttpClient) { }

  executeCommand(command: string) {
    console.log('AVANT EXCECUTION SERVICE');
    return this.http.post<string>(this.baseUrl, { command }).pipe();
    console.log('APRES EXCECUTION SERVICE');
  }

}
