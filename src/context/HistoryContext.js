import { createContext, useReducer } from "react";
import SnakbarReducer from "./HistoryReducer";

const INITIAL_STATE = [];

export const HistoryContext = createContext(INITIAL_STATE);

export const HistoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SnakbarReducer, INITIAL_STATE);

  return (
    <HistoryContext.Provider value={{ state, dispatch }}>
      {children}
    </HistoryContext.Provider>
  );
};