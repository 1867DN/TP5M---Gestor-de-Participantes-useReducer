import urllib.request
import json

API_URL = "http://localhost:8000/participantes"

participantes = [
    {"nombre": "Carlos Mendez",     "email": "carlos.mendez@email.com",     "edad": 25, "ciudad": "Buenos Aires", "pais": "Argentina",      "modalidad": "Presencial", "tecnologias": "Python, Django",       "nivel": "Intermedio",    "aceptoTerminos": True},
    {"nombre": "Sofia Rodriguez",   "email": "sofia.rodriguez@email.com",   "edad": 22, "ciudad": "Cordoba",      "pais": "Argentina",      "modalidad": "Virtual",    "tecnologias": "React, JavaScript",    "nivel": "Principiante",  "aceptoTerminos": True},
    {"nombre": "Lucas Martini",     "email": "lucas.martini@email.com",     "edad": 30, "ciudad": "Milano",       "pais": "Italia",         "modalidad": "Hibrido",    "tecnologias": "Java, Spring Boot",    "nivel": "Avanzado",      "aceptoTerminos": True},
    {"nombre": "Emma Johnson",      "email": "emma.johnson@email.com",      "edad": 27, "ciudad": "New York",     "pais": "Estados Unidos", "modalidad": "Virtual",    "tecnologias": "React, Node.js",       "nivel": "Avanzado",      "aceptoTerminos": True},
    {"nombre": "Alejandro Garcia",  "email": "alejandro.garcia@email.com",  "edad": 35, "ciudad": "Madrid",       "pais": "España",         "modalidad": "Presencial", "tecnologias": "Angular, TypeScript",  "nivel": "Avanzado",      "aceptoTerminos": True},
    {"nombre": "Ana Lima",          "email": "ana.lima@email.com",          "edad": 29, "ciudad": "Sao Paulo",    "pais": "Brasil",         "modalidad": "Virtual",    "tecnologias": "Vue.js, PHP",          "nivel": "Intermedio",    "aceptoTerminos": True},
    {"nombre": "Kenji Tanaka",      "email": "kenji.tanaka@email.com",      "edad": 24, "ciudad": "Tokyo",        "pais": "Japon",          "modalidad": "Presencial", "tecnologias": "Go, Kubernetes",       "nivel": "Intermedio",    "aceptoTerminos": True},
    {"nombre": "Marie Dupont",      "email": "marie.dupont@email.com",      "edad": 31, "ciudad": "Paris",        "pais": "Francia",        "modalidad": "Hibrido",    "tecnologias": "Python, Flask",        "nivel": "Avanzado",      "aceptoTerminos": True},
    {"nombre": "David Wilson",      "email": "david.wilson@email.com",      "edad": 28, "ciudad": "London",       "pais": "Reino Unido",    "modalidad": "Virtual",    "tecnologias": "C#, .NET",             "nivel": "Intermedio",    "aceptoTerminos": True},
    {"nombre": "Isabella Ferrari",  "email": "isabella.ferrari@email.com",  "edad": 26, "ciudad": "Roma",         "pais": "Italia",         "modalidad": "Presencial", "tecnologias": "Ruby, Rails",          "nivel": "Principiante",  "aceptoTerminos": True},
]

print("Agregando participantes de prueba a TP5M...")
print()

ok = 0
for p in participantes:
    data = json.dumps(p).encode("utf-8")
    req = urllib.request.Request(API_URL, data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as response:
            print(f"  OK  {p['nombre']} ({p['pais']})")
            ok += 1
    except Exception as e:
        print(f"  ERROR  {p['nombre']}: {e}")

print()
print(f"Resultado: {ok}/{len(participantes)} participantes agregados.")
