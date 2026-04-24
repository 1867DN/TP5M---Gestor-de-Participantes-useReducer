# Gestor de Participantes TP5M - Instalación y Uso

## 🚀 Inicio Rápido (Recomendado)

### Opción 1: Script Automático (Windows)

1. **Abre una terminal en la carpeta `tp5M`**
2. **Ejecuta:**
```bash
autom\run.bat
```

El script hará automáticamente:
- ✅ Verifica que MySQL esté corriendo
- ✅ Crea la base de datos `tp5m_db`
- ✅ Instala dependencias (pip + npm)
- ✅ Inicia Backend FastAPI (puerto 8000)
- ✅ Inicia Frontend React (puerto 5173)
- ✅ Abre el navegador automáticamente

**Requisitos previos:**
- MySQL debe estar ejecutándose (usuario: `root`, contraseña: `root`)
- Python 3.10+ instalado
- Node.js 16+ instalado

---

## 📋 Instalación Manual Paso a Paso

Si prefieres hacerlo manualmente o en macOS/Linux:

### Paso 1: Crear la Base de Datos

**En MySQL Workbench o terminal:**
```bash
# Terminal
mysql -u root -proot -e "CREATE DATABASE tp5m_db;"

# O en MySQL Workbench
CREATE DATABASE tp5m_db;
```

### Paso 2: Instalar Dependencias

#### Backend (Python)
```bash
cd backend
pip install -r requirements.txt
```

#### Frontend (Node.js)
```bash
cd frontend
npm install
```

### Paso 3: Ejecutar en Terminales Separadas

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn main:app --reload
```
✅ Se ejecutará en: `http://127.0.0.1:8000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Se ejecutará en: `http://localhost:5173`

Luego abre http://localhost:5173 en tu navegador.

---

## 🎯 Uso de la Aplicación

### Agregar Participante

1. Llena el formulario "Registro de Participantes":
   - **Nombre** *
   - **Email** *
   - **Edad** *
   - **País** *
   - **Ciudad** *
   - **Modalidad** (Presencial, Virtual, Híbrido)
   - **Tecnologías** (Ej: React, Python, Node.js)
   - **Nivel** (Principiante, Intermedio, Avanzado)
   - ☑️ **Acepto los términos** (requerido)

2. Clickea **"Agregar"**
3. Aparecerá automáticamente en la lista

### Editar Participante (NUEVO en TP5M)

1. Encuentra la tarjeta del participante
2. Clickea **"Editar"** (botón azul)
3. El formulario se cargará automáticamente con los datos
4. El botón cambiará a **"Actualizar"**
5. Modifica los campos que desees
6. Clickea **"Actualizar"**
7. La tarjeta se actualizará inmediatamente

### Buscar Participante

- Usa la barra de búsqueda para filtrar por:
  - Nombre, Email, Ciudad, País
  - Modalidad, Tecnologías, Nivel, Edad

La búsqueda es **en tiempo real** sin recargar la página.

### Eliminar Participante

1. Encuentra la tarjeta del participante
2. Clickea **"Eliminar"** (botón rojo)
3. Confirma la eliminación
4. Se eliminará inmediatamente de la BD

---

## 🗂️ Estructura de Carpetas

```
tp5M/
├── autom/
│   ├── run.bat                   # Arranca backend, frontend y navegador
│   ├── seed_participantes.bat    # Agrega 10 participantes de prueba
│   └── seed_participantes.py     # Script Python del seed
├── backend/
│   ├── main.py               # API FastAPI
│   ├── models.py             # Modelos de BD
│   ├── schemas.py            # Validación
│   ├── database.py           # Conexión MySQL (lee desde .env)
│   ├── requirements.txt      # Dependencias
│   ├── create_db.sql         # Script SQL
│   └── .env                  # Credenciales de base de datos
├── frontend/
│   ├── src/
│   │   ├── context/          # ParticipantesContext
│   │   ├── reducers/         # participantesReducer
│   │   ├── components/       # Formulario, ParticipanteCard
│   │   ├── models/           # Interfaces
│   │   └── Home.tsx
│   ├── package.json
│   └── vite.config.ts
├── README.md
├── GUÍA_TÉCNICA.md
└── INSTALACIÓN_Y_USO.md
```

---

## 📊 Verificar en MySQL

**Abre MySQL Workbench o terminal y ejecuta:**

