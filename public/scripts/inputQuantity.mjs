const input = document.querySelector("#item-quantity");
const plusButton = document.querySelector("#btn-add");
const minusButton = document.querySelector("#btn-substract");

// Cuando se haga click en el botón +
plusButton.addEventListener("click", () => input.value++);

// Cuando se haga click en el botón -
minusButton.addEventListener("click", () => {
    if (input.value > 1) {
        input.value -= 1;
    }
});
