from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import Participante as ParticipanteModel
from schemas import Participante, ParticipanteCreate, ParticipanteUpdate

# Crear las tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Participantes API - TP5M", version="2.0")

# Configurar CORS para permitir requests desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint: Obtener todos los participantes
@app.get("/participantes", response_model=list[Participante])
def obtener_participantes(db: Session = Depends(get_db)):
    participantes = db.query(ParticipanteModel).all()
    return participantes

# Endpoint: Crear un nuevo participante
@app.post("/participantes", response_model=Participante)
def crear_participante(participante: ParticipanteCreate, db: Session = Depends(get_db)):
    db_participante = ParticipanteModel(
        nombre=participante.nombre,
        email=participante.email,
        edad=participante.edad,
        ciudad=participante.ciudad,
        pais=participante.pais,
        modalidad=participante.modalidad,
        tecnologias=participante.tecnologias,
        nivel=participante.nivel,
        aceptoTerminos=participante.aceptoTerminos
    )
    db.add(db_participante)
    db.commit()
    db.refresh(db_participante)
    return db_participante

# Endpoint: Actualizar un participante por ID
@app.put("/participantes/{id}", response_model=Participante)
def actualizar_participante(id: int, participante: ParticipanteUpdate, db: Session = Depends(get_db)):
    db_participante = db.query(ParticipanteModel).filter(ParticipanteModel.id == id).first()
    if not db_participante:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    
    db_participante.nombre = participante.nombre
    db_participante.email = participante.email
    db_participante.edad = participante.edad
    db_participante.ciudad = participante.ciudad
    db_participante.pais = participante.pais
    db_participante.modalidad = participante.modalidad
    db_participante.tecnologias = participante.tecnologias
    db_participante.nivel = participante.nivel
    db_participante.aceptoTerminos = participante.aceptoTerminos
    
    db.commit()
    db.refresh(db_participante)
    return db_participante

# Endpoint: Eliminar un participante por ID
@app.delete("/participantes/{id}")
def eliminar_participante(id: int, db: Session = Depends(get_db)):
    participante = db.query(ParticipanteModel).filter(ParticipanteModel.id == id).first()
    if not participante:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    db.delete(participante)
    db.commit()
    return {"message": "Participante eliminado correctamente"}

# Health check
@app.get("/")
def read_root():
    return {"message": "API de Participantes activa"}
