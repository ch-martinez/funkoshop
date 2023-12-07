/* --- DEPENDENCIES --- */
// Temporal hasta que haga las vistas!
const path = require("node:path");


/* --- MODEL --- */
const { getProductsFromDB } = require("../models/productModel");


/* --- READ --- */
// Devolver la vista con el listado de productos.
const getProducts = async (req, res) => {
    try {
        const products = await getProductsFromDB();
        if (!products) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        res.render("admin/admin", {
            products
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
        // TODO: pedir a la DB las categorias para rellenar los select con este formato:
        const categories = [
            {
                id: 1,
                name: "Funkos"
            },
            "Categoria 2",
            "Categoria 3",
            "Categoria 4"
        ];
        // TODO: pedir a la DB las licencias para rellenar los select con este formato:
        const licences = [
            {
                id: 1,
                name: "Harry Potter"
            },
            "STAR WARS",
            "POKEMON",
            "HARRY POTTER"
        ];
        const dues = [
            12,
            6,
            3
        ];

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
        res.json(req.body);
    }
    catch (err) {
        res.status(422).send("No se ha podido crear el producto en la base de datos");
    }
}


/* --- UPDATE --- */
// Devolver la vista con el formulario para la edición de un producto seleccionado.
const getEditForm = async (req, res) => {
    try {
        // TODO: lógica de negocio para obtener el producto que se quiere editar.
        /* CÓDIDO TEMPORAL DE PRUEBAS */
        const product = {
            product_id: 12,
            product_name: "Luna Lovegood Lion Mask",
            product_description: "Figura coleccionable de Luna Lovegood Lion Mask - Harry Potter Saga, edición limitada.",
            price: 1799.99,
            stock: 5,
            discount: 10,
            sku: "HPT001003",
            dues: 12,
            image_front: "/img/harry-potter/luna-1.webp",
            image_back: "/img/harry-potter/luna-box.webp",
            create_time: false,
            licence_id:"HARRY POTTER",
            category_id:"Figuras coleccionables"
        };
        const categories = [
            "Figuras coleccionables",
            "Categoria 2",
            "Categoria 3",
            "Categoria 4"
        ];
        const licences = [
            "STAR WARS",
            "POKEMON",
            "HARRY POTTER"
        ];
        const dues = [
            12,
            6,
            3
        ]

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
        // TODO: operación de edición en la base de datos.
        res.json(req.body);
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
