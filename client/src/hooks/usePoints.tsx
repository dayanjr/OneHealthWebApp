import { AppContext } from "../contexts/userContexts";
import { useContext } from "react";
import axios from "axios";

export const usePoints = () => {
    const { sharedValue,setSharedValue } = useContext(AppContext);

    async function getPoints() {
      axios.get(`http://localhost:3000/users/${sharedValue.id}`)
        .then((response) => {
          setSharedValue(response.data[0]);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });        
    }
    return { getPoints };
}