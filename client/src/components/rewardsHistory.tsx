import { useState } from "react";
import { useRewardsHistoryContext } from "../contexts/rewardsHistoryContext";
import { useAppContext } from "../contexts/userContexts";
import axios from "axios";
import toTitleCase from "../utils/titleCase";


// interface timeOptions {
//     weekday: string;
//     year: string;
//     month: string;
//     day: string;
// }


export default function RewardsHistory() {
    const { sharedValue } = useAppContext();
    const { rewardsWon, setRewardsWon } = useRewardsHistoryContext();
    const [viewRewardsHistory, setViewRewardsHistory] = useState<boolean>(false);
    const options:any  = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone:'UTC' };


    function ViewPastRewards(){
        axios.get(`http://localhost:3000/users/rewards/${sharedValue.id}`)
        .then((response) => {
          console.log(response.data);
          setRewardsWon(response.data);
          setViewRewardsHistory(true);
        })
        .catch(() => {
          console.log('error');
        });
    }

    function sortByName(){
        const sortedByName = [...rewardsWon].sort((a,b)=> {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }
        )
        setRewardsWon(sortedByName);
        
    }

    function sortByDateAsc(){
        const sortedByDate = [...rewardsWon].sort((a,b)=> {
            const dateA = new Date(a.redeem_date).getTime();
            const dateB = new Date(b.redeem_date).getTime();
            if (dateA < dateB) {
                return -1;
            }
            if (dateA > dateB) {
                return 1;
            }
            return 0;
        }
        )
        setRewardsWon(sortedByDate);
    }

    function sortByDateDesc(){
        const sortedByDate = [...rewardsWon].sort((a,b)=> {
            const dateA = new Date(a.redeem_date).getTime();
            const dateB = new Date(b.redeem_date).getTime();
            if (dateA > dateB) {
                return -1;
            }
            if (dateA < dateB) {
                return 1;
            }
            return 0;
        }
        )
        setRewardsWon(sortedByDate);
    }

    function sortByPrice(){
        const sortedByPrice = [...rewardsWon].sort((a,b)=> {
            return a.price_at_purchase - b.price_at_purchase;
        }
        )
        setRewardsWon(sortedByPrice);
    }
       
    function applyFilter(filter: string){
        if(filter === 'name'){
            sortByName();
        }
        else if(filter === 'price_at_purchase'){
            sortByPrice();
        }
        else if(filter === 'redeem_date'){
            sortByDateAsc();
        }
        else if(filter === 'redeem_date_desc'){
            sortByDateDesc();
        }
        else {
            ViewPastRewards();
        }
    }

    if(!viewRewardsHistory){
        return(
            <div className="rewards-history">
                <h1>Rewards History</h1>
                <button onClick={() => ViewPastRewards()}>View Rewards History</button>
            </div>
        )
    }
        return (
            <>
            <h1>Redeemed Rewards</h1>
            <div className = 'rewards_history_buttons'>
              <button onClick={() => ViewPastRewards()}>Refresh Rewards History</button>
              <button onClick={() => setViewRewardsHistory(false)}> Hide Rewards History</button>
            </div>
            <div className='sortBy'>
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" name="sort" onChange={(e) => {applyFilter(e.target.value)}}>
                    <option value="redeem_date">Redeem Date Asc. </option>
                    <option value="redeem_date_desc">Redeem Date Desc. </option>
                    <option value="name">Name</option>
                    <option value="price_at_purchase">Price at Purchase</option>
                </select>
            </div>

            <div className='rewards-history-container'>
            {rewardsWon.map((reward) => (
                <div className='rewards-history-item' key={reward.id}>
                    <div className='title-container'>
                    <h1>{toTitleCase(reward.name)}</h1>
                    </div>
                    <h2>Points Redeemed: {reward.price_at_purchase}</h2>
                    <h2>Redeemed on: {new Date(reward.redeem_date).toLocaleString('en-US', options)}</h2>
                </div>
            ))}
            </div>
            </>
        )
    }
