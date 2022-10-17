import './Owner.css';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import ToppingAddForm from '../../components/ToppingAddForm/ToppingAddForm';
import ToppingUpdateForm from '../../components/ToppingUpdateForm/ToppingUpdateForm';

const Owner = () => {

    const { topping, setTopping, toppingsList, handleToppingSubmit, deleteTopping, toppingWarning, getToppingsList, handleUpdateTopping, isToppingUpdating, submitUpdatedTopping } = useContext(AppContext);

    useEffect(() => {
        getToppingsList();
    }, []);

    return (
        <div className="toppings-card">

            {/* <div className="toppings-add">
                <h1 className="toppings-add-title">Add a Topping!</h1>
                <form className="toppings-add-form">
                    <input
                        className="toppings-add-form-input"
                        onChange={(e) => { setTopping({ topping: e.target.value }) }}
                        value={topping.topping}
                    />
                    <button
                        className="toppings-add-form-button"
                        type="submit"
                        onClick={handleToppingSubmit}
                    >Add
                     </button>
                </form>
                {toppingWarning && <p className="toppings-dupe-warning">{toppingWarning}</p>}
            </div> */}
            {
                // isToppingUpdating
                //     ?
                //     <ToppingUpdateForm
                //         onChange={(e) => { setTopping({ topping: e.target.value }) }}
                //         value={topping.topping}
                //         onClick={submitUpdatedTopping}
                //     />
                //     :
                    <ToppingAddForm
                        onChange={(e) => { setTopping({ topping: e.target.value }) }}
                        value={topping.topping}
                        onClick={handleToppingSubmit}
                        toppingWarning={toppingWarning}
                    />
            }

            <div className="toppings-list">
                {
                    toppingsList.length === 0
                        ?
                        <p className="toppings-list-warning">No toppings yet, add some!</p>
                        :
                        toppingsList.map(item => (
                            <div className="toppings-list-item" key={item.id}>
                                <p className="toppings-list-item-name">{item.topping}</p>
                                <div className="toppings-list-item-icons">
                                    <i className="toppings-list-item-icon fa-solid fa-pen" onClick={() => handleUpdateTopping(item.id, item.topping)}></i>
                                    <i className="toppings-list-item-icon fa-solid fa-trash" onClick={() => deleteTopping(item.id)}></i>
                                </div>
                            </div>
                        ))
                }
            </div>

        </div>
    )
}

export default Owner;
