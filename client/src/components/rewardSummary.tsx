import { useState } from "react";
import { usePrizePopularityContext } from "../contexts/prizePopularityContext";
import { useAppContext } from "../contexts/userContexts";
import axios from "axios";
import toTitleCase from "../utils/titleCase";
import Graph from "../components/graph";


export default function RewardSummary(){
    const { sharedValue } = useAppContext();
    const { popularPrizes, setPopularPrizes } = usePrizePopularityContext();
    const [showRewardsSumary, setShowRewardsSummary] = useState<boolean>(false);
    const [prizeLength, setPrizeLength] = useState<number>(0);
    const [showGraph, setShowGraph] = useState<boolean>(false);


    function viewRewardsSumary(){
        axios.get(`http://localhost:3000/users/rewards/popular/userid/${sharedValue.id}`)
        .then((response) => {
          console.log(response.data);
          setPopularPrizes(response.data);
          setPrizeLength(response.data.length);
          setShowRewardsSummary(true);
          setShowGraph(true);
        })
        .catch(() => {
          console.log('error');
        });
    }

    if(!showRewardsSumary){
        return(
            <>
            <h1>Rewards Summary</h1>
            <div className="rewards-container">
                <button onClick={() => viewRewardsSumary()}>View Rewards Summary</button>
            </div>
            </>
        )
    }

          return(
            <div className='rewards-summary'>
                <h1>Rewards Summary</h1>
            <div className='rewards_history_buttons'>
              <button onClick={() => setShowRewardsSummary(false)}> Hide Summary</button>
            </div>
            <div className='bar-graph'>
                {showGraph ? Graph(prizeLength, popularPrizes.map((popularPrize) => popularPrize.name), popularPrizes.map((popularPrize) => popularPrize.redeemed_count) ) : null}
            </div>
                <div className='rewards-container'>
                {popularPrizes.map((popularPrize,rewardIndex) => (
                    <div className= 'rewards-item' key={popularPrize.reward_id}>
                        <h1>{rewardIndex + 1}. {toTitleCase(popularPrize.name)}</h1>
                        <h3>Redeemed: {popularPrize.redeemed_count}</h3>
                    </div>
                ))}
                </div>
            </div>
          )
    }
