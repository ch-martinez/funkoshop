/* --- MODEL --- */
const { 
    getProductsFromDB,
    getProductFromDB,
    getLicencesFromDB,
    getCategoriesFromDB,
    createProductInDB,
    editProductInDB
} = require("../models/productModel");


/* --- READ --- */
// Devolver la vista con el listado de productos.
const getProducts = async (req, res) => {
    try {
        const products = await getProductsFromDB();
        if (!products) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        res.render("admin/admin", {
            products,
            alert: null
        })
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
        const categories = await getCategoriesFromDB();
        const licences = await getLicencesFromDB();
        // TODO: pedir a la DB las cuotas.
        const dues = [ 12, 9, 6, 3 ];

        res.render("admin/create_edit", {
            product: null,
            categories,
            licences,
            dues
        });
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
        // const itemFrontImg = `/img/${req.files[0]}`;
        // const itemBackImg = `/img/${req.files[1]}`;
        const itemFrontImg = "IMAGEN FRONTAL";
        const itemBackImg = "IMAGEN DORSAL";

        console.log(req.body);

        const newProduct = {
            product_name: req.body.itemName,
            product_description: req.body.itemDescription,
            price: req.body.itemPrice,
            stock: req.body.itemStock,
            discount: req.body.itemDiscount,
            sku: req.body.itemSku,
            dues: req.body.itemDues,
            image_front: itemFrontImg,
            image_back: itemBackImg,
            licence_id: req.body.itemLicense,
            category_id: req.body.itemCategory,
        }
        
        console.log(newProduct);

        // const success = await createNewProduct(newProduct);
        const success = true;
        
        if (success) {
            res.redirect("/admin/create/success");
        }
        else {
            res.redirect("/admin/create/error");
        }
    }
    catch (err) {
        res.status(422).send("No se ha podido crear el producto en la base de datos");
    }
}

// Renderizar la vista de administrador con una alerta de éxito en la creación
// del nuevo producto.
const successfulCreate = async (req, res) => {
        const products = await getProductsFromDB();
        if (!products) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        res.render("admin/admin", {
            products,
            alert: {
                success: true,
                message: "¡Producto agregado con éxito en la base de datos!"
            }
        });
}

// Renderizar la vista de administrador con una alerta de error en la creación
// del nuevo producto.
const errorCreate = async (req, res) => {
        const products = await getProductsFromDB();
        if (!products) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        res.render("admin/admin", {
            products,
            alert: {
                success: false,
                message: "El producto no se ha podido agregar en la base de datos :("
            }
        });
}


/* --- UPDATE --- */
// Devolver la vista con el formulario para la edición de un producto seleccionado.
const getEditForm = async (req, res) => {
    try {
        const [product] = await getProductFromDB(req.params.id);
        if (!product) {
            res.status(404).send("Producto no encontrado");
        }

        const categories = await getCategoriesFromDB();
        const licences = await getLicencesFromDB();
        // TODO: pedir a la DB las cuotas.
        const dues = [ 12, 9, 6, 3 ];

        res.render("admin/create_edit", {
            product,
            categories,
            licences,
            dues
        });
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

        /* Validación de si se modificaron las imágenes */ 
        // Banderas necesarias para saber si eliminar o no los archivos de
        // imágenes en la carpeta 'public/img'.
        let frontImgModifed = false;
        let backImgModifed = false;

        // Valor predeterminado de los input files (sirve por si no se han
        // seleccionado imágenes en los inputs).
        let itemFrontImg = req.body.itemFrontImgNoMod;
        let itemBackImg = req.body.itemBackImgNoMod;

        // Si se seleccionaron imágenes en los files
        if (req.files && req.files.length > 0) {
            // Si se agregó la primera imagen en primer file
            if (req.files[0] && req.files.fieldname === "itemFrontImg") {
                itemFrontImg = `/img/${req.files[0].filename}`;
                frontImgModifed = true;
            }
            // Si se agregó la primera imagen en el segundo file y no en el primero
            else if (req.files[0] && req.files.fieldname === "itemBackImg") {
                itemBackImg = `/img/${req.files[0].filename}`;
                backImgModifed = true;
            }

            // Si se agregó la segunda imagen en el segundo file
            if (req.files[1] && req.files.fieldname === "itemBackImg") {
                itemBackImg = `/img/${req.files[1].filename}`;
                backImgModifed = true;
            }
        }

        // TODO: operación de edición en la base de datos.
        const modifiedUser = {
            product_id: req.params.id,
            product_name: req.body.itemName,
            product_description: req.body.itemDescription,
            price: req.body.itemPrice,
            stock: req.body.itemStock,
            discount: req.body.itemDiscount,
            sku: req.body.itemSku,
            dues: req.body.itemDues,
            image_front: itemFrontImg,
            image_back: itemBackImg,
            licence_id: req.body.itemLicense,
            category_id: req.body.itemCategory,
        }
        console.log(modifiedUser);

        /* const editOperation = await editProductInDB(modifiedUser); */ 

        // TODO: validación de imagenes post-edición.
        if (frontImgModifed) {
            // Eliminar la imagen frontal del sistema de archivos.
            // editOperation.oldFrontImg...
        }
        if (backImgModifed) {
            // Eliminar la imagen frontal del sistema de archivos.
            // editOperation.oldBackImg...
        }

        const success = true;
        // if (editOperation.success) {
        if (success) {
            res.redirect(`/admin/edit/${modifiedUser.product_id}/success`);
        }
        else {
            res.redirect(`/admin/edit/${modifiedUser.product_id}/error`);
        }
    }
    catch (err) {
        res.status(422).send("No se ha podido modificar el producto seleccionado en la base de datos");
        throw err;
    }
}

// Renderizar la vista de administrador con una alerta de éxito en la edición
// del producto seleccionado.
const successfulEdit = async (req, res) => {
        const products = await getProductsFromDB();
        if (!products) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        res.render("admin/admin", {
            products,
            alert: {
                success: true,
                message: "¡Producto modificado con éxito en la base de datos!"
            }
        });
}

// Renderizar la vista de administrador con una alerta de error en la edición
// del producto seleccionado.
const errorEdit = async (req, res) => {
        const products = await getProductsFromDB();
        if (!products) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        res.render("admin/admin", {
            products,
            alert: {
                success: false,
                message: "El producto no se ha podido modificar en la base de datos :("
            }
        });
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
    successfulCreate,
    errorCreate,
    getEditForm,
    editProduct,
    successfulEdit,
    errorEdit,
    deleteProduct
}
