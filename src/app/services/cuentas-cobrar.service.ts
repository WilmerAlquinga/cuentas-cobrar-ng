import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cobro } from '../models/Cobro.types';
import { Observable } from 'rxjs';
import { CobroDetalle, GuardarCobroDetalle } from '../models/CobroDetalle.types';

const apiUrl = `${environment.apiUrlV1}/cuentas-cobrar`;
@Injectable({
  providedIn: 'root'
})
export class CuentasCobrarService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cobro[]>{
    return this.http.get<Cobro[]>(`${apiUrl}/findAll`);
  }

  getById(id: number): Observable<Cobro> {
    return this.http.get<Cobro>(`${apiUrl}/findById/${id}`);
  }

  create(cobrador: Cobro): Observable<any> {
    return this.http.post<any>(`${apiUrl}/create`, cobrador);
  }

  update(cobrador: Cobro): Observable<any> {
    return this.http.put<any>(`${apiUrl}/update`, cobrador);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/delete/${id}`);
  }

  createDetail(detalle: GuardarCobroDetalle): Observable<CobroDetalle> {
    return this.http.post<CobroDetalle>(`${apiUrl}/detail/create`, detalle);
  }

  getDetailsByCobroId(id_cobro: number): Observable<CobroDetalle[]> {
    return this.http.get<CobroDetalle[]>(`${apiUrl}/detail/findAll/${id_cobro}`);
  }
}
