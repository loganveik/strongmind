import React, { useState, createContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Owner from './pages/Owner/Owner';
import Chef from './pages/Chef/Chef';
import Navbar from './components/Navbar/Navbar';
import { db } from './firebase.config';
import { collection, onSnapshot, doc, addDoc, deleteDoc } from 'firebase/firestore';

export const AppContext = createContext();

function App() {
  // Toppings State (Owner Page)
  const [topping, setTopping] = useState({ topping: "" });
  const [toppingsList, setToppingsList] = useState([]);
  const [toppingWarning, setToppingWarning] = useState("");
  const toppingsCollectionRef = collection(db, "toppings");

  // Pizzas State (Chef Page)
  const [pizza, setPizza] = useState({
    name: "",
    toppings: []
  });
  const [pizzasList, setPizzasList] = useState([]);
  const [pizzaWarning, setPizzaWarning] = useState("");
  const pizzasCollectionRef = collection(db, "pizzas");

  // --TOPPINGS--
  const getToppingsList = () => {
    onSnapshot(toppingsCollectionRef, snapshot => {
      setToppingsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  };

  const handleToppingSubmit = (e) => {
    e.preventDefault();
    const toppingListTopping = toppingsList.map(item => item.topping);
    const enteredTopping = topping.topping;
    const compare = toppingListTopping.filter(item => enteredTopping.includes(item));
    if (enteredTopping === "") {
      return
    } else if (compare.length > 0) {
      setToppingWarning(`"${enteredTopping}" is already a topping`);
    } else {
      addDoc(toppingsCollectionRef, topping);
      setTopping({
        topping: ""
      });
      setToppingWarning("");
    };
  };

  const deleteTopping = id => {
    deleteDoc(doc(db, "toppings", id));
  };

  // --PIZZAS--
  const getPizzasList = () => {
    onSnapshot(pizzasCollectionRef, snapshot => {
      setPizzasList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  };

  const handlePizzaSubmit = (e) => {
    e.preventDefault();
    const enteredPizza = pizza.name;
    const pizzaToppingsState = pizza.toppings;
    if (enteredPizza === "") {
      return
    } else if (pizzaToppingsState.length === 0) {
      setPizzaWarning("You must choose at least 1 topping for your pizza!");
    }
    else {
      addDoc(pizzasCollectionRef, pizza);
      setPizza({
        name: "",
        toppings: []
      });
    }
    // console.log(pizza);
  }

  const handleTopping = (e) => {
    const selectedToppingValue = e.target.dataset.topping;
    const pizzaToppingsState = pizza.toppings;
    const newToppingArr = [...pizzaToppingsState, selectedToppingValue];
    const pizzaToppingsStateMap = pizzaToppingsState.map(item => item);
    const compare = pizzaToppingsStateMap.filter(item => selectedToppingValue.includes(item));

    if (compare.length > 0) {
      return
    } else {
      setPizza({
        ...pizza,
        toppings: newToppingArr
      });
    }

    // const toppingListTopping = toppingsList.map(item => item.topping);
    // const enteredTopping = topping.topping;
  }

  const deletePizza = id => {
    deleteDoc(doc(db, "pizzas", id));
  };

  return (
    <div className="container">
      <Navbar Link={Link} />
      <AppContext.Provider value={{
        topping,
        setTopping,
        getToppingsList,
        handleToppingSubmit,
        toppingsList,
        deleteTopping,
        toppingWarning,
        handlePizzaSubmit,
        getPizzasList,
        pizzasList,
        deletePizza,
        setPizza,
        pizza,
        handleTopping,
        pizzaWarning
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
