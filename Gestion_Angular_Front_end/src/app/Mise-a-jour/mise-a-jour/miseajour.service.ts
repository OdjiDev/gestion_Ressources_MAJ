

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MiseajourDto } from './miseajour-dto';

@Injectable({
  providedIn: 'root'
})
export class MiseajourService {



 private baseURL= environment.baseURL+ "miseajours";

  constructor(private httpClient: HttpClient) { }

  getMiseajours(): Observable<MiseajourDto[]>{
    return this.httpClient.get<MiseajourDto[]>(`${this.baseURL}/execute`);
  }

  getMiseajourById(id: number): Observable<MiseajourDto>{
    return this.httpClient.get<MiseajourDto>(`${this.baseURL}/${id}`);
  }


  addMiseajour(miseajourDto: MiseajourDto): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, miseajourDto);
  }

  updateMiseajour(id: number, miseajourDto: MiseajourDto): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, MiseajourDto);
  }

  deleteMiseajour(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


}
