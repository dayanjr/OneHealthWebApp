import { useAppContext } from '../contexts/userContexts';
import toTitleCase from '../utils/titleCase';
import RewardsAvilable from '../components/availableRewards';
import UserInfo from '../components/userInfo';
import LoggedOut from '../components/loggedOut';
import GainPoints from '../components/gainPoints';
import RewardsHistory from '../components/rewardsHistory';
import RewardsSummary from '../components/rewardSummary';

export default function Rewards(){
    const { sharedValue} = useAppContext();

    if(sharedValue.id === 0){
        return(
            <LoggedOut />
        )
    }


    return (
        <div>
            <h1>Welcome to {toTitleCase(sharedValue.name) }'s Rewards Page! </h1>
            <UserInfo />
            <RewardsAvilable />
            <GainPoints />
            <RewardsSummary />
            <RewardsHistory />
        </div>
    )
}