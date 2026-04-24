import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Participante } from '../models/Participante';
import { participantesReducer, initialState, Action } from '../reducers/participantesReducer';

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

const ParticipantesContext = createContext<ContextType | undefined>(undefined);

const API_URL = 'http://localhost:8000';

export const ParticipantesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(participantesReducer, initialState);

  // Cargar participantes al montar el componente
  useEffect(() => {
    cargarParticipantes();
  }, []);

  const cargarParticipantes = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.get(`${API_URL}/participantes`);
      dispatch({ type: "GET_PARTICIPANTES", payload: response.data });
    } catch (error) {
      console.error('Error al cargar participantes:', error);
      dispatch({ type: "SET_ERROR", payload: 'Error al cargar participantes' });
    }
  };

  const agregar = async (participante: Omit<Participante, 'id'>) => {
    try {
      const response = await axios.post(`${API_URL}/participantes`, participante);
      dispatch({ type: "AGREGAR", payload: response.data });
    } catch (error) {
      console.error('Error al agregar participante:', error);
      dispatch({ type: "SET_ERROR", payload: 'Error al agregar participante' });
      throw error;
    }
  };

  const editar = async (participante: Participante) => {
    try {
      const response = await axios.put(`${API_URL}/participantes/${participante.id}`, participante);
      dispatch({ type: "EDITAR", payload: response.data });
    } catch (error) {
      console.error('Error al editar participante:', error);
      dispatch({ type: "SET_ERROR", payload: 'Error al editar participante' });
      throw error;
    }
  };

  const eliminar = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/participantes/${id}`);
      dispatch({ type: "ELIMINAR", payload: id });
    } catch (error) {
      console.error('Error al eliminar participante:', error);
      dispatch({ type: "SET_ERROR", payload: 'Error al eliminar participante' });
      throw error;
    }
  };

  const resetear = () => {
    dispatch({ type: "RESET", payload: [] });
  };

  return (
    <ParticipantesContext.Provider
      value={{
        participantes: state.participantes,
        agregar,
        eliminar,
        editar,
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

export const useParticipantes = () => {
  const context = useContext(ParticipantesContext);
  if (context === undefined) {
    throw new Error('useParticipantes debe ser usado dentro de ParticipantesProvider');
  }
  return context;
};
