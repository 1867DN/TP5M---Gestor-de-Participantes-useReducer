import { Participante } from '../models/Participante';

export type Action =
  | { type: "GET_PARTICIPANTES"; payload: Participante[] }
  | { type: "AGREGAR"; payload: Participante }
  | { type: "ELIMINAR"; payload: number }
  | { type: "EDITAR"; payload: Participante }
  | { type: "RESET"; payload: Participante[] }
  | { type: "SET"; payload: Participante[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

export interface ParticipantesState {
  participantes: Participante[];
  loading: boolean;
  error: string | null;
}

export const initialState: ParticipantesState = {
  participantes: [],
  loading: false,
  error: null,
};

export function participantesReducer(
  state: ParticipantesState,
  action: Action
): ParticipantesState {
  switch (action.type) {
    case "GET_PARTICIPANTES":
    case "SET":
      return {
        ...state,
        participantes: action.payload,
        loading: false,
        error: null,
      };

    case "AGREGAR":
      return {
        ...state,
        participantes: [...state.participantes, action.payload],
        error: null,
      };

    case "EDITAR":
      return {
        ...state,
        participantes: state.participantes.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
        error: null,
      };

    case "ELIMINAR":
      return {
        ...state,
        participantes: state.participantes.filter(p => p.id !== action.payload),
        error: null,
      };

    case "RESET":
      return {
        ...state,
        participantes: [],
        error: null,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
