-- Script para crear la base de datos - TP5M
CREATE DATABASE IF NOT EXISTS tp5m_db;

USE tp5m_db;

-- La tabla se crea automáticamente por FastAPI/SQLAlchemy
-- Pero aquí está la estructura para referencia:

CREATE TABLE IF NOT EXISTS participantes (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
