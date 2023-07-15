import React,{ useContext, createContext, useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value = {useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
); //remember the round bracket here.

export const useStateContext = () => useContext(StateContext);

export default useStateContext;
