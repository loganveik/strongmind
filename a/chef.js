const dropdownBtn = document.querySelector(".topping-dropdown");
const toppDropdown = document.querySelector(".topping-dropdown-items");

const toppingDropdownItems = document.querySelectorAll(".topping-dropdown-item");
const selectedToppingsDiv = document.querySelector(".selected-toppings");

toppingDropdownItems.forEach(item => {
    item.addEventListener("click", () => {
        const value = item.dataset.val;
        const span = document.createElement("span");
        span.classList.add("topping-item");
        span.innerText = value;
        selectedToppingsDiv.append(span);
    });
});