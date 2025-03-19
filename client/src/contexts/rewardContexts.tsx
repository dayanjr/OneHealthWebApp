import { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of the context

interface Reward {
    id: number;
    name: string;
    points: number;
    status: string;
}

interface RewardContextProps {
    rewards: Reward[];
    setRewards: (value: Reward[]) => void;
}

// Create the context with default values

export const RewardContext = createContext<RewardContextProps>({
    rewards: [],
    setRewards: () => {},
});

// Create a provider component

export const RewardProvider = ({ children }: { children: ReactNode }) => {
    const [rewards, setRewards] = useState<Reward[]>([]);

    return (
        <RewardContext.Provider value={{ rewards, setRewards }}>
            {children}
        </RewardContext.Provider>
    );
};

// Custom hook to use the context

export const useRewardContext = () => useContext(RewardContext);