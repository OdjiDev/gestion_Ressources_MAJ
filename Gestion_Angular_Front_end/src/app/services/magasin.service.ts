
import { MagasinDto } from '../classes/magasin-dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MagasinService {

 private baseURL= environment.baseURL+ "magasins";

  constructor(private httpClient: HttpClient) { }

getMagasins(): Observable<MagasinDto[]>{
    return this.httpClient.get<MagasinDto[]>(`${this.baseURL}/list`);
  }

  getMagasinById(id: number): Observable<MagasinDto>{
    return this.httpClient.get<MagasinDto>(`${this.baseURL}/${id}`);
  }

  addMagasin(magasinDto: MagasinDto): Observable<MagasinDto>{
    return this.httpClient.post<MagasinDto>(`${this.baseURL}`, magasinDto);
  }


  updateMagasin(id: number, magasinDto: MagasinDto): Observable<MagasinDto>{
    return this.httpClient.put<MagasinDto>(`${this.baseURL}/${id}`, MagasinDto);
  }

  deleteMagasin(id: number): Observable<MagasinDto>{
    return this.httpClient.delete<MagasinDto>(`${this.baseURL}/${id}`);
  }


}
