# Guía Técnica - Gestor de Participantes TP5M

## 🏗 Arquitectura General

```
Frontend (React + TypeScript + useReducer)
    ↓ (HTTP JSON)
Backend API (FastAPI)
    ↓ (SQL)
MySQL Database (tp5m_db)
```

---

## 🎯 Patrón useReducer + Context API (TP5M)

### Concepto Clave

**En lugar de modificar el estado directamente**, enviamos **acciones** que el reducer procesa.

```typescript
// ❌ ANTES (TP4M - useState)
setEstado(nuevoEstado);

// ✅ AHORA (TP5M - useReducer)
dispatch({ type: "ACCION", payload: dato });
```

### Componentes del Patrón

#### 1. **Reducer** (participantesReducer.ts)
Función que decide cómo cambia el estado

```typescript
function participantesReducer(state, action) {
  switch (action.type) {
    case "AGREGAR":
      return { ...state, participantes: [...state.participantes, action.payload] };
    case "EDITAR":
      return { ...state, participantes: state.participantes.map(p => 
        p.id === action.payload.id ? action.payload : p) };
    // ... más casos
    default:
      return state;
  }
}
```

#### 2. **Actions** (Acciones a ejecutar)
Objetos que describen qué queremos hacer

```typescript
type Action =
  | { type: "GET_PARTICIPANTES"; payload: Participante[] }
  | { type: "AGREGAR"; payload: Participante }
  | { type: "EDITAR"; payload: Participante }
  | { type: "ELIMINAR"; payload: number }
  | { type: "RESET"; payload: Participante[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };
```

#### 3. **Dispatch** (Enviar acciones)
Función que envía la acción al reducer

```typescript
dispatch({ type: "AGREGAR", payload: nuevoParticipante });
dispatch({ type: "ELIMINAR", payload: 5 });
dispatch({ type: "EDITAR", payload: participanteActualizado });
```

### Flujo Completo

```
[Componente]
    ↓
onClick → dispatch(action)
    ↓
[reducer(state, action)]
    ↓
[nuevo estado]
    ↓
[React renderiza]
    ↓
[UI actualizada]
```

---

## 🎯 Backend (Python + FastAPI)

### Estructura

```
backend/
├── main.py          # Endpoints API (4 operaciones)
├── models.py        # Modelos SQLAlchemy (BD)
├── schemas.py       # Esquemas Pydantic (validación)
├── database.py      # Conexión MySQL (tp5m_db)
└── requirements.txt # Dependencias
```

### Endpoints (CRUD Completo)

| Método | Ruta | Función |
|--------|------|---------|
| `GET` | `/participantes` | Obtiene todos los participantes |
| `POST` | `/participantes` | Crea un nuevo participante |
| `PUT` | `/participantes/{id}` | **NUEVO:** Actualiza un participante |
| `DELETE` | `/participantes/{id}` | Elimina un participante |

### Campos de Participante

```python
id: int              # Auto-incrementado
nombre: str          # Requerido
email: str           # Requerido, único
edad: int            # Requerido
ciudad: str          # Requerido
pais: str            # Requerido
modalidad: str       # Presencial, Virtual, Híbrido
tecnologias: str     # Ej: React, Python, Node.js
nivel: str           # Principiante, Intermedio, Avanzado
aceptoTerminos: bool # Boolean
```

### Ejemplos de Endpoints

**GET /participantes:**
```json
[
  {
    "id": 1,
    "nombre": "Juan Perez",
    "email": "juan@example.com",
    "edad": 30,
    "ciudad": "Buenos Aires",
    "pais": "Argentina",
    "modalidad": "Presencial",
    "tecnologias": "React, Node.js",
    "nivel": "Intermedio",
    "aceptoTerminos": true
  }
]
```

**POST /participantes:**
```json
{
  "nombre": "Maria García",
  "email": "maria@example.com",
  "edad": 28,
  "ciudad": "Madrid",
  "pais": "España",
  "modalidad": "Virtual",
  "tecnologias": "Python, Django",
  "nivel": "Avanzado",
  "aceptoTerminos": true
}
```

**PUT /participantes/{id}:**
```json
{
  "nombre": "Maria García",
  "email": "maria.nueva@example.com",
  "edad": 29,
  "ciudad": "Barcelona",
  "pais": "España",
  "modalidad": "Híbrido",
  "tecnologias": "Python, FastAPI",
  "nivel": "Avanzado",
  "aceptoTerminos": true
}
```

### Configuración de Base de Datos

Archivo: `database.py`

```python
DATABASE_URL = "mysql+mysqlconnector://root:root@localhost:3306/tp5m_db"
```

