import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReparerDto } from '../classes/reparer-dto';

@Injectable({
  providedIn: 'root'
})
export class ReparerService {

 private baseURL= environment.baseURL+ "reparers";

  constructor(private httpClient: HttpClient) { }
  // Methode pour le chargement de tous les reparers depuis la base de données
  getReparers(): Observable<ReparerDto[]>{
    return this.httpClient.get<ReparerDto[]>(`${this.baseURL}/list`);
  }
  // Methode pour le chargement d'un reparer depuis la base de données avec son id
  getReparerById(id: number): Observable<ReparerDto>{
    return this.httpClient.get<ReparerDto>(`${this.baseURL}/${id}`);
  }
  // Methode pour l'ajout d'un nouveau reparer dans la base de données
  addReparer(reparer: ReparerDto): Observable<ReparerDto> {
    return this.httpClient.post<ReparerDto>(`${this.baseURL}`, reparer);
  }

  updateReparer(id: number, reparerDto: ReparerDto): Observable<ReparerDto>{
    return this.httpClient.put<ReparerDto>(`${this.baseURL}/${id}`, reparerDto);
  }

  deleteReparer(id: number): Observable<ReparerDto>{
    return this.httpClient.delete<ReparerDto>(`${this.baseURL}/${id}`);
  }


}
