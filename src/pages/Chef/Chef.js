import './Chef.css';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import PizzaAddForm from '../../components/PizzaAddForm/PizzaAddForm';
import PizzaUpdateForm from '../../components/PizzaUpdateForm/PizzaUpdateForm';

const Chef = () => {

    const {
        pizza,
        setPizza,
        pizzasList,
        toppingsList,
        handlePizzaSubmit,
        deletePizza,
        pizzaWarning,
        getPizzasList,
        getToppingsList,
        handleTopping,
        Link,
        removeSelectedTopping,
        handleUpdatePizza,
        isPizzaUpdating,
        setUpdatedPizza,
        updatedPizza,
        submitUpdatedPizza,
        handleUpdatedTopping,
        removeUpdatedSelectedTopping
    } = useContext(AppContext);

    useEffect(() => {
        getPizzasList();
        getToppingsList();
    }, []);

    return (
        <div className="pizzas-card">
            {
                isPizzaUpdating
                    ?
                    <PizzaUpdateForm
                        onChange={(e) => { setUpdatedPizza({ ...updatedPizza, name: e.target.value }) }}
                        value={updatedPizza.name}
                        toppingsList={toppingsList}
                        handleUpdatedTopping={(e) => handleUpdatedTopping(e)}
                        handlePizzaSubmit={submitUpdatedPizza}
                        updatedPizza={updatedPizza}
                        pizzaWarning={pizzaWarning}
                        Link={Link}
                        removeUpdatedSelectedTopping={(e) => removeUpdatedSelectedTopping(e)}
                    />
                    :
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
            }
            <div className="pizzas-list" data-testid="pizzas-list">
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
                                            item.toppings.map((topping, index, arr) => (
                                                <p key={index} className="pizzas-list-item-topping">{topping}{index + 1 === arr.length? '' : ', '}</p>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="pizzas-list-item-icons">
                                    <i className="pizzas-list-item-icon fa-solid fa-pen" onClick={() => handleUpdatePizza(item.id, item.name, item.toppings)}></i>
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
