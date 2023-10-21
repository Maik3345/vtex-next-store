import { useStore, UseStoreType } from "@shared";
import { createContext, ReactNode, useContext } from "react";

export interface StoreContextType extends UseStoreType {}

const StoreContext = createContext<StoreContextType>({} as StoreContextType);

export const useStoreContext = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const context = useStore();

  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  );
};
