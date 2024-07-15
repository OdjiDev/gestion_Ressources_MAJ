import { CategorieDto } from '../classes/categorie-dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

 private baseURL= environment.baseURL+ "categories";

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<CategorieDto[]>{
    return this.httpClient.get<CategorieDto[]>(`${this.baseURL}/list`);
  }

  
  getCategorieById(id: number): Observable<CategorieDto>{
    return this.httpClient.get<CategorieDto>(`${this.baseURL}/${id}`);
  }

  addCategorie(categorieDto: CategorieDto): Observable<CategorieDto>{
    return this.httpClient.post<CategorieDto>(`${this.baseURL}`, categorieDto);
  }

  updateCategorie(id: number, categorieDto: CategorieDto): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, categorieDto);
  }

  deleteCategorie(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


}
