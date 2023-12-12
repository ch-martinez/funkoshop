/* --- DEPENDENCIES --- */
const express = require("express");
const router = express.Router();
const {requireLogin} = require('../middlewares/sessionControl')


/* --- CONTROLLER --- */
const adminController = require("../controllers/adminController");

/* --- MULTER --- */
const upload = require("../utils/multer");


/* --- READ --- */
// Mostrar el listado de productos (/admin) => admin.html
router.get("/", requireLogin, adminController.getProducts);


/* --- CREATE --- */
// Mostrar el formulario necesario para crear un nuevo producto (/admin/create) => create.html
router.get("/create", requireLogin, adminController.getCreateForm);

// Crear el nuevo producto y agregarlo a la base de datos.
router.post("/create",
            upload.fields([
                {name: "itemFrontImg", maxCount: 1},
                {name: "itemBackImg", maxCount: 1}
            ]),
            requireLogin, adminController.createNewProduct);

// La creación del producto fue exitosa.
router.get("/create/success", requireLogin, adminController.successfulCreate);

// La creación del producto fue errónea.
router.get("/create/error", requireLogin, adminController.errorCreate);


/* --- UPDATE --- */
// Mostrar el formulario para editar el producto seleccionado (/admin/edit) => edit.html
router.get("/edit/:id", requireLogin, adminController.getEditForm);

// Modificar el producto seleccionado y enviar la información a la base de datos.
router.post("/edit/:id",
            upload.fields([
                {name: "itemFrontImg", maxCount: 1},
                {name: "itemBackImg", maxCount: 1}
            ]),
            adminController.editProduct);

// La modificación del producto fue exitosa.
router.get("/edit/:id/success", requireLogin, adminController.successfulEdit);

// La modificación del producto fue errónea.
router.get("/edit/:id/error", requireLogin, adminController.errorEdit);


/* --- DELETE --- */
// Eliminar un producto seleccionado en la base de datos (/admin/delete/:id).
// Esto viene desde admin.html
router.get("/delete/:id", requireLogin, adminController.deleteProduct);

// La eliminación del producto fue exitosa.
router.get("/delete/:id/success", requireLogin, adminController.successfulDelete);

// La eliminación del producto fue errónea.
router.get("/delete/:id/error", requireLogin, adminController.errorDelete);


/* --- EXPORT --- */
module.exports = router;
