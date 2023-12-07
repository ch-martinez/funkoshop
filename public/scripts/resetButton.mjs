/**
 * Resetear la imagen del preview a la original luego de apretar en el botón de 
 * "Deshacer Cambios".
 * @param {String} resetButtonSelector Selector para el \<button type="reset">
 * @param {String} hiddenInputSelector Selector para el \<input type="hidden">
 * @param {String} imgSelector Selector para la etiqueta \<img> asociada al
 *                             \<input type="hidden"> con la ruta de la imagen
 *                             original.
 */
const resetButton = (resetButtonSelector, hiddenInputSelector, imgSelector) => {
    document.querySelector(resetButtonSelector).addEventListener("click", () => {
        const hiddenInput = document.querySelector(hiddenInputSelector);
        const img = document.querySelector(imgSelector);
        // Verificar si el <input type="hidden"> tiene contenido, si lo tiene,
        // estamos en la vista de edición, por lo que la imagen que se establece
        // es la que viene con el producto. 
        if (hiddenInput.value !== "") {
            img.src = hiddenInput.value;
        }
        // Si no lo tiene, estamos en la vista de creación, por lo que la imagen
        // que se establece es el placeholder.
        else {
            img.src = "/img/placeholder.webp";
        }
    });
}

export default resetButton;
