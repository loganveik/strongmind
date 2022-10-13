import './Owner.css';
import React, { useContext } from 'react';
import { AppContext } from '../../App';

const Owner = () => {
    const { topping, setTopping, handleSubmit } = useContext(AppContext);
    return (
        <div className="toppings-card">

            <div className="toppings-add">
                <h1 className="toppings-add-title">Add a Topping!</h1>
                <form className="toppings-add-form">
                    <input
                        className="toppings-add-form-input"
                        onChange={(event) => { setTopping(event.target.value) }}
                        value={topping}
                    />
                    <button
                        className="toppings-add-form-button"
                        type="submit"
                        onClick={handleSubmit}
                    >Add
                     </button>
                </form>
            </div>

            <div className="toppings-list">
                {/* <p className="toppings-list-warning">No toppings yet, add some!</p> */}
                <div className="toppings-list-item">
                    <p className="toppings-list-item-name">Kiwi</p>
                    <div className="toppings-list-item-icons">
                        <i className="toppings-list-item-icon fa-solid fa-pen"></i>
                        <i className="toppings-list-item-icon fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Owner;
