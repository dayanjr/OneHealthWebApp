import { useContext } from "react";
import { RewardContext } from "../contexts/rewardContexts";
import axios from "axios";

export const useRewards = () => {
    const { rewards,setRewards } = useContext(RewardContext);

    const getRewards = () => {
        axios.get(`http://localhost:3000/rewards`)
        .then((response) => {
          setRewards(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const addReward = (reward: any) => {
        setRewards([...rewards, reward]);
    }

    const removeReward = (id: number) => {
        setRewards(rewards.filter((reward) => reward.id !== id));
    }

    return { getRewards, addReward, removeReward };
}