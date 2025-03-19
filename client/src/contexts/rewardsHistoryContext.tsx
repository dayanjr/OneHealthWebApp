import {createContext, useContext, useState} from 'react';

interface RewardsHistory {
    id: number;
    name: string;
    price_at_purchase: number;
    redeem_date: string;
}

interface RewardsHistoryContextType {
    rewardsWon: RewardsHistory[];
    setRewardsWon: (history: RewardsHistory[]) => void;
}


const RewardsHistoryContext = createContext<RewardsHistoryContextType>({rewardsWon: [], setRewardsWon: () => {}});

export const RewardsHistoryProvider = ({children}: {children: React.ReactNode}) => {
    const [rewardsWon, setRewardsWon] = useState<RewardsHistory[]>([]);

    return (
        <RewardsHistoryContext.Provider value={{rewardsWon, setRewardsWon}}>
            {children}
        </RewardsHistoryContext.Provider>
    );
};

export const useRewardsHistoryContext = () => useContext(RewardsHistoryContext);