- **Usuario:** root
- **Contraseña:** root
- **Host:** localhost:3306
- **Base de datos:** tp5m_db

### Tabla Participantes

```sql
CREATE TABLE participantes (
    id INTEGER NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    edad INTEGER,
    ciudad VARCHAR(100),
    pais VARCHAR(100),
    modalidad VARCHAR(50),
    tecnologias VARCHAR(500),
    nivel VARCHAR(50),
    aceptoTerminos BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id),
    INDEX ix_participantes_nombre (nombre),
    INDEX ix_participantes_email (email)
)
```

---

## ⚛️ Frontend (React + TypeScript + useReducer)

### Estructura

```
frontend/src/
├── context/
│   └── ParticipantesContext.tsx    # useReducer + Context
├── reducers/
│   └── participantesReducer.ts     # Lógica centralizada (NUEVO)
├── components/
│   ├── Formulario.tsx              # Agregar/Editar con botón dinámico
│   ├── ParticipanteCard.tsx        # Tarjeta con botón Editar
│   └── Filtros.tsx                 # Búsqueda
├── models/
│   └── Participante.ts             # Interfaz con nuevos campos
├── Home.tsx                        # Página principal + edición
└── main.tsx                        # Entry point
```

### Context API con useReducer

**ParticipantesContext.tsx:**

```typescript
interface ContextType {
  participantes: Participante[];
  agregar: (p: Omit<Participante, 'id'>) => Promise<void>;
  eliminar: (id: number) => Promise<void>;
  editar: (p: Participante) => Promise<void>;
  resetear: () => void;
  loading: boolean;
  error: string | null;
  dispatch: (action: Action) => void;
}
```

**Hooks disponibles:**
- ✅ Carga inicial (GET)
- ✅ Agregar participante (POST)
- ✅ Editar participante (PUT) - **NUEVO**
- ✅ Eliminar participante (DELETE)
- ✅ Resetear estado
- ✅ Manejo de loading y errores

### Componentes

#### Formulario.tsx (Actualizado)
- Campos dinámicos: nombre, email, edad, ciudad, país, modalidad, tecnologías, nivel
- **Carga automática** cuando se selecciona un participante para editar
- **Botón dinámico**: "Agregar" o "Actualizar"
- Validación de todos los campos
- Checkbox para términos y condiciones

```typescript
export const Formulario = ({ 
  participanteEditando,     // Participante en edición
  limpiarEdicion            // Callback para limpiar
}: FormularioProps)
```

#### ParticipanteCard.tsx (Actualizado)
- Muestra todos los campos del participante
- **Botón Editar** (azul) - carga datos en formulario
- **Botón Eliminar** (rojo) - elimina del BD

```typescript
<ParticipanteCard
  participante={participante}
  onEditar={handleEditar}
/>
```

#### Home.tsx (Actualizado)
- Estado para `participanteEditando`
- Pasa datos al formulario al hacer click en "Editar"
- Implementa scroll suave al formulario
- Filtro en tiempo real

### Consumo de API

**Con axios dentro del Context:**

```typescript
// GET
const response = await axios.get(`${API_URL}/participantes`);

// POST
const response = await axios.post(`${API_URL}/participantes`, participante);

// PUT (NUEVO)
const response = await axios.put(`${API_URL}/participantes/${id}`, participante);

// DELETE
await axios.delete(`${API_URL}/participantes/${id}`);
```

---

## 🔄 Flujo de Datos Completo

### 1. Cargar Participantes (Inicial)

```
Home montado
    ↓
useEffect → cargarParticipantes()
    ↓
dispatch({ type: "SET_LOADING", payload: true })
    ↓
axios.get('/participantes')
    ↓
dispatch({ type: "GET_PARTICIPANTES", payload: data })
    ↓
Reducer actualiza state.participantes
    ↓
React renderiza ParticipanteCards
```

### 2. Agregar Participante

```
Usuario llena formulario
    ↓
Click "Agregar"
    ↓
Context.agregar() → axios.post()
    ↓
Backend crea registro en MySQL
    ↓
Retorna objeto con ID generado
    ↓
dispatch({ type: "AGREGAR", payload: nuevoParticipante })
    ↓
Reducer: [...state.participantes, action.payload]
    ↓
React renderiza nueva tarjeta
```

### 3. Editar Participante

