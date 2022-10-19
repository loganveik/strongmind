import './PizzaUpdateForm.css';
import React from 'react';

const PizzaUpdateForm = ({ onChange, value, toppingsList, handleUpdatedTopping, handlePizzaSubmit, updatedPizza, pizzaWarning, Link, removeUpdatedSelectedTopping }) => {
    return (
        <div className="pizzas-create">
            <h1 className="pizzas-create-title">Update your Pizza!</h1>
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
                                            onClick={handleUpdatedTopping}
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
                    >Update
                </button>
                </div>
                <div className="selected-toppings">
                    {
                        updatedPizza.toppings.map((item, i) => (
                            <div key={i} className="topping-item">
                                <p>{item}</p>
                                <i onClick={removeUpdatedSelectedTopping} data-topping={item} className="fa-solid fa-xmark"></i>
                            </div>
                        ))
                    }
                </div>
            </form>
            {pizzaWarning && <p className="topping-item-warning">{pizzaWarning}</p>}
        </div>
    )
}

export default PizzaUpdateForm;
