
import { ProduitDto } from '../classes/produit-dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

 private baseURL= environment.baseURL+ "produits";

  constructor(private httpClient: HttpClient) { }

  getProduits(): Observable<ProduitDto[]>{
    return this.httpClient.get<ProduitDto[]>(`${this.baseURL}/list`);
  }

  getProduitById(id: number): Observable<ProduitDto>{
    return this.httpClient.get<ProduitDto>(`${this.baseURL}/${id}`);
  }

  addProduit(produitDto: ProduitDto): Observable<ProduitDto>{
    return this.httpClient.post<ProduitDto>(`${this.baseURL}`, produitDto);
  }

  updateProduit(id: number, produitDto: ProduitDto): Observable<ProduitDto>{
    return this.httpClient.put<ProduitDto>(`${this.baseURL}/${id}`, produitDto);
  }

  deleteProduit(id: number): Observable<ProduitDto>{
    return this.httpClient.delete<ProduitDto>(`${this.baseURL}/${id}`);
  }


  getProduitSansAvaries(): Observable<ProduitDto[]>{
    return this.httpClient.get<ProduitDto[]>(`${this.baseURL}/sans-avarie`);
  }



}
