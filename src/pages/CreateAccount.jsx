
import { React, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateAccount({setUsername, setBearer}) {

  const [inputs, setInputs] = useState({});
  const [error, setError] = useState('');
  const [usernameinput, setUsernameInput] = useState("");
  const endPoint = "http://localhost:8091/tradePlatform/users/register"
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
}

  const createAccount = (event) => {
    event.preventDefault();
  if(inputs.passwordCheck != inputs.password){
    setError('Passwords do not match');
  }

  else{
    setUsername(usernameinput);
    const requestBody = {
      name:usernameinput,
      password:inputs.password,
    }
    const options ={
      auth:{
        username:usernameinput,
        password:inputs.password,
      }
    }
    axios.post(endPoint, requestBody)
        .then(response => {
          axios.post("http://localhost:8091/tradePlatform/auth/login",{}, options)
            .then(response => {
              setBearer("Bearer " + response.data);
              setUsername(usernameinput);
              navigate("/stockMarket");
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }
    
  }

  
  return (
    <>
      <h1>Virtual Trading</h1>
      <h2>Create Account</h2>
      <div  className="card">
          <form onSubmit={createAccount}>
            <input type="text" name="username" placeholder='Username' value={usernameinput}  onChange={e=>setUsernameInput(e.target.value)} /><br />
            <input type="password" name="password" placeholder='Password' onChange={handleChange} /><br />
            <input type="password" name="passwordCheck" placeholder='Re-Type Password' onChange={handleChange} /><br />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <input type="submit" value={"Create Account"} />
          </form>
    </div>
    </>
  )
}

export default CreateAccount;
