/**
 * Verificación desde el lado del cliente en la vista de creación de un producto
 * para corroborar que el usuario haya seleccionado las dos imágenes obligatorias.
 * @param {String} frontImgSelector Selector del elemento \<img> que muestra la
 *                                  preview de la imagen frontal del producto.
 * @param {String} backImgSelector Selector del elemento \<img> que muestra la
 *                                 preview de la imagen dorsal del producto.
 * @param {String} formSelector Selector del elemento \<form> del formulario
 *                              para la creación de un producto.
 */
const submit = (frontImgSelector, backImgSelector, formSelector) => {
    const frontImage = document.querySelector(frontImgSelector);
    const backImage = document.querySelector(backImgSelector);
    const form = document.querySelector(formSelector);
    const alertDiv = document.querySelector(".error-alert");
    const alertFront = document.querySelector(".front-alert");
    const alertBack = document.querySelector(".back-alert");

    form.addEventListener("submit", (event) => {
        const frontImg = frontImage.src;
        const backImg = backImage.src;
        if (frontImg.includes("/img/placeholder.webp")) {
            alertDiv.style.display = "block";
            alertFront.style.display = "block";
            alertDiv.focus();
        }
        else {
            alertDiv.style.display = "none";
            alertFront.style.display = "none";
        }

        if (backImg.includes("/img/placeholder.webp")) {
            alertDiv.style.display = "block";
            alertBack.style.display = "block";
            alertDiv.focus();
        }
        else {
            alertDiv.style.display = "none";
            alertBack.style.display = "none";
        }

        if (alertDiv.style.display === "block") {
            event.preventDefault();
        }
    });
}

export default submit;
