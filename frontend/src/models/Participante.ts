export interface Participante {
  id: number;
  nombre: string;
  email: string;
  edad: number;
  ciudad: string;
  pais: string;
  modalidad: string; // Presencial, Virtual, Híbrido
  tecnologias: string; // JSON o string separado por comas
  nivel: string; // Principiante, Intermedio, Avanzado
  aceptoTerminos: boolean;
}
