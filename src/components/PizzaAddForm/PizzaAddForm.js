import './PizzaAddForm.css';
import React from 'react';

const PizzaAddForm = ({ onChange, value, toppingsList, handleTopping, handlePizzaSubmit, pizza, pizzaWarning, Link, removeSelectedTopping }) => {
    return (
        <div className="pizzas-create">
            <h1 className="pizzas-create-title">Create a Pizza!</h1>
            <form className="pizzas-create-form">
                <input
                    className="pizzas-create-form-input"
                    placeholder='"The Cactus Jack"'
                    onChange={onChange}
                    value={value}
                />
                <div className="form-flex">
                    <div className="topping-dropdown">
                        <div className="topping-dropdown-btn">Select a Topping <i
                            className="fa-solid fa-caret-down"></i>
                        </div>
                        <ul className="topping-dropdown-items">
                            {
                                toppingsList.length === 0
                                    ?
                                    <Link className="topping-dropdown-item-warning" to={"/owner"}>No toppings yet, add some!</Link>
                                    :
                                    toppingsList.map(item => (
                                        <li
                                            key={item.id}
                                            className="topping-dropdown-item"
                                            data-topping={item.topping}
                                            onClick={handleTopping}
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
                    >Create
                </button>
                </div>
                <div className="selected-toppings">
                    {
                        pizza.toppings.map((item, i) => (
                            <div key={i} className="topping-item">
                                <p>{item}</p>
                                <i onClick={removeSelectedTopping} data-topping={item} className="fa-solid fa-xmark"></i>
                            </div>
                        ))
                    }
                </div>
            </form>
            {pizzaWarning && <p className="topping-item-warning">{pizzaWarning}</p>}
        </div>
    )
}

export default PizzaAddForm;
