function btn__add(elemento) {
    // Obtenemos el div padre del elemento (el elemento "padre")
    const padre = elemento.parentElement;

    // Obtenemos el div padre del div padre (el elemento "abuelo")
    const abuelo = padre.parentElement;
    // Encuentra el elemento input dentro del abuelo
    const input = abuelo.querySelector('input[type="number"]');
    var valorActual = parseInt(input.value);
    input.value = valorActual + 1;
    return false;

}

function btn__substract(elemento) {
    // Obtenemos el div padre del elemento (el elemento "padre")
    const padre = elemento.parentElement;

    // Obtenemos el div padre del div padre (el elemento "abuelo")
    const abuelo = padre.parentElement;
    // Encuentra el elemento input dentro del abuelo
    const input = abuelo.querySelector('input[type="number"]');
    var valorActual = parseInt(input.value);
    if (valorActual > 1) {
        input.value = valorActual - 1;
    }
    return false;
}

