import React, { useState, createContext, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Owner from './pages/Owner/Owner';
import Chef from './pages/Chef/Chef';
import Navbar from './components/Navbar/Navbar';

export const AppContext = createContext();

function App() {

  const [topping, setTopping] = useState("");

  // useEffect(() => {
  //   console.log(topping)
  // }, [topping])

  const handleSubmit = (e) => {
    if (topping === "") {
      return
    }
    e.preventDefault();
    console.log(topping);
    setTopping("");
  }

  return (
    <div className="container">
      <Navbar Link={Link} />
      <AppContext.Provider value={{
        topping,
        setTopping,
        handleSubmit
      }}>
        <Routes>
          <Route exact path="/" element={<Owner />} />
          <Route path="/chef" element={<Chef />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
