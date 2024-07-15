
import { SuivieDto } from '../classes/suivie-dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuivieService {

 private baseURL= environment.baseURL+ "suivies";

  constructor(private httpClient: HttpClient) { }

  getSuivies(): Observable<SuivieDto[]>{
    return this.httpClient.get<SuivieDto[]>(`${this.baseURL}/list`);
  }

  getSuivieById(id: number): Observable<SuivieDto>{
    return this.httpClient.get<SuivieDto>(`${this.baseURL}/${id}`);
  }


  addSuivie(suivieDto: SuivieDto): Observable<SuivieDto>{
    return this.httpClient.post<SuivieDto>(`${this.baseURL}`, suivieDto);
  }

  // updateSuivie(id: number, suivieDto: SuivieDto): Observable<Object>{
  //   return this.httpClient.put(`${this.baseURL}/update/${id}`, SuivieDto);
  // }


  updateSuivie(id: number, suivie: SuivieDto): Observable<SuivieDto> {
    return this.httpClient.put<SuivieDto>(`${this.baseURL}/suivies/${id}`, suivie);
  }

  deleteSuivie(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


}
