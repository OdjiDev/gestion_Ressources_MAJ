import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepartementDto } from '../classes/departement-dto';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

 private baseURL= environment.baseURL+ "departements";

  constructor(private httpClient: HttpClient) { }

  getDepartements(): Observable<DepartementDto[]>{
    return this.httpClient.get<DepartementDto[]>(`${this.baseURL}/list`);
  }

  getDepartementById(id: number): Observable<DepartementDto>{
    return this.httpClient.get<DepartementDto>(`${this.baseURL}/${id}`);
  }

  addDepartement(departementDto: DepartementDto): Observable<DepartementDto>{
    return this.httpClient.post<DepartementDto>(`${this.baseURL}`, departementDto);
  }


  // updateDepartement(id: number, departementDto: DepartementDto): Observable<DepartementDto>{
  //   return this.httpClient.put<DepartementDto>(`${this.baseURL}/${id}`, DepartementDto);
  // }



  updateDepartement(id: number, departement: DepartementDto): Observable<DepartementDto> {
    return this.httpClient.put<DepartementDto>(`${this.baseURL}/${id}`, departement);
  }


  deleteDepartement(id: number): Observable<DepartementDto>{
    return this.httpClient.delete<DepartementDto>(`${this.baseURL}/${id}`);
  }


}
