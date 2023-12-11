/**
 * 
 * @param {Object} req Objeto Request
 * @param {String} inputName Nombre del campo del input file
 * @param {String} license Número de licencia en formato string.
 * @returns {string} Ruta final de la imagen
 */
const imagePath = (req, inputName, license) => {
    let path;
    switch (license) {
        case "1":
            path = `/pokemon/${req.files[inputName][0].filename}` ;
            break;

        case "2":
            path = `/star-wars/${req.files[inputName][0].filename}` ;
            break;

        case "3":
            path = `/harry-potter/${req.files[inputName][0].filename}` ;
            break;

        default:
            path = `/default/${req.files[inputName][0].filename}` ;
            break;
    }
    return path;
}

module.exports = imagePath;
