/* --- DEPENDENCIES --- */
const express = require("express");
const router = express.Router();


/* --- CONTROLLERS --- */
const adminController = require("../controllers/adminController");


/* --- READ --- */
// Mostrar el listado de productos (/admin) => admin.html
router.get("/", adminController.getProducts);


/* --- CREATE --- */
// Mostrar el formulario necesario para crear un nuevo producto (/admin/create) => create.html
router.get("/create", adminController.getCreateForm);

// Crear el nuevo producto y agregarlo a la base de datos.
router.post("/create", adminController.createNewProduct);

// La creación del producto fue exitosa.
router.get("/create/success", adminController.successfulCreate);

// La creación del producto fue errónea.
router.get("/create/error", adminController.errorCreate);


/* --- UPDATE --- */
// Mostrar el formulario para editar el producto seleccionado (/admin/edit) => edit.html
router.get("/edit/:id", adminController.getEditForm);

// Modificar el producto seleccionado y enviar la información a la base de datos.
router.post("/edit/:id", adminController.editProduct);

// La modificación del producto fue exitosa.
router.get("/edit/:id/success", adminController.successfulEdit);

// La modificación del producto fue errónea.
router.get("/edit/:id/error", adminController.errorEdit);


/* --- DELETE --- */
// Eliminar un producto seleccionado en la base de datos (/admin/delete/:id).
// Esto viene desde admin.html
router.get("/delete/:id", adminController.deleteProduct);


/* --- EXPORT --- */
module.exports = router;
