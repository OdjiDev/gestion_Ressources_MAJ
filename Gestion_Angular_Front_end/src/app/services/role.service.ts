import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleDto } from '../classes/role-dto';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

 private baseURL= environment.baseURL+ "roles";

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<RoleDto[]>{
    return this.httpClient.get<RoleDto[]>(`${this.baseURL}/list`);
  }

  getRoleById(id: number): Observable<RoleDto>{
    return this.httpClient.get<RoleDto>(`${this.baseURL}/${id}`);
  }

  addRole(roleDto: RoleDto): Observable<RoleDto>{
    return this.httpClient.post<RoleDto>(`${this.baseURL}`, roleDto);
  }


  updateRole(id: number, roleDto: RoleDto): Observable<RoleDto>{
    return this.httpClient.put<RoleDto>(`${this.baseURL}/${id}`, RoleDto);
  }

  deleteRole(id: number): Observable<RoleDto>{
    return this.httpClient.delete<RoleDto>(`${this.baseURL}/${id}`);
  }


}
