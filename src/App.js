import React, { useState, createContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Owner from './pages/Owner/Owner';
import Chef from './pages/Chef/Chef';
import Navbar from './components/Navbar/Navbar';
import { db } from './firebase.config';
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

export const AppContext = createContext();

function App() {
  // Toppings State (Owner Page)
  const [topping, setTopping] = useState({ topping: "" });
  const [toppingsList, setToppingsList] = useState([]);
  const [toppingWarning, setToppingWarning] = useState("");
  const [isToppingUpdating, setIsToppingUpdating] = useState(false);
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
    const enteredTopping = topping.topping;
    const toppingListTopping = toppingsList.map(item => item.topping);
    const compare = toppingListTopping.includes(enteredTopping);
    if (!enteredTopping) {
      setToppingWarning("You must enter a topping!");
    } else if (compare === true) {
      setToppingWarning(`${enteredTopping} is already a topping!`);
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
  const handleUpdateTopping = (id, topping) => {
    setIsToppingUpdating(true);
    setTopping(topping);
    // console.log(id);
    // console.log("you are updating this id: " + id);
    // const gay = toppingsList.map(item => item.id);
    // const compare = gay.includes(id);
    // console.log(compare);
  };
  const submitUpdatedTopping = () => {
    setIsToppingUpdating(false);
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
    const pizzaListPizza = pizzasList.map(item => item.name);
    const compare = pizzaListPizza.includes(enteredPizza);
    const pizzaToppingsArr = pizza.toppings;
    if (!enteredPizza) {
      setPizzaWarning("You must name your pizza!");
    } else if (compare === true) {
      setPizzaWarning(`A pizza with the name ${enteredPizza} already exists!`);
    } else if (pizzaToppingsArr.length === 0) {
      setPizzaWarning("You must choose at least 1 topping for your pizza!");
    } else {
      addDoc(pizzasCollectionRef, pizza);
      setPizza({
        name: "",
        toppings: []
      });
      setPizzaWarning("");
    }
    // todo: A pizza with these toppings already exists! (compare 2 arrays)
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
      setPizzaWarning("");
    }
  }

  const removeSelectedTopping = (e) => {
    const selectedToppingValue = e.target.dataset.topping;
    const pizzaToppingsState = pizza.toppings;
    const filteredItems = pizzaToppingsState.filter(item => item !== selectedToppingValue);
    setPizza({
      ...pizza,
      toppings: filteredItems
    });
  };

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
        setPizzaWarning,
        pizzaWarning,
        handleUpdateTopping,
        isToppingUpdating,
        submitUpdatedTopping,
        Link,
        removeSelectedTopping
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
