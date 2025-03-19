import Graph from "./graph"
import toTitleCase from "../utils/titleCase"
import axios from "axios"
import { usePrizePopularityContext } from "../contexts/prizePopularityContext"
import { useState } from "react"
export default  function PopularPrizes (){
    const { popularPrizes, setPopularPrizes } = usePrizePopularityContext();
    const [showPopularPrizes, setShowPopularPrizes] = useState<boolean>(false);
    const [showLocationFilter, setShowLocationFilter] = useState<boolean>(false);
    const [prizeLength, setPrizeLength] = useState<number>(0);
    const [locations, setLocations] = useState<{location: string}[]>([]);
    const [locationOption, setLocationOption] = useState<string>('');

    function resetFilters(){
        setShowLocationFilter(false);
        setLocationOption('All Locations');
        getPopularPrizes();
    }

    function getPopularPrizes() {
        axios.get(`http://localhost:3000/users/rewards/popular`)
        .then((response) => {
          setPopularPrizes(response.data);
          setPrizeLength(response.data.length);
          console.log(response.data);
          setShowPopularPrizes(true);
          setLocationOption('All Locations');
          getLocations();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function getLocations() {
        axios.get(`http://localhost:3000/users/locations`)
        .then((response) => {
          setLocations(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function getPopularPrizesByLocation(location: string) {
        axios.get(`http://localhost:3000/users/rewards/popular/${location}`)
        .then((response) => {
          setPopularPrizes(response.data);
          setPrizeLength(response.data.length);
          console.log(response.data);
          setLocationOption(location);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function FilterByLocation(){
    
            return(
                <>
                <select name="selectedLocation" id="selectedLocation" value={locationOption} onChange={(e) => getPopularPrizesByLocation(e.target.value)}>
                <option value="">All Locations</option>
                {locations.map((location) => {
                    return(
                        <option value={location.location}>{toTitleCase(location.location)}</option>
                    )
                })}
                </select>
                <button onClick={() => resetFilters()}>Close</button>
                </>
            )
        }

        if(!showPopularPrizes){
            return(
                <>
                <h1>Most Popular Prizes</h1>
                <div className="rewards-list-container-admin">
                    <button onClick={() => getPopularPrizes()}>View Popular Prizes</button>
                </div>
                </>
            )
        }


        return(
        <>
        <h1>Most Popular Prizes</h1>
        <div className="rewards-list-container-admin">
            <button onClick={() => setShowPopularPrizes(false)}>Close</button>
            <h4>Filter By Location?</h4>
            <button onClick={() => setShowLocationFilter(true)}>Yes</button>
            {showLocationFilter ? FilterByLocation() : <></>}
            <div className="bar-graph">
            {Graph(prizeLength, popularPrizes.map((prize) => toTitleCase(prize.name)), popularPrizes.map((prize) => prize.redeemed_count))}
            </div>
            <div className="popular-prizes-admin">
            {popularPrizes.map((prize,index) => {
                return (
                    <div className = "rewards-item-admin" key={prize.reward_id}>
                        <h2> {index + 1}. {toTitleCase(prize.name)}</h2>
                        <h3>Redeem Count: {prize.redeemed_count}</h3>
                    </div>
                )
            })}
            </div>
            </div>
            </>
        )
    }