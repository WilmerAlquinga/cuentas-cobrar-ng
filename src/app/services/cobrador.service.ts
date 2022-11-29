import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Cobrador } from '../models/Cobrador.types';

const apiUrl = `${environment.apiUrlV1}/cobrador`;
@Injectable({
  providedIn: 'root'
})
export class CobradorService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cobrador[]>{
    return this.http.get<Cobrador[]>(`${apiUrl}/findAll`);
  }

  getById(id: number): Observable<Cobrador> {
    return this.http.get<Cobrador>(`${apiUrl}/findById/${id}`);
  }

  create(cobrador: Cobrador): Observable<any> {
    return this.http.post<any>(`${apiUrl}/create`, cobrador);
  }

  update(cobrador: Cobrador): Observable<any> {
    return this.http.put<any>(`${apiUrl}/update`, cobrador);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/delete/${id}`);
  }
}
