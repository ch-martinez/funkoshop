/* --- DEPENDENCIES --- */
// Temporal hasta que haga las vistas!
const path = require("node:path");


/* --- MODEL --- */


/* --- READ --- */
// Devolver la vista con el listado de productos.
const getProducts = async (req, res) => {
    try {
        // TODO: obtener los productos de la base de datos y mostrar la vista si
        //       no hay problemas.
        const filePath = path.join(__dirname, '..', '..', 'public/pages/admin/admin.html');
        res.sendFile(filePath);
    }
    catch (err) {
        console.error(`Error al obtener los productos: ${err}`);
        res.status(500).send("Internal Server Error");
    }
}


/* --- CREATE --- */
// Devolver la vista con el formulario para la creación de un nuevo producto.
const getCreateForm = async (req, res) => {
    try {
        // TODO: mostrar la vista del formulario para la creación de productos.
        const filePath = path.join(__dirname, "..", "..", "public/pages/admin/create.html");
        res.sendFile(filePath);
    }
    catch (err) {
        console.error(`Error al obtener el formulario de creación de productos: ${err}`);
        res.status(500).send("Internal Server Error");
    }
}

// Crear el nuevo producto con la información recibida desde el formulario de 
// creación y enviarlo a la base de datos.
const createNewProduct = async (req, res) => {
    try {
        // TODO: validación de la información (Express-validator).
        // TODO: operación de creación en la base de datos.
        res.send("Producto creado con éxito");
    }
    catch (err) {
        res.status(422).send("No se ha podido crear el producto en la base de datos");
    }
}


/* --- UPDATE --- */
// Devolver la vista con el formulario para la edición de un producto seleccionado.
const getEditForm = async (req, res) => {
    try {
        // TODO: mostrar la vista del formulario para la edición de productos.
        const filePath = path.join(__dirname, "..", "..", "public/pages/admin/edit.html");
        res.sendFile(filePath);
    }
    catch (err) {
        console.error(`Error al obtener el formulario de edición de productos: ${err}`);
        res.status(500).send("Internal Server Error");
    }
}

// Editar el producto seleccionado con la información recibida desde el 
// formulario de edición y, luego, enviarlo a la base de datos.
const editProduct = async (req, res) => {
    try {
        // TODO: validación de la información (Express-validator).
        // TODO: operación de edición en la base de datos.
        res.send("Producto editado con éxito");
    }
    catch (err) {
        res.status(422).send("No se ha podido modificar el producto seleccionado en la base de datos");
    }
}


/* --- DELETE --- */
// Eliminar el producto seleccionado en la base de datos.
const deleteProduct = async (req, res) => {
    try {
        // TODO: operación de eliminación en la base de datos.
        res.send("Producto eliminado con éxito");
    }
    catch (err) {
        res.status(422).send("No se ha podido eliminar el producto seleccionado en la base de datos");
    }
}


/* --- EXPORT --- */
module.exports = {
    getProducts,
    getCreateForm,
    createNewProduct,
    getEditForm,
    editProduct,
    deleteProduct
}