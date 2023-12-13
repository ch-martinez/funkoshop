/* Funciones para el carrito */

// Sumar uno a la cantidad del item especificado y la cantidad en total.
function btn__add(element) {
    // El contenedor que almacena el quantityInput
    const container = element.parentElement.parentElement;
    const quantityInput = container.querySelector('input[type="number"]');
    quantityInput.value++;

    const totalQuantity = document.querySelector("#total-quantity");
    totalQuantity.textContent++;

    // Ejecutar el evento manualmente por el 'readonly'
    quantityInput.dispatchEvent(new Event('input'));
}

// Restar uno a la cantidad del item especificado y la cantidad en total.
function btn__substract(element) {
    // El contenedor que almacena el quantityInput
    const container = element.parentElement.parentElement;
    const quantityInput = container.querySelector('input[type="number"]');
    if (quantityInput.value > 1) {
        quantityInput.value -= 1;
        const totalQuantity = document.querySelector("#total-quantity");
        totalQuantity.textContent--;
    }

    // Ejecutar el evento manualmente por el 'readonly'
    quantityInput.dispatchEvent(new Event('input'));
}

// Actualizar el precio parcial del item seleccionado según la cantidad.
function upgradeItemTotal(element) {
    const tableRow = element.closest(".table-cart__row");

    // Precio unitario
    const priceSpan = tableRow.querySelector(".card__price > span");
    const unitPrice = parseFloat(priceSpan.textContent);

    // Precio parcial
    const partialPrice = tableRow.querySelector(".card__price--table");
    partialPrice.value = `$ ${(element.value * unitPrice).toFixed(2)}`;

    // Ejecutar el evento manualmente por el 'readonly'
    partialPrice.dispatchEvent(new Event('input'));
}

// Actualizar el precio total de la compra.
function upgradeTotalPrice(element) {
    // Precios parciales de todos los inputs
    const partialPrices = document.querySelectorAll(".card__price--table");
    let totalAmount = 0;
    partialPrices.forEach(partialPrice => {
        totalAmount += parseFloat(partialPrice.value.slice(2));
    });
    
    // Subtotal de la compra
    const subtotalPrice = document.querySelector("#subtotal-price");
    subtotalPrice.textContent = `$${totalAmount}`;

    // Precio total de la compra
    const totalPrice = document.querySelector("#total-price");
    totalPrice.textContent = `$${totalAmount}`;
}


// Verificar si el cliente ha seleccionado un producto para comprar,
// si no seleccionó ninguno, no puede realizar la compra.
function checkTotalPrice(event) {
    const totalPrice = document.querySelector("#total-price");
    if (totalPrice.textContent === "$ 0") {
        event.preventDefault();
    }
}
