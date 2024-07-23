

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mise_a_jourDto } from './mise-a-jour/mise_a_jour-dto';


@Injectable({
  providedIn: 'root'
})
export class Mise_a_jourService {

 // http://localhost:8080/api/serveur//execute

 private baseURL= environment.baseURL+ "serveur/miseajours";

  constructor(private httpClient: HttpClient) { }

  getMise_a_jours(): Observable<Mise_a_jourDto[]>{
    return this.httpClient.get<Mise_a_jourDto[]>(`${this.baseURL}/execute`);
  }

  getMise_a_jourById(id: number): Observable<Mise_a_jourDto>{
    return this.httpClient.get<Mise_a_jourDto>(`${this.baseURL}/${id}`);
  }


  addMise_a_jour(mise_a_jourDto: Mise_a_jourDto): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, mise_a_jourDto);
  }

  updateMise_a_jour(id: number, mise_a_jourDto: Mise_a_jourDto): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, Mise_a_jourDto);
  }

  deleteMise_a_jour(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


}
