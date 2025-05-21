import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function App({setUsername, setBearer}) {
  const endPoint = "http://localhost:8091/tradePlatform/auth/login";
  setUsername("");
  setBearer("");
  const [usernameinput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logIn = (event) => {
    event.preventDefault();
    const options ={
      auth:{
        username:usernameinput,
        password:password
      }
    }
    axios.post(endPoint,{},options).then(response =>{
      setBearer("Bearer " + response.data),
      setUsername(usernameinput),
      console.log("Bearer "  +response.data),
      navigate("/stockMarket")
    }).catch(error=>console.log(error))
  }

  return (
      <>
        <h1>Virtual Trading</h1>
        <h2>Log In</h2>
        <div className="card">
          <form onSubmit={logIn}>
            <input type="text" name="username" placeholder='Username' value={usernameinput}  onChange={e=>setUsernameInput(e.target.value)} /><br />
            <input type="password" name="password" placeholder='Password'  value={password}  onChange={e=>setPassword(e.target.value)}  /><br />
            <input type="submit" value={"Log in"} />
          </form>
        </div>
      </>

  )
}

export default App;
