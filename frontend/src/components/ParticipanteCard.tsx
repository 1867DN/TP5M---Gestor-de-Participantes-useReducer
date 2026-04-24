import { useParticipantes } from '../context/ParticipantesContext';
import { Participante } from '../models/Participante';

interface ParticipanteCardProps {
  participante: Participante;
  onEditar: (participante: Participante) => void;
}

export const ParticipanteCard = ({ participante, onEditar }: ParticipanteCardProps) => {
  const { eliminar } = useParticipantes();

  const handleEliminar = async () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${participante.nombre}?`)) {
      try {
        await eliminar(participante.id);
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{participante.nombre}</h3>
      
      <div style={styles.infoGroup}>
        <p style={styles.text}><strong>Email:</strong> {participante.email}</p>
        <p style={styles.text}><strong>Edad:</strong> {participante.edad}</p>
        <p style={styles.text}><strong>País:</strong> {participante.pais}</p>
        <p style={styles.text}><strong>Ciudad:</strong> {participante.ciudad}</p>
      </div>

      <div style={styles.infoGroup}>
        <p style={styles.text}><strong>Modalidad:</strong> {participante.modalidad}</p>
        <p style={styles.text}><strong>Nivel:</strong> {participante.nivel}</p>
        <p style={styles.text}><strong>Tecnologías:</strong> {participante.tecnologias || 'N/A'}</p>
      </div>

      <div style={styles.buttonGroup}>
        <button
          onClick={() => onEditar(participante)}
          style={styles.editButton}
        >
          Editar
        </button>
        <button
          onClick={handleEliminar}
          style={styles.deleteButton}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '12px',
    backgroundColor: '#ffffff',
    border: '2px solid #4CAF50',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    minHeight: '250px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
  },
  title: {
    color: '#1a1a1a',
    fontSize: '16px',
    marginTop: '0',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  infoGroup: {
    marginBottom: '8px',
  },
  text: {
    color: '#333',
    fontSize: '12px',
    margin: '3px 0',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
    marginTop: '10px',
  },
  editButton: {
    padding: '8px 12px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '12px',
    transition: 'background-color 0.3s',
    flex: 1,
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '12px',
    transition: 'background-color 0.3s',
    flex: 1,
  },
};
