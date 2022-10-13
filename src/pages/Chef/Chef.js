import './Chef.css';

const Chef = () => {
    return (
        <div className="pizzas-card">

            <div className="pizzas-create">
                <h1 className="pizzas-create-title">Create a Pizza!</h1>
                <form className="pizzas-create-form">
                    <input className="pizzas-create-form-input" placeholder='"The Cactus Jack"' />

                    <ul className="pizzas-create-form-toppings">
                        <li className="pizzas-create-form-topping">
                            <input className="pizzas-create-form-checkbox" type="checkbox" value="Kiwi" />
                            Kiwi
                        </li>
                        <li className="pizzas-create-form-topping">
                            <input className="pizzas-create-form-checkbox" type="checkbox" value="Banana" />
                            Banana
                        </li>
                    </ul>

                    <button className="pizzas-create-form-button" type="submit">Create</button>
                </form>
            </div>

            <div className="pizzas-list">
                {/* <p className="pizzas-list-warning">No pizzas yet, add some!</p> */}
                <div className="pizzas-list-item">
                    <div className="pizzas-list-item-info">
                        <p className="pizzas-list-item-name">The Fruity Rebel</p>
                        <div className="pizzas-list-item-toppings">
                            <p className="pizzas-list-item-topping">Kiwi</p>
                            <p className="pizzas-list-item-topping">Banana</p>
                        </div>
                    </div>
                    <div className="pizzas-list-item-icons">
                        <i className="pizzas-list-item-icon fa-solid fa-pen"></i>
                        <i className="pizzas-list-item-icon fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Chef;
