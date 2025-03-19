import { useRewardContext } from "../contexts/rewardContexts"
import { useAppContext } from "../contexts/userContexts";
import { useEffect } from "react";
import { useRewards } from "../hooks/useRewards";
import { usePoints } from "../hooks/usePoints";



import axios from "axios";

import toTitleCase from "../utils/titleCase";




export default function RewardsAvilable(){
    const { sharedValue } = useAppContext();
    const { rewards } = useRewardContext();
    const { getPoints } = usePoints();
    const { getRewards } = useRewards();
    
    const avaliableRewards = rewards.filter((reward) => reward.status === 'active');

    async function SubtractPoints(cost:number){
      axios.put(`http://localhost:3000/users/${sharedValue.id}`, {
            name: sharedValue.name,
            location: sharedValue.location,
            points: sharedValue.points - cost
        }).then(() => {
          getPoints();
        }).then(() => {
          console.log('Points Subtracted');
          console.log(sharedValue);
        }).catch((error) => {
          console.log(error);
        }
        );
    }
    
    
    async function getReward(id: number,points: number){
        console.log(points)
        if(points > sharedValue.points){
            alert('Not enough points to redeem this reward');
            return;
        }
        try{
          await SubtractPoints(points);
          await redeemReward(id,points);
        }catch(error){
          console.log(error);
        }
    }
    
      async function redeemReward(id: number, cost: number){
        try{
        await axios.post(`http://localhost:3000/users/rewards/${sharedValue.id}`, {
            user_id: sharedValue.id,
            reward_id: id,
            price_at_pruchase: cost
        })
        }catch(error) {
          console.log(error);
        }
    }

    useEffect(() => {
      if(rewards.length === 0){
        getRewards();
      }}, [])

        return (
            <>
            <h1>Rewards Avilable</h1>
            <div className='rewards-container'>
            {avaliableRewards.map((reward) => (
                <div key={reward.id} className='rewards-item'>
                    <h1>{toTitleCase(reward.name)}</h1>
                  <div className='reward-points'>
                    <h3>Points Needed to Redeem: {reward.points}</h3>
                    <button onClick={() => getReward(reward.id,reward.points)}>Redeem</button>
                  </div>
                </div>
            ))}
            </div>
            </>
        )
    }