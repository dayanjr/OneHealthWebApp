import {useAppContext} from "../contexts/userContexts";
import toTitleCase from "../utils/titleCase";

export default function Greetings() {
    const {sharedValue} = useAppContext();
    const current_time = new Date();
    const current_hour = current_time.getHours();

    let greeting = "";
    if(current_hour < 12){
        greeting = "Good Morning";
    } else if(current_hour < 18){
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    return(
        <div>
            <h1>{greeting}, {toTitleCase(sharedValue.name)}!</h1>
        </div>
    )
}