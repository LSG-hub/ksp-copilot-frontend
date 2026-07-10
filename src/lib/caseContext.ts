import { createContext, useContext } from 'react';

// Lets any block (FIR document, case row, map pin) open a full case dossier
// without prop-drilling. App provides the handler.
export const CaseContext = createContext<(crimeNo: string) => void>(() => {});
export const useOpenCase = () => useContext(CaseContext);
