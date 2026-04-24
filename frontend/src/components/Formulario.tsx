import { useState, useEffect } from 'react';
import { useParticipantes } from '../context/ParticipantesContext';
import { Participante } from '../models/Participante';

interface FormularioProps {
  participanteEditando?: Participante | null;
  limpiarEdicion?: () => void;
}

export const Formulario = ({ participanteEditando, limpiarEdicion }: FormularioProps) => {
  const { agregar, editar } = useParticipantes();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: '',
    ciudad: '',
    pais: '',
    modalidad: 'Presencial',
    tecnologias: '',
    nivel: 'Principiante',
    aceptoTerminos: false,
  });
  const [error, setError] = useState('');

  // Cargar datos cuando se selecciona un participante para editar
  useEffect(() => {
    if (participanteEditando) {
      setFormData({
        nombre: participanteEditando.nombre,
        email: participanteEditando.email,
        edad: participanteEditando.edad.toString(),
        ciudad: participanteEditando.ciudad,
        pais: participanteEditando.pais,
        modalidad: participanteEditando.modalidad,
        tecnologias: participanteEditando.tecnologias,
        nivel: participanteEditando.nivel,
        aceptoTerminos: participanteEditando.aceptoTerminos,
      });
    }
  }, [participanteEditando]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.nombre || !formData.email || !formData.edad || !formData.ciudad || !formData.pais) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (!formData.aceptoTerminos) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    try {
      if (participanteEditando) {
        // Editar
        await editar({
          id: participanteEditando.id,
          nombre: formData.nombre,
          email: formData.email,
          edad: parseInt(formData.edad),
          ciudad: formData.ciudad,
          pais: formData.pais,
          modalidad: formData.modalidad,
          tecnologias: formData.tecnologias,
          nivel: formData.nivel,
          aceptoTerminos: formData.aceptoTerminos,
        });
        if (limpiarEdicion) {
          limpiarEdicion();
        }
      } else {
        // Agregar nuevo
        await agregar({
          nombre: formData.nombre,
          email: formData.email,
          edad: parseInt(formData.edad),
          ciudad: formData.ciudad,
          pais: formData.pais,
          modalidad: formData.modalidad,
          tecnologias: formData.tecnologias,
          nivel: formData.nivel,
          aceptoTerminos: formData.aceptoTerminos,
        });
      }

      limpiarFormulario();
    } catch (err) {
      setError(participanteEditando ? 'Error al actualizar participante' : 'Error al agregar participante');
    }
  };

  const isEditing = !!participanteEditando;
  const buttonText = isEditing ? 'Actualizar' : 'Agregar';
  const secondaryButtonText = isEditing ? 'Cancelar' : 'Limpiar';

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      email: '',
      edad: '',
      ciudad: '',
      pais: '',
      modalidad: 'Presencial',
      tecnologias: '',
      nivel: 'Principiante',
      aceptoTerminos: false,
    });
    setError('');
  };

  const handleCancelar = () => {
    limpiarFormulario();
    if (limpiarEdicion) limpiarEdicion();
  };

  return (
    <div style={styles.formularioContainer}>
      <h2 style={styles.title}>
        {isEditing ? 'Editar Participante' : 'Registro de Participantes'}
      </h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre *</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Edad *</label>
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={formData.edad}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>País *</label>
            <input
              type="text"
              name="pais"
              placeholder="País"
              value={formData.pais}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Ciudad *</label>
            <input
              type="text"
              name="ciudad"
              placeholder="Ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Modalidad</label>
            <select
              name="modalidad"
              value={formData.modalidad}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Tecnologías</label>
            <input
              type="text"
              name="tecnologias"
              placeholder="Ej: React, Node.js, Python"
              value={formData.tecnologias}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nivel</label>
            <select
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
        </div>

        <div style={styles.checkboxGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="aceptoTerminos"
              checked={formData.aceptoTerminos}
              onChange={handleChange}
              style={styles.checkbox}
            />
            Acepto los términos y condiciones
          </label>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>
            {buttonText}
          </button>
          <button type="button" onClick={handleCancelar} style={styles.secondaryButton}>
            {secondaryButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formularioContainer: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
  },
  title: {
    color: '#1a1a1a',
    fontSize: '20px',
    marginTop: 0,
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '5px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 'bold' as const,
    color: '#333',
  },
  input: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
    backgroundColor: '#ffffff',
    color: '#333',
  },
  select: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
    backgroundColor: '#ffffff',
    color: '#333',
    cursor: 'pointer',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    flex: 1,
    padding: '12px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  secondaryButton: {
    flex: 1,
    padding: '12px 20px',
    backgroundColor: '#9e9e9e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  error: {
    color: '#d32f2f',
    marginBottom: '10px',
    padding: '12px',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
    border: '1px solid #ef5350',
  },
};
