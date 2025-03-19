import { useUserMedicationsContext} from "../contexts/userMedicationsContexts";
import { useAppContext} from "../contexts/userContexts";
import axios from "axios";

export const useMedications = () => {
    const { sharedValue } = useAppContext();
    const { setUserMedications } = useUserMedicationsContext();

    const getMedications = () => {
        axios.get(`http://localhost:3000/users/drugs/${sharedValue.id}`)
        .then((response) => {
          setUserMedications(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return { getMedications};
}
