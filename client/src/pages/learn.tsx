import { useAppContext } from "../contexts/userContexts";
import UserInfo from "../components/userInfo";
import LoggedOut from "../components/loggedOut";

export default function Learn() {
  const { sharedValue } = useAppContext();

  if(sharedValue.name === ""){
    return(
      <>
      <LoggedOut />
      </>
)}
  return (
    <div>
      <h1>Learn About Medications</h1>
      <UserInfo />
    </div>
  );
}