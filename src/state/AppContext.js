import React from 'react';
import { appState } from './AppState';

/**
 * Application context. It contains a single object, the AppState singleton.
 */
export const AppContext = React.createContext({
  appState,
});