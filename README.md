# Gestor de Participantes - TP4M

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?style=flat-square&logo=fastapi)
![MySQL](https://img.shields.io/badge/MySQL-5.7+-4479A1?style=flat-square&logo=mysql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=flat-square&logo=vite)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python)

**Una aplicación full-stack para gestionar participantes de eventos con backend API REST y frontend moderno.**

[Características](#características) • [Instalación](#instalación-rápida) • [API](#api-endpoints) • [Estructura](#estructura-del-proyecto) • [Tecnologías](#tecnologías)

</div>

---

## 📋 Descripción

**Gestor de Participantes** es una aplicación web completa desarrollada como Trabajo Práctico para gestionar participantes de eventos. Utiliza una arquitectura moderna con frontend en React + TypeScript y backend en FastAPI con base de datos MySQL.

La aplicación permite:
- ✅ Agregar nuevos participantes
- ✅ Visualizar lista completa de participantes
- ✅ Buscar y filtrar por nombre, email, ciudad o edad
- ✅ Eliminar participantes
- ✅ Persistencia de datos en MySQL

---

## 🎯 Características

| Feature | Descripción |
|---------|------------|
| 🔄 **CRUD Completo** | Crear, leer, actualizar y eliminar participantes |
| 🔍 **Búsqueda en Tiempo Real** | Filtra participantes por múltiples campos |
| 📱 **UI Responsiva** | Grid 3x3 de tarjetas con diseño limpio |
| 🌐 **API REST** | Endpoints bien documentados y fáciles de usar |
| 💾 **Persistencia** | Datos guardados en MySQL automáticamente |
| ⚡ **Context API** | Estado global sin necesidad de Redux |
| 🔐 **CORS Habilitado** | Comunicación segura frontend-backend |

---

## 🚀 Instalación Rápida

### Opción 1: Script Automático (Recomendado)

```bash
cd tp4M
run.bat
```

Esto hace automáticamente:
- ✅ Crea la base de datos
- ✅ Instala dependencias
- ✅ Levanta Backend y Frontend
- ✅ Abre el navegador en `http://localhost:5173`

### Opción 2: Manual Paso a Paso

**Crear la BD:**
```bash
# En MySQL Workbench
CREATE DATABASE tp4m_db;
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

---

## 🏗️ Estructura del Proyecto

```
tp4M/
├── backend/
│   ├── main.py                 # API FastAPI con 3 endpoints
│   ├── models.py               # Modelos SQLAlchemy
│   ├── schemas.py              # Validación Pydantic
│   ├── database.py             # Configuración MySQL
│   ├── requirements.txt         # Dependencias Python
│   └── .env                    # Variables de entorno
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── ParticipantesContext.tsx    # Context API global
│   │   ├── components/
│   │   │   ├── Formulario.tsx              # Form agregar participante
│   │   │   ├── ParticipanteCard.tsx        # Tarjeta de participante
│   │   │   └── Filtros.tsx                 # Búsqueda
│   │   ├── models/
│   │   │   └── Participante.ts             # Interfaz TypeScript
│   │   ├── Home.tsx                        # Página principal
│   │   └── main.tsx                        # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── run.bat                     # Script de ejecución automática
├── create_db.sql               # Script SQL para BD
├── INSTALACIÓN_Y_USO.md        # Guía de instalación
├── GUÍA_TÉCNICA.md             # Documentación técnica
└── README.md                   # Este archivo
```

---

## 🌐 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|------------|
| `GET` | `/participantes` | Obtiene todos los participantes |
| `POST` | `/participantes` | Crea un nuevo participante |
| `DELETE` | `/participantes/{id}` | Elimina un participante |

### Ejemplos

**GET /participantes**
```json
[
  {
    "id": 1,
    "nombre": "Leandro Nuñez",
    "email": "leandro@example.com",
    "edad": 24,
    "ciudad": "Los Corralitos"
  }
]
```

**POST /participantes**
```json
{
  "nombre": "Juan",
  "email": "juan@example.com",
  "edad": 25,
  "ciudad": "Buenos Aires"
}
```

---

## 💻 Tecnologías

### Backend
- **FastAPI** - Framework web moderno y rápido
- **SQLAlchemy** - ORM para SQL
- **Pydantic** - Validación de datos
- **MySQL** - Base de datos relacional
- **Uvicorn** - Servidor ASGI

### Frontend
- **React 18.2** - Librería UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Axios** - Cliente HTTP
- **Context API** - Gestión de estado

---

## 📊 Verificar Datos en MySQL

```sql
-- Ver todos los participantes
SELECT * FROM tp4m_db.participantes;

-- Contar participantes
SELECT COUNT(*) FROM tp4m_db.participantes;

-- Ver estructura de tabla
DESCRIBE tp4m_db.participantes;
```

---

## 🔧 Comandos Útiles

```bash
# Abrir la aplicación
run.bat

# Eliminar base de datos (si necesitas reiniciar)
# En MySQL Workbench:
DROP DATABASE tp4m_db;

# Reiniciar IDs
ALTER TABLE tp4m_db.participantes AUTO_INCREMENT = 1;
```

---

## 📱 Pantalla Principal

- **Header azul** con título y descripción
- **Formulario** para agregar participantes
- **Buscador** en tiempo real por nombre, email, ciudad o edad
- **Grid 3x3** de tarjetas con bordes verdes
- **Contador** de participantes mostrados
- **Botones rojo** para eliminar

---

## 📚 Documentación

- [INSTALACIÓN_Y_USO.md](./INSTALACIÓN_Y_USO.md) - Guía paso a paso
- [GUÍA_TÉCNICA.md](./GUÍA_TÉCNICA.md) - Arquitectura y detalles técnicos

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
- **MySQL:** localhost:3306 (tp4m_db)

---

## 📝 Notas Importantes

- Los datos se guardan automáticamente en MySQL
- No necesita recargar la página para ver cambios
- El filtro es en tiempo real
- CORS configurado para localhost
- Los IDs son auto-incrementales

---

## 👤 Autor

**1867DN** - [GitHub Profile](https://github.com/1867DN)

---

<div align="center">

**Hecho con ❤️ para el TP4M - Programación 4**

</div>
