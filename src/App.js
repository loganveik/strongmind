import React, { useState, createContext, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Owner from './pages/Owner/Owner';
import Chef from './pages/Chef/Chef';
import Navbar from './components/Navbar/Navbar';
import { db } from './firebase.config';
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';

export const AppContext = createContext();

function App() {
  const [topping, setTopping] = useState({ topping: "" });
  const [toppingsList, setToppingsList] = useState([]);

  const [toppingWarning, setToppingWarning] = useState("");

  const [updatedTopping, setUpdatedTopping] = useState({ topping: "", id: "" });
  const [isToppingUpdating, setIsToppingUpdating] = useState(false);

  const toppingsCollectionRef = collection(db, "toppings");
  const toppingQ = query(toppingsCollectionRef, orderBy("createdAt"));

  // toppings
  const getToppingsList = () => {
    onSnapshot(toppingQ, snapshot => {
      setToppingsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  };

  const handleToppingSubmit = (e) => {
    e.preventDefault();
    const enteredTopping = topping.topping;
    const toppingListTopping = toppingsList.map(item => item.topping.toLowerCase());
    const compare = toppingListTopping.includes(enteredTopping.toLowerCase());
    if (!enteredTopping) {
      setToppingWarning("You must enter a topping!");
    } else if (compare === true) {
      setToppingWarning(`${enteredTopping} is already a topping!`);
    } else {
      addDoc(toppingsCollectionRef, {
        topping: enteredTopping,
        createdAt: serverTimestamp()
      })
        .then(() => {
          setTopping({
            topping: ""
          });
          setToppingWarning("");
        })
    };
  };

  const deleteTopping = id => {
    if (isToppingUpdating && id === updatedTopping.id) {
      setToppingWarning("You can't delete a topping you're currently updating!");
    } else {
      const docRef = doc(db, "toppings", id);
      deleteDoc(docRef);
    }
  };

  const handleUpdateTopping = (id, topping) => {
    setIsToppingUpdating(true);
    setUpdatedTopping({
      topping: topping,
      id: id
    });
    setToppingWarning("");
  };

  const submitUpdatedTopping = (e) => {
    const docRef = doc(db, "toppings", updatedTopping.id);
    e.preventDefault();
    const enteredTopping = updatedTopping.topping;
    const toppingListTopping = toppingsList.map(item => item.topping.toLowerCase());
    const compare = toppingListTopping.includes(enteredTopping.toLowerCase());
    if (!enteredTopping) {
      setToppingWarning("You must enter a topping!");
    } else if (compare === true) {
      setToppingWarning(`${enteredTopping} is already a topping!`);
    } else {
      updateDoc(docRef, {
        topping: enteredTopping
      })
        .then(() => {
          setUpdatedTopping({
            topping: "",
            id: ""
          });
          setIsToppingUpdating(false);
          setToppingWarning("");
        });
    };
  };

  // Pizzas State (Chef Page)
  const [pizza, setPizza] = useState({ name: "", toppings: [] });
  const [pizzasList, setPizzasList] = useState([]);

  const [pizzaWarning, setPizzaWarning] = useState("");

  const [updatedPizza, setUpdatedPizza] = useState({ name: "", toppings: [], id: "" });
  const [isPizzaUpdating, setIsPizzaUpdating] = useState(false);

  const pizzasCollectionRef = collection(db, "pizzas");
  const pizzaQ = query(pizzasCollectionRef, orderBy("createdAt"));

  const getPizzasList = () => {
    onSnapshot(pizzaQ, snapshot => {
      setPizzasList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  };

  const handleTopping = (e) => {
    const selectedToppingValue = e.target.dataset.topping;
    const pizzaToppingsArr = pizza.toppings;
    const newToppingsArr = [...pizzaToppingsArr, selectedToppingValue];
    const pizzaToppingsArrMap = pizzaToppingsArr.map(item => item);
    const compare = pizzaToppingsArrMap.filter(item => selectedToppingValue.includes(item));
    if (compare.length > 0) {
      return
    } else {
      setPizza({
        ...pizza,
        toppings: newToppingsArr
      });
      setPizzaWarning("");
    }
  }

  const removeSelectedTopping = (e) => {
    const selectedToppingValue = e.target.dataset.topping;
    const pizzaToppingsArr = pizza.toppings;
    const filteredItems = pizzaToppingsArr.filter(item => item !== selectedToppingValue);
    setPizza({
      ...pizza,
      toppings: filteredItems
    });
  };

  const removeUpdatedSelectedTopping = (e) => {
    const selectedToppingValue = e.target.dataset.topping;
    const pizzaToppingsArr = updatedPizza.toppings;
    const filteredItems = pizzaToppingsArr.filter(item => item !== selectedToppingValue);
    setUpdatedPizza({
      ...updatedPizza,
      toppings: filteredItems
    });
  };

  const handlePizzaSubmit = (e) => {
    e.preventDefault();
    const enteredPizza = pizza.name;
    const pizzaListPizza = pizzasList.map(item => item.name.toLowerCase());
    const compare = pizzaListPizza.includes(enteredPizza.toLowerCase());
    const pizzaToppingsArr = pizza.toppings;
    if (!enteredPizza) {
      setPizzaWarning("You must name your pizza!");
    } else if (compare === true) {
      setPizzaWarning(`A pizza with the name ${enteredPizza} already exists!`);
    } else if (pizzaToppingsArr.length === 0) {
      setPizzaWarning("You must choose at least 1 topping for your pizza!");
    } else {
      addDoc(pizzasCollectionRef, {
        name: enteredPizza,
        toppings: pizzaToppingsArr,
        createdAt: serverTimestamp()
      })
        .then(() => {
          setPizza({
            name: "",
            toppings: []
          });
          setPizzaWarning("");
        })
    }
  }

  const deletePizza = id => {
    if (isPizzaUpdating && id === updatedPizza.id) {
      setPizzaWarning("You can't delete a pizza you're currently updating!");
    } else {
      const docRef = doc(db, "pizzas", id);
      deleteDoc(docRef);
    }
  };

  const handleUpdatePizza = (id, name, toppings) => {
    setIsPizzaUpdating(true);
    setUpdatedPizza({
      name: name,
      toppings: toppings,
      id: id
    });
    setPizzaWarning("");
  };

  const handleUpdatedTopping = (e) => {
    const selectedToppingValue = e.target.dataset.topping;
    const pizzaToppingsArr = updatedPizza.toppings;
    const newToppingsArr = [...pizzaToppingsArr, selectedToppingValue];
    const pizzaToppingsArrMap = pizzaToppingsArr.map(item => item);
    const compare = pizzaToppingsArrMap.filter(item => selectedToppingValue.includes(item));
    if (compare.length > 0) {
      return
    } else {
      setUpdatedPizza({
        ...updatedPizza,
        toppings: newToppingsArr
      });
      setPizzaWarning("");
    }
  }

  const submitUpdatedPizza = (e) => {
    const docRef = doc(db, "pizzas", updatedPizza.id);
    e.preventDefault();
    const enteredPizza = updatedPizza.name;
    // const pizzaListPizza = pizzasList.map(item => item.name.toLowerCase());
    // const compare = pizzaListPizza.includes(enteredPizza.toLowerCase());
    const pizzaToppingsArr = updatedPizza.toppings;
    if (!enteredPizza) {
      setPizzaWarning("You must name your pizza!");
    }
    // else if (compare === true) {
    //   setPizzaWarning(`A pizza with the name ${enteredPizza} already exists!`);
    // } 
    else if (pizzaToppingsArr.length === 0) {
      setPizzaWarning("You must choose at least 1 topping for your pizza!");
    } else {
      updateDoc(docRef, {
        name: enteredPizza,
        toppings: pizzaToppingsArr
      })
        .then(() => {
          setUpdatedPizza({
            name: "",
            toppings: [],
            id: ""
          });
          setIsPizzaUpdating(false);
          setPizzaWarning("");
        });
    }
  }

  return (
    <div className="container">
      <Navbar Link={Link} />
      <AppContext.Provider value={{
        topping,
        setTopping,
        toppingsList,
        toppingWarning,
        updatedTopping,
        setUpdatedTopping,
        isToppingUpdating,
        getToppingsList,
        handleToppingSubmit,
        deleteTopping,
        handleUpdateTopping,
        submitUpdatedTopping,
        pizza,
        setPizza,
        pizzasList,
        pizzaWarning,
        updatedPizza,
        setUpdatedPizza,
        isPizzaUpdating,
        getPizzasList,
        handlePizzaSubmit,
        deletePizza,
        handleUpdatePizza,
        submitUpdatedPizza,
        handleTopping,
        Link,
        removeSelectedTopping,
        handleUpdatedTopping,
        removeUpdatedSelectedTopping
      }}>
        <Routes>
          <Route exact path="/" element={<Navigate to="/owner" />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/chef" element={<Chef />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;