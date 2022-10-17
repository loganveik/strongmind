import './ToppingUpdateForm.css';
import React from 'react';

const ToppingUpdateForm = ({ onChange, value, onClick }) => {
    return (
        <div className="toppings-update">
            <h1 className="toppings-update-title">Update your Topping!</h1>
            <form className="toppings-update-form">
                <input
                    className="toppings-update-form-input"
                    onChange={onChange}
                    value={value}
                />
                <button
                    className="toppings-update-form-button"
                    type="submit"
                    onClick={onClick}
                >Update
                     </button>
            </form>
        </div>
    )
}

export default ToppingUpdateForm;
