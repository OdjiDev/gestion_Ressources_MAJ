import { ContratDto } from '../classes/contrat-dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

 private baseURL= environment.baseURL+ "contrats";

  constructor(private httpClient: HttpClient) { }

  getContrats(): Observable<ContratDto[]>{
    return this.httpClient.get<ContratDto[]>(`${this.baseURL}/list`);
  }


  getContratById(id: number): Observable<ContratDto>{
    return this.httpClient.get<ContratDto>(`${this.baseURL}/${id}`);
  }

  addContrat(contratDto: ContratDto): Observable<ContratDto>{
    return this.httpClient.post<ContratDto>(`${this.baseURL}`, contratDto);
  }

  updateContrat(id: number, contratDto: ContratDto): Observable<ContratDto>{
    return this.httpClient.put<ContratDto>(`${this.baseURL}/${id}`, ContratDto);
  }

  deleteContrat(id: number): Observable<ContratDto>{
    return this.httpClient.delete<ContratDto>(`${this.baseURL}/${id}`);
  }


}
