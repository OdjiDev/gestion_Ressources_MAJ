import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FournisseurDto } from '../classes/fournisseur-dto';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

 private baseURL= environment.baseURL+ "fournisseurs";

  constructor(private httpClient: HttpClient) { }
  // Methode pour le chargement de tous les fournisseurs depuis la base de données
  getFournisseurs(): Observable<FournisseurDto[]>{
    return this.httpClient.get<FournisseurDto[]>(`${this.baseURL}/list`);
  }
  // Methode pour le chargement d'un fournisseur depuis la base de données avec son id
  getFournisseurById(id: number): Observable<FournisseurDto>{
    return this.httpClient.get<FournisseurDto>(`${this.baseURL}/${id}`);
  }
  // Methode pour l'ajout d'un nouveau fournisseur dans la base de données
  addFournisseur(fournisseur: FournisseurDto): Observable<FournisseurDto> {
    return this.httpClient.post<FournisseurDto>(`${this.baseURL}`, fournisseur);
  }

  updateFournisseur(id: number, fournisseurDto: FournisseurDto): Observable<FournisseurDto>{
    return this.httpClient.put<FournisseurDto>(`${this.baseURL}/${id}`, fournisseurDto);
  }

  deleteFournisseur(id: number): Observable<FournisseurDto>{
    return this.httpClient.delete<FournisseurDto>(`${this.baseURL}/${id}`);
  }


}
