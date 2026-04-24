# ✅ Verificación de Requisitos TP5M

## 📋 Basado en el PDF - Práctico N° 5: "Gestión de Estado con useReducer + Context"

---

## 🎯 Objetivo Principal: "¿Qué pasa cuando la lógica del estado empieza a crecer mucho?"

El TP5M resuelve el problema de **código disperso y difícil de mantener** implementando **useReducer**.

### Problemática Original (TP4M):
- ❌ Lógica de estado dispersa en múltiples componentes
- ❌ Difícil de escalar
- ❌ Difícil de mantener

### Solución Implementada (TP5M):
- ✅ **Reducer centralizado** en `participantesReducer.ts`
- ✅ **Lógica unificada** usando dispatch + actions
- ✅ **Escalable y mantenible**

---

## ✅ Requisitos del TP Cumplidos

### 1️⃣ **Reemplazar useState por useReducer**
**Estado:** ✅ CUMPLIDO

```typescript
// TP5M - ParticipantesContext.tsx
const [state, dispatch] = useReducer(participantesReducer, initialState);

// En lugar de:
// const [participantes, setParticipantes] = useState([]);
// const [loading, setLoading] = useState(false);
```

**Ubicación:** [frontend/src/context/ParticipantesContext.tsx](frontend/src/context/ParticipantesContext.tsx)

---

### 2️⃣ **Centralizar la lógica de participantes**
**Estado:** ✅ CUMPLIDO

**Archivo:** `frontend/src/reducers/participantesReducer.ts`

```typescript
export type Action =
  | { type: "GET_PARTICIPANTES"; payload: Participante[] }
  | { type: "AGREGAR"; payload: Participante }
  | { type: "EDITAR"; payload: Participante }      // ← NUEVO
  | { type: "ELIMINAR"; payload: number }
  | { type: "RESET"; payload: Participante[] }
  | { type: "SET"; payload: Participante[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };
```

**8 tipos de acciones** centralizadas, **una sola fuente de verdad**.

---

### 3️⃣ **Integrar useReducer con Context**
**Estado:** ✅ CUMPLIDO

```typescript
export const ParticipantesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(participantesReducer, initialState);
  
  return (
    <ParticipantesContext.Provider
      value={{
        participantes: state.participantes,
        agregar,
        editar,    // ← NUEVO
        eliminar,
        resetear,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ParticipantesContext.Provider>
  );
};
```

---

### 4️⃣ **Mantener persistencia con JSON y Database**
**Estado:** ✅ CUMPLIDO

- ✅ **MySQL:** Base de datos `tp5m_db` con tabla `participantes`
- ✅ **Backend:** FastAPI con 4 endpoints (GET, POST, PUT, DELETE)
- ✅ **Autenticidad:** Los datos se guardan automáticamente en BD

**Endpoints:**
- `GET /participantes` → Obtiene todos
- `POST /participantes` → Crea nuevo
- `PUT /participantes/{id}` → Actualiza (NUEVO)
- `DELETE /participantes/{id}` → Elimina

---

### 5️⃣ **Nueva Funcionalidad: Editar Participante**
**Estado:** ✅ CUMPLIDO

**Requisito del PDF:**
> "Deberá agregar una nueva funcionalidad que permita editar un participante. Al hacer click sobre el botón "Editar", los datos del participante se deberán cargar automáticamente en el Formulario, y tras la modificación de alguno de sus datos y su correspondiente almacenamiento se actualizará la tarjeta con la nueva información."

**Implementación:**

#### A. Botón Editar en ParticipanteCard
```typescript
<button onClick={() => onEditar(participante)} style={styles.editButton}>
  Editar
</button>
```
**Ubicación:** [frontend/src/components/ParticipanteCard.tsx](frontend/src/components/ParticipanteCard.tsx)

#### B. Carga Automática de Datos en Formulario
```typescript
useEffect(() => {
  if (participanteEditando) {
    setFormData({
      nombre: participanteEditando.nombre,
      email: participanteEditando.email,
      edad: participanteEditando.edad.toString(),
      // ... todos los campos
    });
  }
}, [participanteEditando]);
```
**Ubicación:** [frontend/src/components/Formulario.tsx](frontend/src/components/Formulario.tsx)

#### C. Botón Dinámico (Agregar/Actualizar)
```typescript
const isEditing = !!participanteEditando;
const buttonText = isEditing ? 'Actualizar' : 'Agregar';

<button type="submit" style={styles.button}>
  {buttonText}
</button>
```
**Ubicación:** [frontend/src/components/Formulario.tsx](frontend/src/components/Formulario.tsx)

