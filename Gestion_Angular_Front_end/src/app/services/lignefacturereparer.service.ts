import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LignefacturereparerDto } from '../classes/lignefacturereparer-dto';



@Injectable({
  providedIn: 'root'
})
export class LignefacturereparerService {

 private baseURL= environment.baseURL+ "lignefacturereparers";

  constructor(private httpClient: HttpClient) { }

  getLignefacturereparers(): Observable<LignefacturereparerDto[]>{
    return this.httpClient.get<LignefacturereparerDto[]>(`${this.baseURL}/list`);
  }

  getLignefacturereparerById(id: number): Observable<LignefacturereparerDto>{
    return this.httpClient.get<LignefacturereparerDto>(`${this.baseURL}/${id}`);
  }

  addLignefacturereparer(lignefacturereparerDto: LignefacturereparerDto): Observable<LignefacturereparerDto>{
    return this.httpClient.post<LignefacturereparerDto>(`${this.baseURL}`, lignefacturereparerDto);
    }


  updateLignefacturereparer(id: number, lignefacturereparerDto: LignefacturereparerDto): Observable<Object>{
    return this.httpClient.put<LignefacturereparerDto>(`${this.baseURL}/${id}`, LignefacturereparerDto);
  }

  deleteLignefacturereparer(id: number): Observable<Object>{
    return this.httpClient.delete<LignefacturereparerDto>(`${this.baseURL}'/lignefacturereparers/${id}`);
  }


}
