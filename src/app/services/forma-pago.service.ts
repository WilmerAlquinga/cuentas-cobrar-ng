import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormaPago } from '../models/FormaPago.types';

const apiUrl = `${environment.apiUrlV1}/forma-pago`;
@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<FormaPago[]>{
    return this.http.get<FormaPago[]>(`${apiUrl}/findAll`);
  }

  getById(id: number): Observable<FormaPago> {
    return this.http.get<FormaPago>(`${apiUrl}/findById/${id}`);
  }

  create(cobrador: FormaPago): Observable<any> {
    return this.http.post<any>(`${apiUrl}/create`, cobrador);
  }

  update(cobrador: FormaPago): Observable<any> {
    return this.http.put<any>(`${apiUrl}/update`, cobrador);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/delete/${id}`);
  }
}
