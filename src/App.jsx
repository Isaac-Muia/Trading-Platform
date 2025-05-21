import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateAccount from './pages/CreateAccount';
import LogIn from './pages/LogIn';
import StockMarket from './pages/StockMarket'
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Trade from './pages/Trade';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState("")
  const[bearer, setBearer] = useState("")
  return (

    <div>
      <Navbar username={username} bearer={bearer}/> {}
      <Routes>
        <Route path="/" element={<LogIn setBearer={setBearer} setUsername={setUsername}/>} />
        <Route path="/createAccount" element={<CreateAccount setUsername={setUsername} setBearer={setBearer}/>} />
        <Route path="/account" element={<Profile username={username} bearer={bearer}/>} />
        <Route path="/trade" element={<Trade bearer={bearer}/>} />
        <Route path="/stockMarket" element={<StockMarket bearer={bearer} />} />
      </Routes>
    </div>

  )
}

export default App;
