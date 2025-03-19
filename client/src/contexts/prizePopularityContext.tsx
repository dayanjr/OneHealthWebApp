import {createContext, useContext, useState} from 'react';

interface prizePopularity {
    reward_id: number;
    name: string;
    redeemed_count: number;
}

interface PrizePopularityContextType {
    popularPrizes: prizePopularity[];
    setPopularPrizes: (popularity: prizePopularity[]) => void;
}



const PrizePopularityContext = createContext<PrizePopularityContextType>({popularPrizes: [], setPopularPrizes: () => {}});

export const PrizePopularityProvider = ({children}: {children: React.ReactNode}) => {
    const [popularPrizes, setPopularPrizes] = useState<prizePopularity[]>([]);
    return (
        <PrizePopularityContext.Provider value={{popularPrizes, setPopularPrizes}}>
            {children}
        </PrizePopularityContext.Provider>
    );
};

export const usePrizePopularityContext = () => useContext(PrizePopularityContext)