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
        if (hiddenInput.value !== "") {
            img.src = hiddenInput.value;
        }
        else {
            img.src = "/img/placeholder.webp";
        }
    });
}

export default resetButton;
