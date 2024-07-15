import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LigneFactureDto } from '../classes/lignefacture-dto';



@Injectable({
  providedIn: 'root'
})
export class LigneFactureService {

 private baseURL= environment.baseURL+ "lignefactures";

  constructor(private httpClient: HttpClient) { }

  getLignefactures(): Observable<LigneFactureDto[]>{
    return this.httpClient.get<LigneFactureDto[]>(`${this.baseURL}/list`);
  }

  getLignefactureById(id: number): Observable<LigneFactureDto>{
    return this.httpClient.get<LigneFactureDto>(`${this.baseURL}/${id}`);
  }

  addLignefacture(lignefactureDto: LigneFactureDto): Observable<LigneFactureDto>{
    return this.httpClient.post<LigneFactureDto>(`${this.baseURL}`, lignefactureDto);
    }


  updateLignefacture(id: number, lignefactureDto: LigneFactureDto): Observable<Object>{
    return this.httpClient.put<LigneFactureDto>(`${this.baseURL}/${id}`, LigneFactureDto);
  }

  deleteLignefacture(id: number): Observable<Object>{
    return this.httpClient.delete<LigneFactureDto>(`${this.baseURL}'/lignefactures/${id}`);
  }


}
