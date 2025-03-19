import axios from "axios";
import { useRewardContext } from "../contexts/rewardContexts";
import Switch from '@mui/material/Switch';
import { useRewards } from "../hooks/useRewards";

import toTitleCase from "../utils/titleCase";

import { useRef,useEffect } from "react";

export default function AllRewards(){
    const inputRefName = useRef('') as any;
    const inputRefPoints = useRef(0) as any;
    const { getRewards } = useRewards();
    const { rewards } = useRewardContext();
    function addPoints(points:number){
        return (points + 5);
    }
    
    function subtractPoints(points: number): number {
        if (points === 5) {
            alert('Rewards cannot be less than 5 points');
            return points;
        }
        return points - 5;
    }
    
    
    function changeStatus(status: string) {
        if(status === 'active'){
            return 'inactive';
        } else {
            return 'active';
        }
    }
    
    
    function updateReward(id: number,name:string,points:number,status:string) {
        axios.put(`http://localhost:3000/rewards/${id}`, {
            name: name,
            points: points,
            status: status
        })
        .then((response) => {
            console.log(response.data);
            getRewards();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function addReward(reward_name: string, reward_points: number) {
        axios.post(`http://localhost:3000/rewards`, {
            name: reward_name,
            points: reward_points
        })
        .then((response) => {
          console.log(response.data);
          getRewards();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function checkDuplicate(name: string,points: number) {
        if(name === '' || points === 0){
            alert('Please fill out all fields');
            return;
        }
        axios.get(`http://localhost:3000/rewards/name/${name}`)
        .then((response) => {
          console.log(response.data.length);
          if(response.data.length > 0){
            alert('Prize Already Exists!');
          } else {
            addReward(name, points);
          }
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }

    useEffect(() => {
        getRewards();
    }, []);

        return (
        <>
        <h1>Admin Rewards</h1>
        <div className="rewards-container-admin">
            {rewards.map((reward) => {
                return (
                    <div key= {reward.id} className="rewards-item-admin">
                        <h3>{toTitleCase(reward.name)}</h3>
                        <div className="status-container">
                        <p>Status:</p>
                        <Switch checked={reward.status === 'active' ? true : false} onChange={() => updateReward(reward.id,reward.name,reward.points,changeStatus(reward.status))}/>
                        </div>
                        <div className="points-container">
                        <button onClick={() => updateReward(reward.id,reward.name,subtractPoints(reward.points),reward.status)}>-</button>
                        <p>{reward.points}</p>
                        <button onClick={()=> updateReward(reward.id,reward.name,addPoints(reward.points),reward.status)}>+</button>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="create-reward">
            <h3>Create Reward</h3>
            <div className="create-reward-form">
                <input id = "nameText" type="text" placeholder="Reward Name" ref={inputRefName}></input>
                <input type="Number" placeholder="Points" step={5} ref={inputRefPoints}></input>
                <button onClick={() => checkDuplicate((inputRefName.current.value).toLowerCase(),Number(inputRefPoints.current.value))}>Create</button>
            </div>
        </div>
        </>
        )
    }