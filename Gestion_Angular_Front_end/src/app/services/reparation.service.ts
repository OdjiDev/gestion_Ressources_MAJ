
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReparationDto } from '../reparation-dto';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {

 private baseURL= environment.baseURL+ "reparations";

  constructor(private httpClient: HttpClient) { }

  getReparations(): Observable<ReparationDto[]>{
    return this.httpClient.get<ReparationDto[]>(`${this.baseURL}/list`);
  }

  getReparationById(id: number): Observable<ReparationDto>{
    return this.httpClient.get<ReparationDto>(`${this.baseURL}/${id}`);
  }


  addReparation(reparationDto: ReparationDto): Observable<ReparationDto>{
    return this.httpClient.post<ReparationDto>(`${this.baseURL}`, reparationDto);
  }

  // updateReparation(id: number, reparationDto: ReparationDto): Observable<Object>{
  //   return this.httpClient.put(`${this.baseURL}/update/${id}`, ReparationDto);
  // }


  updateReparation(id: number, reparation: ReparationDto): Observable<ReparationDto> {
    return this.httpClient.put<ReparationDto>(`${this.baseURL}/${id}`, reparation);
  }

  deleteReparation(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


}
