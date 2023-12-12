/* --- MODEL --- */
const { 
    getProductsFromDB,
    getProductFromDB,
    getLicencesFromDB,
    getCategoriesFromDB,
    createProductInDB,
    editProductInDB,
    deleteProductInDB
} = require("../models/productModel");

/* --- UTILITES --- */
const imagePath = require("../utils/imagePath");
const { unlink } = require("node:fs");


/* --- READ --- */
// Devolver la vista con el listado de productos.
const getProducts = async (req, res) => {
    const view = {
        title: 'Administracion - FS',
        logged: req.session.isLog,
        userName: req.session.userName,
    }
    try {
        const products = await getProductsFromDB();
        if (!products) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        res.render("admin/admin", {
            view,
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
        const view = {
            title: 'Crear - FS',
            logged: req.session.isLog,
            userName: req.session.userName,
        }
        res.render("admin/create_edit", {
            view,
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
        let itemFrontImg = "/placeholder.webp";
        let itemBackImg = "/placeholder.webp";
        if (req.files["itemFrontImg"]) {
            itemFrontImg = imagePath(req, "itemFrontImg", req.body.itemLicense);
        }

        if (req.files["itemBackImg"]) {
            itemBackImg = imagePath(req, "itemBackImg", req.body.itemLicense);
        }

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

        const success = await createProductInDB(newProduct);
        if (success) {
            res.redirect("/admin/create/success");
        }
        else {
            res.redirect("/admin/create/error");
        }
    }
    catch (err) {
        console.log(`* Error en la creación de un producto: ${err}`)
        res.redirect("/admin/create/error");
    }
}

// Renderizar la vista de administrador con una alerta de éxito en la creación
// del nuevo producto.
const successfulCreate = async (req, res) => {
        const products = await getProductsFromDB();
        if (!products) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        const view = {
            title: 'Administracion - FS',
            logged: req.session.isLog,
            userName: req.session.userName,
        }
        res.render("admin/admin", {
            view,
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
        const view = {
            title: 'Administracion - FS',
            logged: req.session.isLog,
            userName: req.session.userName,
        }
        res.render("admin/admin", {
            view,
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
        const view = {
            title: 'Administracion - FS',
            logged: req.session.isLog,
            userName: req.session.userName,
        }
        res.render("admin/create_edit", {
            view,
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
        /* Validación de si se modificaron las imágenes */ 
        // Banderas necesarias para saber si se debe eliminar o no las
        // imagenes anteriores del producto.
        let frontImgModifed = false;
        let backImgModifed = false;

        // Valor predeterminado de los input files (sirve por si no se han
        // seleccionado imágenes en los inputs).
        let itemFrontImg = req.body.itemFrontImgNoMod;
        let itemBackImg = req.body.itemBackImgNoMod;

        // Verificar si se cambiaron las imágenes
        if (req.files["itemFrontImg"]) {
            itemFrontImg = imagePath(req, "itemFrontImg", req.body.itemLicense);
            frontImgModifed = true;
        }
        if (req.files["itemBackImg"]) {
            itemBackImg = imagePath(req, "itemBackImg", req.body.itemLicense);
            backImgModifed = true;
        }

        // TODO: operación de edición en la base de datos.
        const modifiedProduct = {
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

        const editOperation = await editProductInDB(modifiedProduct);
        if (editOperation.success) {
            // Si se modificó la imagen frontal, se elimina la antigua.
            if (frontImgModifed) {
                unlink(`public/img/${editOperation.oldFrontImg}`, (err) => {
                    if (err) {
                        console.error(`Error al intentar eliminar la imagen frontal antigua: ${err}`);
                    }
                    else {
                        console.log("--> Imagen frontal antigua eliminada con éxito");
                    }
                });
            }

            // Si se modificó la imagen dorsal, se elimina la antigua.
            if (backImgModifed) {
                unlink(`public/img/${editOperation.oldBackImg}`, (err) => {
                    if (err) {
                        console.error(`Error al intentar eliminar la imagen dorsal antigua: ${err}`);
                    }
                    else {
                        console.log("--> Imagen dorsal antigua eliminada con éxito");
                    }
                });
            }

            res.redirect(`/admin/edit/${modifiedProduct.product_id}/success`);
        }
        else {
            res.redirect(`/admin/edit/${modifiedProduct.product_id}/error`);
        }
    }
    catch (err) {
        console.log(`* Error en la modificación de un producto: ${err}`);
        res.redirect(`/admin/edit/${req.params.id}/error`);
    }
}

// Renderizar la vista de administrador con una alerta de éxito en la edición
// del producto seleccionado.
const successfulEdit = async (req, res) => {
        const products = await getProductsFromDB();
        if (!products) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        const view = {
            title: 'Administracion - FS',
            logged: req.session.isLog,
            userName: req.session.userName,
        }
        res.render("admin/admin", {
            view,
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
        const view = {
            title: 'Administracion - FS',
            logged: req.session.isLog,
            userName: req.session.userName,
        }
        res.render("admin/admin", {
            view,
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
        const deleteOperation = await deleteProductInDB(req.params.id);
        if (deleteOperation.success) {
            // Eliminar la imagen frontal antigua del producto.
            unlink(`public/img/${deleteOperation.oldFrontImg}`, (err) => {
                if (err) {
                    console.error(`Error al intentar eliminar la imagen frontal antigua: ${err}`);
                }
                else {
                    console.log("--> Imagen frontal antigua eliminada con éxito");
                }
            });

            // Eliminar la imagen dorsal antigua del producto.
            unlink(`public/img/${deleteOperation.oldBackImg}`, (err) => {
                if (err) {
                    console.error(`Error al intentar eliminar la imagen dorsal antigua: ${err}`);
                }
                else {
                    console.log("--> Imagen dorsal antigua eliminada con éxito");
                }
            });

            res.redirect(`/admin/delete/${req.params.id}/success`);
        }
        else {
            res.redirect(`/admin/delete/${req.params.id}/error`);
        }
    }
    catch (err) {
        console.log(`* Error en la eliminación de un producto: ${err}`);
        res.redirect(`/admin/delete/${req.params.id}/error`);
    }
}

// Renderizar la vista de administrador con una alerta de éxito en la edición
// del producto seleccionado.
const successfulDelete = async (req, res) => {
        const products = await getProductsFromDB();
        if (!products) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        const view = {
            title: 'Administracion - FS',
            logged: req.session.isLog,
            userName: req.session.userName,
        }
        res.render("admin/admin", {
            view,
            products,
            alert: {
                success: true,
                message: "¡Producto eliminado con éxito en la base de datos!"
            }
        });
}

// Renderizar la vista de administrador con una alerta de error en la edición
// del producto seleccionado.
const errorDelete = async (req, res) => {
        const products = await getProductsFromDB();
        if (!products) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        const view = {
            title: 'Administracion - FS',
            logged: req.session.isLog,
            userName: req.session.userName,
        }
        res.render("admin/admin", {
            view,
            products,
            alert: {
                success: false,
                message: "El producto no se ha podido eliminar en la base de datos :("
            }
        });
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
    deleteProduct,
    successfulDelete,
    errorDelete
}
