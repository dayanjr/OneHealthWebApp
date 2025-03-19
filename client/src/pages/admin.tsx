import { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { useAppContext } from '../contexts/userContexts';
import toTitleCase from "../utils/titleCase";


interface User {
    id: number;
    name: string;
    location: string;
    points: number;
  }

export default function Admin(){
    const { sharedValue } = useAppContext();
    const { setSharedValue } = useAppContext();
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [menu, setMenu] = useState(false);
    const [updateResponse, setUpdateResponse] = useState('');
    const [updatedPoints, setUpdatedPoints] = useState(0);
    const [loggedInStatus, setLoggedInStatus] = useState(`Logged in as: ${toTitleCase(sharedValue.name)}`);


    useEffect(() => {
        viewAllUsers();
        if(sharedValue.name == ''){
            setLoggedInStatus('Not logged in');
        }
      }, []);

    function viewAllUsers() {
        axios.get('http://localhost:3000/users')
        .then((response) => {
          console.log(response);
          setUsers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function refreshUsers() {
      viewAllUsers();
      if(sharedValue.name == ''){
        setLoggedInStatus('Not logged in');
      }      
    }
    function deleteUser(id: number) {
        axios.delete(`http://localhost:3000/users/${id}`)
        .then((response) => {
          console.log(response);
          setUpdateResponse('User deleted successfully!');
          setSharedValue({id:0, name: "", location: "", points: 0});
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function updateUser(id: number, name: string, location: string, points: number) {
        setMenu(true);
        setId(id);
        setName(name);
        setLocation(location);
        setUpdatedPoints(points);
        viewAllUsers();
    }
    
    function viewUser(id: number) {
        axios.get(`http://localhost:3000/users/${id}`)
        .then((response) => {
          console.log(response);
          setSharedValue(response.data[0]);
          setLoggedInStatus('Logged in as: ' + toTitleCase(response.data[0].name));
        })
        .catch((error) => {
          console.log(error);
        });
      }

    // function RandomizeNotifications(){
    //   return(
    //   <>
    //   {users.map(user =>
    //     <div key={user.id}>
    //       <p>({user.id},{Math.floor(Math.random() * 6)+1})</p>
    //     </div>
    //   )}
    //   </>
    // )
    // }
      function UpdateMenu() {
        const inputRefName = useRef('') as any;
        const inputRefLocation = useRef('') as any;
  
        function updateUserByID(id: number) {
          axios.put(`http://localhost:3000/users/${id}`, {
            name: inputRefName.current.value,
            location: inputRefLocation.current.value,
            points : updatedPoints
          })
          .then((response) => {
            console.log(response);
            setUpdateResponse('User updated successfully!');
            viewAllUsers();
            setMenu(false);
          })
          .catch((error) => {
            console.log(error);
          });
        }
  
        // const InputField = React.memo(({ value, onChanged }:Item) => {
        //   return <input value={value} onChange={onChanged} />;
        // });
        
  
        return(
          <div>
            <label>Enter Name: </label>
            <input
            className='updateUser'
            type='text'
            placeholder={name}
            ref = {inputRefName}
            />
            <label>Enter Location: </label>
            <input
            className='updateUser'
            type='text'
            placeholder={location}
            ref = {inputRefLocation}
            />
            <label>Enter Points: </label>
            <input
            className='updateUser'
            type='number'
            placeholder='Points'
            step = '5'
            value={updatedPoints}
            onChange={(e) => setUpdatedPoints(Number(e.target.value))}
            ></input>
            <button
            onClick={() => updateUserByID(id)}
            >Update User</button>
          </div>
        )
      }
    
    return(
    <> 
        <h1>Admin Page</h1>
        <h3>{loggedInStatus}</h3>
        <div className='userButtons'>{
                users.map(user => 
                  <div key={user.id}>
                    <button onClick={() => viewUser(user.id)}>Go to {toTitleCase(user.name)}'s Account</button>
                    <button onClick={() => deleteUser(user.id)}>Delete {toTitleCase(user.name)}'s Account</button>
                    <button onClick={() => updateUser(user.id,user.name,user.location,user.points)}>Update {toTitleCase(user.name)}'s Account</button>
                  </div>
                )
        }</div>
        <button onClick={() => refreshUsers()}>Refresh Users</button>
        {menu && <UpdateMenu />}
        {updateResponse}
    </>   
    )
}