import { useState } from 'react';
import axios from 'axios';


export default function Register(){
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [points, setPoints] = useState(0);
    const [response, setResponse] = useState('');

    function checkDuplicate(userName: string, userLocation: string) {
        axios.get(`http://localhost:3000/users/${userName}/${userLocation}`)
        .then((response) => {
            console.log(response.data);
            if(response.data.length > 0){
                setResponse('User already exists!');
            } else {
                submitForm(userName, userLocation, points);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function submitForm(userName: string, userLocation: string, points: number) {
        if(userName === '' || userLocation === ''){
            setResponse('Error: Please fill out all fields');
            return;
        }
        if(points < 0){
            setResponse('Error: Points cannot be negative');
            return;
        }
        if(userName.match(/^[a-zA-Z]+$/) === null || userLocation.match(/^[a-zA-Z]+$/) === null){
            setResponse('Error: Name must only contain letters');
            return;
        }
        axios.post('http://localhost:3000/users', {
            name: userName,
            location: userLocation,
            points: points
        })
      .then((response) => {
        console.log(response);
        setResponse('User added successfully!');
        setName('');
        setLocation('');
        setPoints(0);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    return(
        <div className="card">
          <label>Enter Name: </label>
          <input 
          type='text' 
          pattern="[a-zA-Z]*"
          placeholder='Name' 
          value={name}
          onChange={(e) => setName(e.target.value)}
          ></input>
          <label>Enter Location: </label>
          <input type='text' 
          placeholder='Location' 
          pattern="[a-zA-Z]*"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          >
          </input>
          <label>Enter Points: </label>
          <input type='number'
          placeholder='Points'
          className='points'
          step = '5'
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          ></input>
          <button
          onClick={() => checkDuplicate(name.toLowerCase(), location.toLowerCase())}
          >Submit New User</button>
          <p>{response}</p>
        </div>
    )
}