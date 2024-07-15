import { Injectable } from '@angular/core';
import { SocieteDto } from '../classes/societe-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocieteService {

 private baseURL= environment.baseURL+ "societes";

  constructor(private httpClient: HttpClient) { }

  getSocietes(): Observable<SocieteDto[]>{
    return this.httpClient.get<SocieteDto[]>(`${this.baseURL}/list`);
  }

  getSocieteById(id: number): Observable<SocieteDto>{
    return this.httpClient.get<SocieteDto>(`${this.baseURL}/${id}`);
  }

  addSociete(societeDto: SocieteDto): Observable<SocieteDto>{
    return this.httpClient.post<SocieteDto>(`${this.baseURL}`, societeDto);
  }


  updateSociete(id: number, societeDto: SocieteDto): Observable<SocieteDto>{
    return this.httpClient.put<SocieteDto>(`${this.baseURL}/${id}`, SocieteDto);
  }

  deleteSociete(id: number): Observable<SocieteDto>{
    return this.httpClient.delete<SocieteDto>(`${this.baseURL}/${id}`);
  }


}
