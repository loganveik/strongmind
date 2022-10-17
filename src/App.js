import React, { useState, createContext, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Owner from './pages/Owner/Owner';
import Chef from './pages/Chef/Chef';
import Navbar from './components/Navbar/Navbar';
import { db } from './firebase.config';
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export const AppContext = createContext();

function App() {
  const [topping, setTopping] = useState({
    topping: ""
  });
  const [toppingsList, setToppingsList] = useState([]);
  const [toppingWarning, setToppingWarning] = useState("");
  const [updatedTopping, setUpdatedTopping] = useState({ topping: "" });
  const toppingsCollectionRef = collection(db, "toppings");

  const getToppingsList = () => {
    onSnapshot(toppingsCollectionRef, snapshot => {
      setToppingsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), serverTimestamp: serverTimestamp() })));
    });
  };

  useEffect(() => {
    getToppingsList();
    // console.log(toppingsList);
  }, [])

  // Pizzas State (Chef Page)
  // const [pizza, setPizza] = useState({
  //   name: "",
  //   toppings: [],
  //   serverTimestamp: "" 
  // });
  // const [pizzasList, setPizzasList] = useState([]);
  // const [pizzaWarning, setPizzaWarning] = useState("");
  // const pizzasCollectionRef = collection(db, "pizzas");

  // --TOPPINGS--
  // const getToppingsList = () => {
  //   onSnapshot(toppingsCollectionRef, snapshot => {
  //     setToppingsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  //   });
  // };

  // const handleToppingSubmit = (e) => {
  //   e.preventDefault();
  //   const enteredTopping = topping.topping;
  //   const toppingListTopping = toppingsList.map(item => item.topping.toLowerCase());
  //   const compare = toppingListTopping.includes(enteredTopping.toLowerCase());
  //   if (!enteredTopping) {
  //     setToppingWarning("You must enter a topping!");
  //   } else if (compare === true) {
  //     setToppingWarning(`${enteredTopping} is already a topping!`);
  //   } else {
  //     addDoc(toppingsCollectionRef, {});
  //     setTopping({
  //       topping: ""
  //     });
  //     setToppingWarning("");
  //   };
  // };
  // const deleteTopping = id => {
  //   deleteDoc(doc(db, "toppings", id));
  // };
  // const submitUpdatedTopping = (e) => {
  //   e.preventDefault();
  //   const enteredTopping = updatedTopping.topping;
  //   const toppingListTopping = toppingsList.map(item => item.topping.toLowerCase());
  //   const compare = toppingListTopping.includes(enteredTopping.toLowerCase());
  //   if (!enteredTopping) {
  //     setToppingWarning("You must update your topping!");
  //   } else if (compare === true) {
  //     setToppingWarning(`${enteredTopping} is already a topping!`);
  //   } else {
  //     updateDoc(toppingsCollectionRef, updatedTopping);
  //     setUpdatedTopping({
  //       topping: ""
  //     });
  //     setToppingWarning("");
  //     setIsToppingUpdating(false);
  //   };
  // };

  // const handleUpdateTopping = (id, topping) => {
  //   toppingsCollectionRef
  //   setIsToppingUpdating(true);
  //   setUpdatedTopping(topping);
  // };

  // // --PIZZAS--
  // const getPizzasList = () => {
  //   onSnapshot(pizzasCollectionRef, snapshot => {
  //     setPizzasList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  //   });
  // };

  // const handlePizzaSubmit = (e) => {
  //   e.preventDefault();
  //   const enteredPizza = pizza.name;
  //   const pizzaListPizza = pizzasList.map(item => item.name.toLowerCase());
  //   const compare = pizzaListPizza.includes(enteredPizza.toLowerCase());
  //   const pizzaToppingsArr = pizza.toppings;
  //   if (!enteredPizza) {
  //     setPizzaWarning("You must name your pizza!");
  //   } else if (compare === true) {
  //     setPizzaWarning(`A pizza with the name ${enteredPizza} already exists!`);
  //   } else if (pizzaToppingsArr.length === 0) {
  //     setPizzaWarning("You must choose at least 1 topping for your pizza!");
  //   } else {
  //     addDoc(pizzasCollectionRef, pizza);
  //     setPizza({
  //       name: "",
  //       toppings: []
  //     });
  //     setPizzaWarning("");
  //   }
  //   // todo: A pizza with these toppings already exists! (compare 2 arrays)
  // }

  // const handleTopping = (e) => {
  //   const selectedToppingValue = e.target.dataset.topping;
  //   const pizzaToppingsState = pizza.toppings;
  //   const newToppingArr = [...pizzaToppingsState, selectedToppingValue];
  //   const pizzaToppingsStateMap = pizzaToppingsState.map(item => item);
  //   const compare = pizzaToppingsStateMap.filter(item => selectedToppingValue.includes(item));
  //   if (compare.length > 0) {
  //     return
  //   } else {
  //     setPizza({
  //       ...pizza,
  //       toppings: newToppingArr
  //     });
  //     setPizzaWarning("");
  //   }
  // }

  // const removeSelectedTopping = (e) => {
  //   const selectedToppingValue = e.target.dataset.topping;
  //   const pizzaToppingsState = pizza.toppings;
  //   const filteredItems = pizzaToppingsState.filter(item => item !== selectedToppingValue);
  //   setPizza({
  //     ...pizza,
  //     toppings: filteredItems
  //   });
  // };

  // const deletePizza = id => {
  //   deleteDoc(doc(db, "pizzas", id));
  // };

  return (
    <div className="container">
      <Navbar Link={Link} />
      <AppContext.Provider value={{
        topping,
        // setTopping,
        getToppingsList,
        // handleToppingSubmit,
        // toppingsList,
        // deleteTopping,
        // toppingWarning,
        // handlePizzaSubmit,
        // getPizzasList,
        // pizzasList,
        // deletePizza,
        // setPizza,
        // pizza,
        // handleTopping,
        // setPizzaWarning,
        // pizzaWarning,
        // handleUpdateTopping,
        // isToppingUpdating,
        // submitUpdatedTopping,
        // Link,
        // removeSelectedTopping,
        // setUpdatedTopping
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
