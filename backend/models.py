from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class Participante(Base):
    __tablename__ = "participantes"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), index=True)
    email = Column(String(100), unique=True, index=True)
    edad = Column(Integer)
    ciudad = Column(String(100))
    pais = Column(String(100))
    modalidad = Column(String(50))  # Presencial, Virtual, Híbrido
    tecnologias = Column(String(500))  # JSON o string separado por comas
    nivel = Column(String(50))  # Principiante, Intermedio, Avanzado
    aceptoTerminos = Column(Boolean, default=False)
