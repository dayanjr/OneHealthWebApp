import { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of the context
interface Medication {
  drug_id: number;
  name: string;
  dosage: string;
  num_required_daily: number;
  num_took: number;
  last_taken_today: string | null;
  last_taken: string | null;
}
interface UserMedicationsContextProps {
    userMedications: Medication[];
    setUserMedications: (value: Medication[]) => void;
}

// Create the context with default values
export const UserMedicationsContext = createContext<UserMedicationsContextProps>({
    userMedications: [],
    setUserMedications: () => {},
});

// Create a provider component
export const UserMedicationsProvider = ({ children }: { children: ReactNode }) => {
    const [userMedications, setUserMedications] = useState<Medication[]>([]);

    return (
        <UserMedicationsContext.Provider value={{ userMedications, setUserMedications }}>
            {children}
        </UserMedicationsContext.Provider>
    );
};
// Custom hook to use the context
export const useUserMedicationsContext = () => useContext(UserMedicationsContext);