import './Owner.css';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import ToppingAddForm from '../../components/ToppingAddForm/ToppingAddForm';
import ToppingUpdateForm from '../../components/ToppingUpdateForm/ToppingUpdateForm';

const Owner = () => {

    const {
        topping,
        setTopping,
        toppingsList,
        // handleToppingSubmit,
        // deleteTopping,
        // toppingWarning,
        // getToppingsList,
        // handleUpdateTopping,
        // isToppingUpdating,
        // submitUpdatedTopping,
        // setUpdatedTopping
    } = useContext(AppContext);

    useEffect(() => {
        // getToppingsList();
    }, []);

    return (
        <div className="toppings-card">
            {/* {
                isToppingUpdating
                    ?
                    <ToppingUpdateForm
                        onChange={(e) => { setUpdatedTopping({ topping: e.target.value }) }}
                        value={topping.topping}
                        onClick={submitUpdatedTopping}
                        toppingWarning={toppingWarning}
                    />
                    :
                    <ToppingAddForm
                        onChange={(e) => { setTopping({ topping: e.target.value }) }}
                        value={topping.topping}
                        onClick={handleToppingSubmit}
                        toppingWarning={toppingWarning}
                    />
            } */}
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
                                    {/* <i className="toppings-list-item-icon fa-solid fa-pen" onClick={() => handleUpdateTopping(item.id, item.topping)}></i> */}
                                    {/* <i className="toppings-list-item-icon fa-solid fa-trash" onClick={() => deleteTopping(item.id)}></i> */}
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
        // <></>
    )
}

export default Owner;