```
Usuario clickea "Editar" en tarjeta
    ↓
Home.handleEditar(participante)
    ↓
setParticipanteEditando(participante)
    ↓
Home scroll al Formulario
    ↓
Formulario muestra datos cargados
    ↓
Usuario modifica campos
    ↓
Click "Actualizar"
    ↓
Context.editar() → axios.put()
    ↓
Backend actualiza registro en MySQL
    ↓
Retorna participante actualizado
    ↓
dispatch({ type: "EDITAR", payload: actualizado })
    ↓
Reducer: state.participantes.map(p => p.id === id ? actualizado : p)
    ↓
React renderiza tarjeta actualizada
```

### 4. Eliminar Participante

```
Usuario clickea "Eliminar"
    ↓
Confirm dialog
    ↓
Context.eliminar(id) → axios.delete()
    ↓
Backend elimina de MySQL
    ↓
dispatch({ type: "ELIMINAR", payload: id })
    ↓
Reducer: state.participantes.filter(p => p.id !== id)
    ↓
React re-renderiza sin la tarjeta
```

### 5. Filtrar (Cliente)

```
Usuario escribe en buscador
    ↓
Home: setFiltro(texto)
    ↓
participantesFiltrados = participantes.filter(p => 
  p.nombre.includes(filtro) || 
  p.email.includes(filtro) || 
  p.ciudad.includes(filtro) ||
  p.edad.toString().includes(filtro)
)
    ↓
React renderiza solo los filtrados (sin peticiones al servidor)
```

---

## 🎯 Ventajas de useReducer vs useState

| Aspecto | useState | useReducer |
|--------|---------|-----------|
| **Complejidad** | Simple | Compleja |
| **Escalabilidad** | Limitada | Excelente |
| **Lógica** | Dispersa | Centralizada |
| **Testing** | Difícil | Fácil |
| **Bugs** | Más probables | Menos probables |
| **Estado múltiple** | Confuso | Claro |
| **Mantenimiento** | Difícil | Fácil |

### Caso Ideal para useReducer

✅ **Estado complejo** con múltiples campos  
✅ **Muchas acciones** (CRUD)  
✅ **Lógica interdependiente** entre campos  
✅ **Necesidad de historial** de cambios  
✅ **Proyectos escalables** y grandes  

---

## 📦 Dependencias

### Backend

```
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
mysql-connector-python==8.2.0
pydantic==2.5.0
python-dotenv==1.0.0
```

### Frontend

```
react@^18.2.0
react-dom@^18.2.0
axios@^1.6.0
vite@^5.0.0
typescript@^5.3.0
```

---

## 🔐 CORS

Configurado en `main.py` para permitir:
- `http://localhost:5173` (desarrollo)
- `http://localhost:3000` (alternativo)

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🎨 Estilos

### Home
- Fondo: #f5f5f5
- Header: #2196F3 (azul)

### Formulario
- Fondo: blanco (#ffffff)
- Botón: verde (#4CAF50)
- Grid: 2 columnas en desktop

### Tarjetas
- Grid: 3 columnas
- Bordes: verde (#4CAF50)
- Botón Editar: azul (#2196F3)
- Botón Eliminar: rojo (#f44336)

---

## 🔧 Debugging

### Console Logs

**En reducers/participantesReducer.ts:**
```typescript
export function participantesReducer(state, action) {
  console.log('Action:', action);
  console.log('State anterior:', state);
  // ... lógica
  console.log('State nuevo:', newState);
  return newState;
}
```

### React DevTools

Instala **React DevTools** en Chrome/Firefox para ver:
- Cambios de estado
- Props de componentes
- Render performance

### Verificar en MySQL

```bash
# Terminal
mysql -u root -proot -e "SELECT * FROM tp5m_db.participantes;"
```

---

## 📝 Notas Técnicas

- **useReducer** centraliza la lógica del estado
- **Context API** distribuye el estado a los componentes
- **Axios** hace las peticiones HTTP
- **FastAPI** valida automáticamente con Pydantic
- **MySQL** persiste los datos
- **Vite** bundlea el código de forma ultrarrápida

---

## 🚀 Optimizaciones Futuras

1. Agregar paginación si hay muchos participantes
2. Agregar búsqueda avanzada con filtros
3. Exportar datos a CSV/PDF
4. Validación más robusta en el backend
5. Autenticación de usuarios
6. Tests automatizados (Jest, Pytest)
7. Despliegue en la nube (Vercel, Heroku, Azure)

---

## 📚 Referencias

- **React useReducer:** https://react.dev/reference/react/useReducer
- **FastAPI:** https://fastapi.tiangolo.com/
- **Axios:** https://axios-http.com/
- **SQLAlchemy:** https://docs.sqlalchemy.org/
- **TypeScript:** https://www.typescriptlang.org/

---

**Última actualización:** TP5M - Gestión de Estado con useReducer + Context
