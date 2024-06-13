// src/authContext.tsx

import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import axios from 'axios';

// Define types and interfaces
interface AuthState {
  isSubmitting: boolean;
  token: string | null;
  errors: string | null;
}

type AuthAction =
  | { type: 'SET_LOGIN_SUBMITTING'; payload: boolean }
  | { type: 'LOGIN'; payload: string }
  | { type: 'SET_LOGIN_ERRORS'; payload: string | null }
  | { type: 'LOGOUT' };

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

// Initial state
const initialState: AuthState = {
  isSubmitting: false,
  token: null,
  errors: null,
};

// Context and provider
const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<Dispatch<AuthAction> | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOGIN_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'LOGIN':
      return { ...state, token: action.payload, errors: null };
    case 'SET_LOGIN_ERRORS':
      return { ...state, errors: action.payload };
    case 'LOGOUT':
      return { ...state, token: null };
    default:
      throw new Error(`Unhandled action type`);
      // throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AuthProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = (): AuthState => {
  const state = useContext(AuthStateContext);
  if (state === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return state;
};

export const useAuthDispatch = (): Dispatch<AuthAction> => {
  const dispatch = useContext(AuthDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return dispatch;
};

export const login = async (dispatch: Dispatch<AuthAction>, data: { email: string; password: string }) => {
  dispatch({ type: 'SET_LOGIN_SUBMITTING', payload: true });
  try {
    const user = {
      email: data.email,
      password: data.password,
    };
    const loginResponse = await axios.post<{ token: string }>('/api/user/login', user);
    const auth = loginResponse.data.token;
    dispatch({ type: 'LOGIN', payload: auth });
    // localStorage.setItem('ABSSIN_number', JSON.stringify(loginResponse.data?.state_id));
  } catch (error) {
    dispatch({ type: 'SET_LOGIN_ERRORS', payload: "Invalid login credentials" });
    console.error('Login error:', error);
  } finally {
    dispatch({ type: 'SET_LOGIN_SUBMITTING', payload: false });
  }
};

export const logout = (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('ABSSIN_number');
};
