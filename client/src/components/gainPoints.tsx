import axios from "axios";
import { useAppContext } from "../contexts/userContexts";
import { usePoints } from "../hooks/usePoints";

export default function GainPoints() {
    const {sharedValue} = useAppContext();
    const { getPoints } = usePoints();
    
    function AddPoints(){
        axios.put(`http://localhost:3000/users/${sharedValue.id}`, {
            name: sharedValue.name,
            location: sharedValue.location,
            points: sharedValue.points + 10
        }).then((response) => {
            console.log(response.data);
        }).then(() => {
            getPoints();
        }).then(() => {
            console.log(sharedValue);
        }).catch((error) =>{
          console.log(error);
        });
    }

    return (
        <div>
            <div className='AddPoints'>
                <h1>Want to add more points?</h1>
                <button onClick={() => AddPoints()}>Add 10 points</button>
            </div>
        </div>
    )
}