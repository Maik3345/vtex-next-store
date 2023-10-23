import { createContext, ReactNode, useContext } from "react";
import { useCmdk, UseCmdkType } from "..";

export interface CmdkContextType extends UseCmdkType {}

const CmdkContext = createContext<CmdkContextType>({} as CmdkContextType);

export const useCmdkContext = () => useContext(CmdkContext);

export const CmdkProvider = ({ children }: { children: ReactNode }) => {
  const context = useCmdk();

  return (
    <CmdkContext.Provider value={context}>{children}</CmdkContext.Provider>
  );
};