#### D. Backend: Endpoint PUT
```python
@app.put("/participantes/{id}", response_model=Participante)
def actualizar_participante(id: int, participante: ParticipanteUpdate, db: Session = Depends(get_db)):
    db_participante = db.query(ParticipanteModel).filter(ParticipanteModel.id == id).first()
    if not db_participante:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    
    db_participante.nombre = participante.nombre
    db_participante.email = participante.email
    # ... todos los campos
    
    db.commit()
    db.refresh(db_participante)
    return db_participante
```
**Ubicación:** [backend/main.py](backend/main.py)

---

### 6️⃣ **Nuevos Campos del Modelo**
**Estado:** ✅ CUMPLIDO

Se agregaron 5 nuevos campos al Participante:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `pais` | string | País del participante |
| `modalidad` | string | Presencial, Virtual, Híbrido |
| `tecnologias` | string | Tecnologías que domina |
| `nivel` | string | Principiante, Intermedio, Avanzado |
| `aceptoTerminos` | boolean | Aceptación de términos |

**Cambios en:**
- ✅ [backend/models.py](backend/models.py) - SQLAlchemy model
- ✅ [backend/schemas.py](backend/schemas.py) - Pydantic schemas
- ✅ [frontend/src/models/Participante.ts](frontend/src/models/Participante.ts) - TypeScript interface
- ✅ [frontend/src/components/Formulario.tsx](frontend/src/components/Formulario.tsx) - Inputs nuevos
- ✅ [frontend/src/components/ParticipanteCard.tsx](frontend/src/components/ParticipanteCard.tsx) - Visualización
- ✅ [create_db.sql](create_db.sql) - Estructura BD

---

## 📊 Resumen Técnico

### Flujo Completo de Edición (Ejemplo)

```
1. Usuario hace click en "Editar" de ParticipanteCard
   ↓
2. Componente Home recibe callback handleEditar(participante)
   ↓
3. Home ejecuta setParticipanteEditando(participante)
   ↓
4. Formulario recibe prop participanteEditando
   ↓
5. useEffect en Formulario detecta cambio y carga datos
   ↓
6. Usuario modifica campos del formulario
   ↓
7. Usuario hace click en "Actualizar"
   ↓
8. Formulario ejecuta editar() desde Context
   ↓
9. Context hace PUT request a Backend
   ↓
10. Backend actualiza en MySQL
   ↓
11. Context dispatch({ type: "EDITAR", payload: participanteActualizado })
   ↓
12. Reducer actualiza state.participantes
   ↓
13. React renderiza ParticipanteCard con datos nuevos
   ↓
14. UI se actualiza automáticamente
```

---

## 🏗 Estructura de Archivos (TP5M)

```
tp5M/
├── backend/
│   ├── main.py              ✅ 4 endpoints (GET, POST, PUT, DELETE)
│   ├── models.py            ✅ Con 10 campos (5 nuevos)
│   ├── schemas.py           ✅ ParticipanteCreate + ParticipanteUpdate
│   ├── database.py          ✅ Conexión tp5m_db
│   └── requirements.txt
│
├── frontend/
│   └── src/
│       ├── reducers/
│       │   └── participantesReducer.ts    ✅ 8 tipos de acciones
│       ├── context/
│       │   └── ParticipantesContext.tsx   ✅ useReducer + dispatch
│       ├── models/
│       │   └── Participante.ts            ✅ 10 campos
│       ├── components/
│       │   ├── Formulario.tsx             ✅ Carga automática + botón dinámico
│       │   └── ParticipanteCard.tsx       ✅ Botón Editar + mostrar campos
│       ├── Home.tsx                       ✅ Maneja estado de edición
│       └── main.tsx                       ✅ ParticipantesProvider
│
├── create_db.sql            ✅ Estructura completa tp5m_db
├── run.bat                  ✅ Script automático
├── .env                     ✅ Configuración BD
├── README.md                ✅ Documentación general
├── GUÍA_TÉCNICA.md          ✅ Patrón useReducer explicado
└── INSTALACIÓN_Y_USO.md     ✅ Guía de inicio
```

---

## ✅ Checklist Final

- [x] useReducer reemplaza useState
- [x] Centralización de lógica en reducer
- [x] Context API integrado
- [x] Persistencia en MySQL
- [x] Funcionalidad Edit implementada
- [x] Carga automática de datos
- [x] Botón dinámico (Agregar/Actualizar)
- [x] Backend PUT endpoint
- [x] 5 nuevos campos agregados
- [x] Documentación actualizada a TP5M
- [x] Database tp5m_db (no tp4m_db)
- [x] run.bat funcional

---

## 🚀 Próximos Pasos

1. **Ejecutar:** `run.bat` en la carpeta tp5M
2. **Esperar:** Que se creen todas las ventanas (Backend + Frontend)
3. **Probar:** Agregar, editar y eliminar participantes
4. **Verificar:** Datos en MySQL: `SELECT * FROM tp5m_db.participantes;`

¡**TP5M listo para usar!** ✅
