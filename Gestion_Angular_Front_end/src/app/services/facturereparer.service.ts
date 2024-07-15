


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacturereparerDto } from '../classes/facturereparer-dto';

@Injectable({
  providedIn: 'root'
})
export class FacturereparerService {

 private baseURL= environment.baseURL+ "facturereparers";

  constructor(private httpClient: HttpClient) { }

  getFacturereparers(): Observable<FacturereparerDto[]>{
    return this.httpClient.get<FacturereparerDto[]>(`${this.baseURL}/list`);
  }

  getFacturereparerById(id: number): Observable<FacturereparerDto>{
    return this.httpClient.get<FacturereparerDto>(`${this.baseURL}/${id}`);
  }


  addFacturereparer(facturereparer: FacturereparerDto): Observable<FacturereparerDto>{
    facturereparer.datecommande = facturereparer.datecommande.split('T')[0];
    return this.httpClient.post<FacturereparerDto>(`${this.baseURL}`, facturereparer);
  }

  updateFacturereparer(id: number, facturereparer: FacturereparerDto): Observable<FacturereparerDto>{
    return this.httpClient.put<FacturereparerDto>(`${this.baseURL}/${id}`, facturereparer);
  }

  deleteFacturereparer(id: number): Observable<FacturereparerDto>{
    return this.httpClient.delete<FacturereparerDto>(`${this.baseURL}/${id}`);
  }


}
