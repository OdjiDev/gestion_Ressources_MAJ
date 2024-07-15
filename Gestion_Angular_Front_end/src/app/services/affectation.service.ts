
import { AffectationDto } from '../classes/affectation-dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

 private baseURL= environment.baseURL+ "affectations";

  constructor(private httpClient: HttpClient) { }

  getAffectations(): Observable<AffectationDto[]>{
    return this.httpClient.get<AffectationDto[]>(`${this.baseURL}/list`);
  }

  getAffectationById(id: number): Observable<AffectationDto>{
    return this.httpClient.get<AffectationDto>(`${this.baseURL}/${id}`);
  }


  addAffectation(affectationDto: AffectationDto): Observable<AffectationDto>{
    return this.httpClient.post<AffectationDto>(`${this.baseURL}`, affectationDto);
  }

  // updateAffectation(id: number, affectationDto: AffectationDto): Observable<Object>{
  //   return this.httpClient.put(`${this.baseURL}/update/${id}`, AffectationDto);
  // }


  updateAffectation(id: number, affectation: AffectationDto): Observable<AffectationDto> {
    return this.httpClient.put<AffectationDto>(`${this.baseURL}/${id}`, affectation);
  }

  deleteAffectation(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


}
