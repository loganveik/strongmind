import './ToppingUpdateForm.css';
import React from 'react';

const ToppingUpdateForm = ({ onChange, value, onClick, toppingWarning }) => {
    return (
        <div className="toppings-update">
            <h1 className="toppings-update-title">Update your Topping!</h1>
            <form className="toppings-update-form">
                <input
                    className="toppings-update-form-input"
                    onChange={onChange}
                    value={value}
                    placeholder={'"Pepperoni"'}
                />
                <button
                    className="toppings-update-form-button"
                    type="submit"
                    onClick={onClick}
                >Update
                     </button>
            </form>
            {toppingWarning && <p className="toppings-dupe-warning">{toppingWarning}</p>}
        </div>
    )
}

export default ToppingUpdateForm;
