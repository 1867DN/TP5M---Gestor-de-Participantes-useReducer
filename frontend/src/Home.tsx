import { useParticipantes } from './context/ParticipantesContext';
import { Formulario } from './components/Formulario';
import { ParticipanteCard } from './components/ParticipanteCard';
import { useState } from 'react';
import { Participante } from './models/Participante';

function Home() {
  const { participantes, loading } = useParticipantes();
  const [filtro, setFiltro] = useState('');
  const [participanteEditando, setParticipanteEditando] = useState<Participante | null>(null);

  const filtroLower = filtro.toLowerCase();
  const participantesFiltrados = participantes.filter(p =>
    p.nombre.toLowerCase().includes(filtroLower) ||
    p.email.toLowerCase().includes(filtroLower) ||
    p.ciudad.toLowerCase().includes(filtroLower) ||
    p.pais.toLowerCase().includes(filtroLower) ||
    p.modalidad.toLowerCase().includes(filtroLower) ||
    p.tecnologias.toLowerCase().includes(filtroLower) ||
    p.nivel.toLowerCase().includes(filtroLower) ||
    p.edad.toString().includes(filtroLower)
  );

  const handleEditar = (participante: Participante) => {
    setParticipanteEditando(participante);
    // Scroll al formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLimpiarEdicion = () => {
    setParticipanteEditando(null);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Gestor de Participantes - TP5M</h1>
        <p>Administra los participantes de tu evento</p>
      </header>

      <div style={styles.content}>
        <Formulario 
          participanteEditando={participanteEditando}
          limpiarEdicion={handleLimpiarEdicion}
        />

        <div style={styles.searchSection}>
          <input
            type="text"
            placeholder="Buscar por nombre, email, ciudad o edad..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            style={styles.searchInput}
          />
          <p style={styles.resultCount}>
            Mostrando {participantesFiltrados.length} de {participantes.length} participantes
          </p>
        </div>

        {loading ? (
          <p style={styles.loading}>Cargando participantes...</p>
        ) : participantesFiltrados.length === 0 ? (
          <p style={styles.noResults}>
            {participantes.length === 0 ? 'No hay participantes aún' : 'No se encontraron resultados'}
          </p>
        ) : (
          <div style={styles.cardContainer}>
            {participantesFiltrados.map(participante => (
              <ParticipanteCard
                key={participante.id}
                participante={participante}
                onEditar={handleEditar}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '30px',
    textAlign: 'center' as const,
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
  },
  searchSection: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box' as const,
    backgroundColor: '#ffffff',
    color: '#333',
  },
  resultCount: {
    fontSize: '14px',
    color: '#555',
    marginTop: '10px',
    fontWeight: '500',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
  },
  loading: {
    textAlign: 'center' as const,
    padding: '40px',
    fontSize: '16px',
    color: '#666',
  },
  noResults: {
    textAlign: 'center' as const,
    padding: '40px',
    fontSize: '16px',
    color: '#999',
  },
};

export default Home;
