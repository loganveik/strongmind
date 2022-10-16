import './Chef.css';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';

const Chef = () => {

    const { pizza, setPizza, pizzasList, toppingsList, handlePizzaSubmit, deletePizza, pizzaWarning, getPizzasList, getToppingsList, handleTopping } = useContext(AppContext);

    useEffect(() => {
        getPizzasList();
        getToppingsList();
    }, []);

    return (
        <div className="pizzas-card">

            <div className="pizzas-create">
                <h1 className="pizzas-create-title">Create a Pizza!</h1>
                <form className="pizzas-create-form">
                    <input
                        className="pizzas-create-form-input"
                        placeholder='"The Cactus Jack"'
                        onChange={(e) => { setPizza({ ...pizza, name: e.target.value }) }}
                        value={pizza.name}
                    />

                    <div className="form-flex">

                        <div className="topping-dropdown">
                            <div className="topping-dropdown-btn">Select a Topping <i
                                className="fa-solid fa-caret-down"></i>
                            </div>
                            <ul className="topping-dropdown-items">
                                {
                                    toppingsList.map((item, i) => (
                                        <li
                                            key={item.id}
                                            className="topping-dropdown-item"
                                            data-topping={item.topping}
                                            // onClick={(e) => handleTopping(e, i)}
                                            onClick={(e) => handleTopping(e)}
                                        // onclick, push INTO pizza.toppings [] state arr
                                        >
                                            {item.topping}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <button
                            className="pizzas-create-form-button"
                            type="submit"
                            onClick={handlePizzaSubmit}
                        // sends pizza arr to firebase
                        >Create
                        </button>
                    </div>
                    <div className="selected-toppings">
                        {
                            pizzaWarning.length > 0
                                ?
                                <p>{pizzaWarning}</p>
                                :
                                pizza.toppings.map((item, i) => (
                                    <span key={i} className="topping-item">{item}</span>
                                ))
                        }
                        {/* and then here, map over that array and display toppings in a span class (above) */}
                    </div>

                </form>
            </div>

            <div className="pizzas-list">
                {
                    pizzasList.length === 0
                        ?
                        <p className="pizzas-list-warning">No pizzas yet, add some!</p>
                        :
                        pizzasList.map(item => (
                            <div className="pizzas-list-item" key={item.id}>
                                <div className="pizzas-list-item-info">
                                    <p className="pizzas-list-item-name">{item.name}</p>
                                    <div className="pizzas-list-item-toppings">
                                        {
                                            item.toppings.map((topping, index) => (
                                                <p key={index} className="pizzas-list-item-topping">{topping}</p>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="pizzas-list-item-icons">
                                    <i className="pizzas-list-item-icon fa-solid fa-pen"></i>
                                    <i className="pizzas-list-item-icon fa-solid fa-trash" onClick={() => deletePizza(item.id)}></i>
                                </div>
                            </div>
                        ))
                }
            </div>

        </div>
    )
}

export default Chef;
