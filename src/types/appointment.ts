export interface Appointment {
  id: number;
  doctor: string;
  fecha: string;
  hora: string;
  estado: string;
  tipo: string;
  especialidad: string;
  descripcion: string;
  cancelada: boolean;
  motivoRechazo: string;
  descripcionCita: string;
  examenes: string[];
}