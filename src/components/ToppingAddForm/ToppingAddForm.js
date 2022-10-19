import './ToppingAddForm.css';
import React from 'react';

const ToppingAddForm = ({ onChange, value, onClick, toppingWarning }) => {
    return (
        <div className="toppings-add">
            <h1 className="toppings-add-title">Add a Topping!</h1>
            <form className="toppings-add-form">
                <input
                    className="toppings-add-form-input"
                    onChange={onChange}
                    value={value}
                    placeholder={'"Pepperoni"'}
                />
                <button
                    className="toppings-add-form-button"
                    type="submit"
                    onClick={onClick}
                >Add
                     </button>
            </form>
            {toppingWarning && <p className="toppings-dupe-warning">{toppingWarning}</p>}
        </div>
    )
}

export default ToppingAddForm;
