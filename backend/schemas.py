from pydantic import BaseModel
from typing import Optional

class ParticipanteBase(BaseModel):
    nombre: str
    email: str
    edad: int
    ciudad: str
    pais: str
    modalidad: str  # Presencial, Virtual, Híbrido
    tecnologias: str  # JSON o string separado por comas
    nivel: str  # Principiante, Intermedio, Avanzado
    aceptoTerminos: bool

class ParticipanteCreate(ParticipanteBase):
    pass

class ParticipanteUpdate(ParticipanteBase):
    pass

class Participante(ParticipanteBase):
    id: int

    class Config:
        from_attributes = True
