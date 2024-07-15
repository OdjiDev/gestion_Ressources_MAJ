import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LignedemandeDto } from '../classes/lignedemande-dto';



@Injectable({
  providedIn: 'root'
})
export class LigneDemandeService {

 private baseURL= environment.baseURL+ "lignedemandes";

  constructor(private httpClient: HttpClient) { }

  getLignedemandes(): Observable<LignedemandeDto[]>{
    return this.httpClient.get<LignedemandeDto[]>(`${this.baseURL}/list`);
  }

  getLignedemandeById(id: number): Observable<LignedemandeDto>{
    return this.httpClient.get<LignedemandeDto>(`${this.baseURL}/${id}`);
  }

  addLignedemande(lignedemandeDto: LignedemandeDto): Observable<LignedemandeDto>{
    return this.httpClient.post<LignedemandeDto>(`${this.baseURL}`, lignedemandeDto);
    }


  updateLignedemande(id: number, lignedemandeDto: LignedemandeDto): Observable<LignedemandeDto>{
    return this.httpClient.put<LignedemandeDto>(`${this.baseURL}/${id}`, lignedemandeDto);
  }

  deleteLignedemande(id: number): Observable<LignedemandeDto>{
    return this.httpClient.delete<LignedemandeDto>(`${this.baseURL}'/lignedemandes/${id}`);
  }


}
