import { AvarieDto } from '../classes/avarie-dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AvarieService {
  private baseURL = environment.baseURL + 'avaries';

  constructor(private httpClient: HttpClient) {}

  getAvaries(): Observable<AvarieDto[]> {
    return this.httpClient.get<AvarieDto[]>(`${this.baseURL}/list`);
  }

  getAvarieById(id: number): Observable<AvarieDto> {
    return this.httpClient.get<AvarieDto>(`${this.baseURL}/${id}`);
  }

  addAvarie(avarieDto: AvarieDto): Observable<AvarieDto> {
    return this.httpClient.post<AvarieDto>(`${this.baseURL}`, avarieDto);
  }

  updateAvarie(id: number, avarieDto: AvarieDto): Observable<AvarieDto> {
    return this.httpClient.put<AvarieDto>(`${this.baseURL}/${id}`, AvarieDto);
  }

  deleteAvarie(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
