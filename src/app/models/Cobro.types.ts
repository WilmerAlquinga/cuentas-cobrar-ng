import { CobroDetalle } from './CobroDetalle.types';
export interface Cobro {
  id_cobro: number;
  numero_factura: string;
  valor_factura: number;
  valor_cobrado?: number;
  valor_pendiente?: number;
  fecha: Date;
  cliente?: string;
  estado?: string;
  detalles: CobroDetalle[];
}
