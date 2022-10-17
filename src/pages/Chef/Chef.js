import './Chef.css';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import PizzaAddForm from '../../components/PizzaAddForm/PizzaAddForm';

const Chef = () => {

    const {
        pizza,
        setPizza,
        pizzasList,
        toppingsList,
        handlePizzaSubmit,
        deletePizza,
        toppingWarning,
        setPizzaWarning,
        pizzaWarning,
        getPizzasList,
        getToppingsList,
        handleTopping,
        Link,
        removeSelectedTopping
    } = useContext(AppContext);

    useEffect(() => {
        getPizzasList();
        getToppingsList();
    }, []);

    return (
        <div className="pizzas-card">
            <PizzaAddForm
                onChange={(e) => { setPizza({ ...pizza, name: e.target.value }) }}
                value={pizza.name}
                toppingsList={toppingsList}
                handleTopping={(e) => handleTopping(e)}
                handlePizzaSubmit={handlePizzaSubmit}
                pizza={pizza}
                pizzaWarning={pizzaWarning}
                Link={Link}
                removeSelectedTopping={(e) => removeSelectedTopping(e)}
            />
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
                                                <p key={index} className="pizzas-list-item-topping">{index > 0 && ', '}{topping}</p>
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
