import { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of the context

interface Data {
  id: number;
  name: string;
  location: string;
  points: number;
}

interface AppContextProps {
  sharedValue: Data;
  setSharedValue: (value: Data) => void;
}

// Create the context with default values
export const AppContext = createContext<AppContextProps>({
  sharedValue: {
    id: 0,
    name: "",
    location: "",
    points: 0,
  },
  setSharedValue: () => {},
});

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [sharedValue, setSharedValue] = useState({id: 0, name: "", location: "", points: 0});

  return (
    <AppContext.Provider value={{ sharedValue, setSharedValue }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);
