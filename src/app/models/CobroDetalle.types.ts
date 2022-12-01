export interface CobroDetalle {
  id_cobro_detalle?: number;
  id_cobro?: number;
  id_forma_de_pago: number;
  id_cobrador: number;
  fecha: Date;
  forma_de_pago?: string;
  pago?: string;
  valor: number;
  cobrador?: string;
}

export interface GuardarCobroDetalle {
  id_cobro?: number;
  valor_cobrado?: number;
  valor_pendiente?: number;
  estado?: string;
  detail: CobroDetalle;
}
