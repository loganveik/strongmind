import React, { useState, createContext, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Owner from './pages/Owner/Owner';
import Chef from './pages/Chef/Chef';
import Navbar from './components/Navbar/Navbar';
import { db } from './firebase.config';
import { collection, onSnapshot, doc, addDoc, deleteDoc } from 'firebase/firestore';

export const AppContext = createContext();

function App() {

  const [topping, setTopping] = useState({ topping: "" });
  const [toppingsList, setToppingsList] = useState([]);

  const toppingsCollectionRef = collection(db, "toppings");

  useEffect(() => {
    onSnapshot(toppingsCollectionRef, snapshot => {
      setToppingsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const toppingListTopping = toppingsList.map(item => item.topping);
    const enteredTopping = topping.topping;
    const compare = toppingListTopping.filter(item => enteredTopping.includes(item));

    if (enteredTopping === "" || enteredTopping === toppingListTopping) {
      return
    } else {
      addDoc(toppingsCollectionRef, topping);
      setTopping({
        topping: ""
      });
    }
    console.log(compare);

    // const favPokeIdArr = favoritePokeList.map(item => item.id);
    // const pokeIdArr = poke.map(item => item.id);
    // const compare = favPokeIdArr.filter(item => pokeIdArr.includes(item));
  }

  const deleteTopping = id => {
    deleteDoc(doc(db, "toppings", id));
  };

  return (
    <div className="container">
      <Navbar Link={Link} />
      <AppContext.Provider value={{
        topping,
        setTopping,
        handleSubmit,
        toppingsList,
        deleteTopping
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