```sql
-- Ver todos los participantes
SELECT * FROM tp5m_db.participantes;

-- Contar participantes
SELECT COUNT(*) FROM tp5m_db.participantes;

-- Ver estructura de tabla
DESCRIBE tp5m_db.participantes;

-- Buscar por modalidad
SELECT * FROM tp5m_db.participantes WHERE modalidad = 'Virtual';

-- Ver tecnologías
SELECT nombre, tecnologias FROM tp5m_db.participantes;
```

---

## 🔧 Comandos Útiles

### Abrir la aplicación
```bash
autom\run.bat
```

### Agregar participantes de prueba
```bash
autom\seed_participantes.bat
```
(Requiere que el backend esté corriendo)

### Verificar que MySQL está corriendo
```bash
mysql -u root -proot -e "SELECT 1;"
```

### Eliminar la base de datos (para reiniciar)
```bash
mysql -u root -proot -e "DROP DATABASE tp5m_db;"
```

### Reiniciar IDs de tabla
```sql
ALTER TABLE tp5m_db.participantes AUTO_INCREMENT = 1;
```

### Ver logs del backend
```bash
cd backend
uvicorn main:app --reload --log-level=debug
```

---

## 🐛 Solución de Problemas

### Error: "MySQL no está ejecutándose"
- Abre MySQL Workbench
- O ejecuta: `mysql -u root -proot` en terminal

### Error: "ConnectionError" al agregar participante
- Verifica que el backend esté corriendo (puerto 8000)
- Abre: http://localhost:8000/participantes en el navegador

### No aparecen los participantes al cargar
- Abre la consola del navegador (F12)
- Verifica si hay errores de CORS
- Revisa que el backend esté corriendo

### El formulario no carga datos al editar
- Verifica que hayas clickeado el botón "Editar"
- Abre la consola del navegador para ver errores

---

## 📱 Pantalla de la Aplicación

```
┌─────────────────────────────────────────────────────┐
│  GESTOR DE PARTICIPANTES - TP5M                     │
│  Administra los participantes de tu evento          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ REGISTRO DE PARTICIPANTES                           │
│ [Nombre] [Email] [Edad] [País]                     │
│ [Ciudad] [Modalidad] [Tecnologías] [Nivel]         │
│ ☑ Acepto términos  [Agregar/Actualizar]            │
└─────────────────────────────────────────────────────┘

[Buscar por nombre, email, ciudad o edad...]
Mostrando X de Y participantes

┌─────────────┬─────────────┬─────────────┐
│ Juan Perez  │ Maria García│ Luis Negri  │
│ Argentina   │ España      │ Brasil      │
│ Presencial  │ Virtual     │ Virtual     │
│ Intermedio  │ Avanzado    │ Principiante│
│ [Editar]... │ [Editar]... │ [Editar]... │
└─────────────┴─────────────┴─────────────┘
```

---

## 🌐 URLs

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| MySQL | localhost:3306 |
| API Docs | http://localhost:8000/docs |

---

## ✅ Checklist de Instalación

- [ ] MySQL instalado y corriendo
- [ ] Python 3.10+ instalado
- [ ] Node.js 16+ instalado
- [ ] Proyecto descargado
- [ ] run.bat ejecutado (o instalación manual completada)
- [ ] Backend corriendo en puerto 8000
- [ ] Frontend corriendo en puerto 5173
- [ ] Navegador abierto en http://localhost:5173
- [ ] Puedo agregar participantes
- [ ] Puedo editar participantes
- [ ] Puedo eliminar participantes
- [ ] Puedo buscar participantes

---

## 📚 Documentación

- **README.md** - Descripción general del proyecto
- **GUÍA_TÉCNICA.md** - Arquitectura, patrones y flujos
- **INSTALACIÓN_Y_USO.md** - Este archivo

---

## 🎓 Conceptos Clave TP5M

### useReducer + Context API
La aplicación usa **useReducer** para centralizar la lógica de estado en lugar de múltiples **useState**.

**Ventajas:**
✅ Lógica centralizada  
✅ Escalable  
✅ Fácil de testear  
✅ Previene bugs sutiles  

### Nuevo Endpoint
Se agregó **PUT /participantes/{id}** para la edición.

### Nuevos Campos
Se agregaron: país, modalidad, tecnologías, nivel, aceptoTerminos.

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en el navegador (F12 → Console)
2. Revisa los logs en la terminal del backend
3. Verifica que MySQL esté corriendo
4. Consulta GUÍA_TÉCNICA.md para entender la arquitectura

---

**Última actualización:** TP5M - Gestión de Estado con useReducer + Context
