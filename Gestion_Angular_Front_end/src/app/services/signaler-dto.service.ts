
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignalerDto } from '../classes/signaler-dto';

@Injectable({
  providedIn: 'root'
})
export class SignalerService {

 private baseURL= environment.baseURL+ "signalers";

  constructor(private httpClient: HttpClient) { }

  getSignalers(): Observable<SignalerDto[]>{
    return this.httpClient.get<SignalerDto[]>(`${this.baseURL}/list`);
  }

  getSignalerById(id: number): Observable<SignalerDto>{
    return this.httpClient.get<SignalerDto>(`${this.baseURL}/${id}`);
  }


  addSignaler(signalerDto: SignalerDto): Observable<SignalerDto>{
    return this.httpClient.post<SignalerDto>(`${this.baseURL}`, signalerDto);
  }

  updateSignaler(id: number, signalerDto: SignalerDto): Observable<SignalerDto>{
    return this.httpClient.put<SignalerDto>(`${this.baseURL}/${id}`, SignalerDto);
  }

  deleteSignaler(id: number): Observable<SignalerDto>{
    return this.httpClient.delete<SignalerDto>(`${this.baseURL}/${id}`);
  }


}
