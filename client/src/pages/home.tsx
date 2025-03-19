import { useAppContext } from '../contexts/userContexts';
import Dashboard from '../components/dashboard';
import LoggedOut from '../components/loggedOut';
import DrugDashboard from '../components/drugDashboard';
import Greetings from '../components/greetings';

export default function Home() {
  const {sharedValue} = useAppContext();


  if(sharedValue.name === ""){
    return(
        <div>
            <h1>Welcome to OneHealth</h1>
            <LoggedOut />
        </div>
    )} 
    return(
        <div >
            <Greetings />
            <div className='dashboard'>   
                <Dashboard />
                <DrugDashboard />
            </div>   
        </div>
    )
}