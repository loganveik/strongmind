import './Chef.css';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';

const Chef = () => {

    const { pizza, setPizza, pizzasList, toppingsList, handlePizzaSubmit, deletePizza, pizzaWarning, getPizzasList, getToppingsList } = useContext(AppContext);

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
                        onChange={(e) => { setPizza({ name: e.target.value }) }}
                        value={pizza.name}
                    />

                    <ul className="pizzas-create-form-toppings">
                        {!toppingsList.length
                            ?
                            <p className="pizzas-form-toppings-warning">No toppings yet, add some!</p>
                            :
                            toppingsList.map(item => (
                                <li key={item.id} className="pizzas-create-form-topping">
                                    <input className="pizzas-create-form-checkbox" type="checkbox" value={item.topping} />
                                    {item.topping}
                                </li>
                            ))
                            // look up how to submit checkbox data/values
                            // also instead of using toppingsdb and injecting it into pizzasdb, try doing what u did w poke and ...spread topping values directly into pizza state. basically dont do it the way youre doing it rn. try the first thing first tho
                        }
                    </ul>

                    <button
                        className="pizzas-create-form-button"
                        type="submit"
                        onClick={handlePizzaSubmit}
                    >Create
                        </button>
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
                                        {/* {
                                            item.toppings.map((topping, index) => (
                                                <p key={index} className="pizzas-list-item-topping">{topping}</p>
                                            ))
                                        } */}
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
