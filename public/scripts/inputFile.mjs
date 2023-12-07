/**
 * Cambiar la imagen que aparece como preview luego de que el usuario haya
 * seleccionado una imagen desde un \<input type="file">
 * @param {String} inputFileSelector Selector del \<input type="file">
 * @param {String} imgSelector Selector de la etiqueta \<img> asociada al 
 *                             \<input type="file">
 */
const changeImage = (inputFileSelector, imgSelector) => {
    const inputFile = document.querySelector(inputFileSelector);
    const img = document.querySelector(imgSelector);
    inputFile.addEventListener("change", () => {
        const file = inputFile.files[0];
        if (file) { 
            // Verificar que se seleccionó un archivo.
            const reader = new FileReader();

            // Asignar la imagen cargada al atributo src de la etiqueta img.
            reader.onload = (e) => {
                img.src = e.target.result;
            };

            // Leer el contenido del archivo como una URL de datos.
            reader.readAsDataURL(file);
        }
    });
}

export default changeImage;
