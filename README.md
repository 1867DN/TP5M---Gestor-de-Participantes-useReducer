# Gestor de Participantes - TP5M

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?style=flat-square&logo=fastapi)
![MySQL](https://img.shields.io/badge/MySQL-5.7+-4479A1?style=flat-square&logo=mysql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=flat-square&logo=vite)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python)
![useReducer](https://img.shields.io/badge/useReducer-React_Hook-61DAFB?style=flat-square)

**Una aplicación full-stack para gestionar participantes de eventos con backend API REST, frontend moderno y gestión centralizada de estado con useReducer.**

[Características](#características) • [Instalación](#instalación-rápida) • [API](#api-endpoints) • [Arquitectura](#arquitectura) • [Tecnologías](#tecnologías)

</div>

---

## 📋 Descripción

**Gestor de Participantes - TP5M** es la evolución del TP4M que implementa **useReducer + Context API** para centralizar la lógica de estado. Desarrollado como Trabajo Práctico para entender patrones avanzados de manejo de estado en React.

La aplicación permite:
- ✅ Agregar nuevos participantes con información completa
- ✅ Visualizar lista de participantes con múltiples campos
- ✅ **Editar participantes** (carga automática de datos en formulario)
- ✅ Buscar y filtrar en tiempo real
- ✅ Eliminar participantes
- ✅ Persistencia centralizada con useReducer + Context API
- ✅ Backend con gestión de transacciones MySQL

---

## 🎯 Características

| Feature | Descripción |
|---------|------------|
| 🔄 **CRUD Completo** | Crear, leer, actualizar y eliminar participantes |
| 🔍 **Búsqueda en Tiempo Real** | Filtra participantes por múltiples campos |
| ✏️ **Edición de Participantes** | Carga datos automáticamente al hacer click en Editar |
| 📱 **UI Responsiva** | Grid 3x3 de tarjetas con diseño limpio |
| 🏗️ **useReducer + Context** | Gestión centralizada de estado (TP5M) |
| 🌐 **API REST** | Endpoints bien documentados con CRUD completo |
| 💾 **Persistencia** | Datos guardados en MySQL automáticamente |
| 🔐 **CORS Habilitado** | Comunicación segura frontend-backend |
| 📊 **Campos Extendidos** | País, Modalidad, Tecnologías, Nivel, Términos |

---

## 🚀 Instalación Rápida

### Opción 1: Script Automático (Recomendado)

```bash
cd tp5M/autom
run.bat
```

Esto hace automáticamente:
- ✅ Verifica MySQL (usuario: root, contraseña: root)
- ✅ Crea la base de datos tp5m_db
- ✅ Instala dependencias Python y Node.js
- ✅ Levanta Backend FastAPI (puerto 8000)
- ✅ Levanta Frontend React (puerto 5173)
- ✅ Abre el navegador automáticamente

### Opción 2: Manual Paso a Paso

**Crear la BD:**
```bash
# En MySQL Workbench o terminal
mysql -u root -proot -e "CREATE DATABASE tp5m_db;"
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend (en otra terminal):**
```bash
cd frontend
npm install
npm run dev
```

Luego abre http://localhost:5173

---

## 🏗️ Arquitectura (TP5M)

### Flujo useReducer + Context

```
Componente
    ↓
dispatch(action)
    ↓
reducer(state, action)
    ↓
nuevo estado
    ↓
React renderiza
```

### Acciones del Reducer

```typescript
type Action =
  | { type: "GET_PARTICIPANTES"; payload: Participante[] }
  | { type: "AGREGAR"; payload: Participante }
  | { type: "EDITAR"; payload: Participante }
  | { type: "ELIMINAR"; payload: number }
  | { type: "RESET"; payload: Participante[] }
  | { type: "SET"; payload: Participante[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };
```

---

## 📁 Estructura del Proyecto

```
tp5M/
├── autom/
│   ├── run.bat                     # Arranca backend, frontend y navegador
│   ├── seed_participantes.bat      # Agrega 10 participantes de prueba
│   └── seed_participantes.py       # Script Python del seed
│
├── backend/
│   ├── main.py                 # API FastAPI (4 endpoints)
│   ├── models.py               # Modelos SQLAlchemy
│   ├── schemas.py              # Validación Pydantic
│   ├── database.py             # Configuración MySQL (lee desde .env)
│   ├── requirements.txt        # Dependencias Python
│   ├── create_db.sql           # Script SQL (tp5m_db)
│   └── .env                    # Credenciales de base de datos
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── ParticipantesContext.tsx    # Context + useReducer
│   │   ├── reducers/
│   │   │   └── participantesReducer.ts     # Lógica centralizada
│   │   ├── components/
│   │   │   ├── Formulario.tsx              # Agregar/Editar con botón dinámico
│   │   │   └── ParticipanteCard.tsx        # Tarjeta con botones Editar/Eliminar
│   │   ├── models/
│   │   │   └── Participante.ts             # Interface extendida
│   │   ├── Home.tsx                        # Manejo de edición y filtro
│   │   └── main.tsx                        # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── GUÍA_TÉCNICA.md             # Documentación técnica
├── INSTALACIÓN_Y_USO.md        # Guía paso a paso
└── README.md                   # Este archivo
```

---

## 🌐 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|------------|
| `GET` | `/participantes` | Obtiene todos los participantes |
| `POST` | `/participantes` | Crea un nuevo participante |
| `PUT` | `/participantes/{id}` | **NUEVO:** Actualiza un participante |
| `DELETE` | `/participantes/{id}` | Elimina un participante |

### Ejemplo de Datos

**GET /participantes**
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

**POST /participantes**
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

**PUT /participantes/{id}** (Actualizar)
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

---

## 💻 Tecnologías

### Backend
- **FastAPI 0.104.1** - Framework web moderno
- **SQLAlchemy 2.0** - ORM para SQL
- **Pydantic 2.5** - Validación de datos
- **MySQL** - Base de datos relacional
- **Uvicorn** - Servidor ASGI

### Frontend
- **React 18.2** - Librería UI
- **TypeScript 5.3** - Tipado estático
- **Vite 5.0** - Build tool ultrarrápido
- **Axios** - Cliente HTTP
- **useReducer** - Gestión centralizada de estado
- **Context API** - Distribución del estado

---

## 🎓 Conceptos Clave TP5M

### useReducer vs useState

**Antes (TP4M):**
```typescript
const [participantes, setParticipantes] = useState([]);
const agregar = (p) => setParticipantes([...participantes, p]);
```

**Ahora (TP5M):**
```typescript
const [state, dispatch] = useReducer(participantesReducer, initialState);
dispatch({ type: "AGREGAR", payload: participante });
```

### Ventajas

✅ Lógica centralizada en un reducer  
✅ Fácil de testear y mantener  
✅ Escalable para aplicaciones complejas  
✅ Historial de cambios claro  
✅ Previene bugs sutiles de estado  

---

## 📊 Verificar Datos en MySQL

```sql
-- Ver todos los participantes
SELECT * FROM tp5m_db.participantes;

-- Contar participantes
SELECT COUNT(*) FROM tp5m_db.participantes;

-- Ver estructura de tabla
DESCRIBE tp5m_db.participantes;

-- Buscar por modalidad
SELECT * FROM tp5m_db.participantes WHERE modalidad = 'Virtual';
```

---

## 🔧 Comandos Útiles

```bash
# Abrir la aplicación
autom\run.bat

# Agregar participantes de prueba (con el backend corriendo)
autom\seed_participantes.bat

# Eliminar base de datos (si necesitas reiniciar)
# En MySQL Workbench:
DROP DATABASE tp5m_db;

# Reiniciar IDs
ALTER TABLE tp5m_db.participantes AUTO_INCREMENT = 1;
```

---

## 🎨 Pantalla Principal

- **Header azul** con título "Gestor de Participantes - TP5M"
- **Formulario dinámico** que cambia entre "Agregar" y "Actualizar"
- **Buscador** en tiempo real (nombre, email, ciudad, país, modalidad, tecnologías, nivel, edad)
- **Grid 3x3** de tarjetas verdes con información completa
- **Botones dual**: Editar (azul) + Eliminar (rojo)
- **Carga automática** de datos al hacer click en Editar

---

## 📚 Documentación

- [GUÍA_TÉCNICA.md](./GUÍA_TÉCNICA.md) - useReducer, endpoints, arquitectura
- [INSTALACIÓN_Y_USO.md](./INSTALACIÓN_Y_USO.md) - Paso a paso detallado

---

## ⚙️ Requisitos

- Python 3.10+
- Node.js 16+
- MySQL 5.7+
- Git

---

## 🔗 URLs Locales

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:8000
- **MySQL:** localhost:3306 (tp5m_db)

---

## 📝 Notas Importantes

- Los datos se guardan automáticamente en MySQL
- El formulario carga datos automáticamente al editar
- El botón cambia de "Agregar" a "Actualizar" según el contexto
- Filtro en tiempo real sin recargar página
- CORS configurado para localhost
- Los IDs son auto-incrementales
- Estado centralizado con useReducer para mejor mantenibilidad

---

## 👤 Autor

**Leandro Nuñez (1867DN)** - TP5M

---

<div align="center">

**Hecho con ❤️ para TP5M - Programación 4**

*Gestión de Estado con useReducer + Context*

</div>
