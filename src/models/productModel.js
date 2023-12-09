/* --- DATABASE CONFIGURATION --- */
const pool = require("../config/database");


/**
 * Obtener la información de todos los productos desde la base de datos.
 * @returns Array de objetos donde cada objeto representa un producto devuelto
 *          desde la tabla 'product' en la base de datos.
 */
async function getProductsFromDB() {
    try {
        const query = `
        SELECT product_id,
               product_name,
	           product_description,
	           price,
	           stock,
	           discount,
	           sku,
	           dues,
	           image_front,
	           image_back,
	           product.licence_id,
	           licence.licence_name AS licence_name,
	           product.category_id,
	           category.category_name AS category_name
        FROM product
        INNER JOIN licence ON licence.licence_id = product.licence_id
        INNER JOIN category ON category.category_id = product.category_id
        ORDER BY product_id`;
        const [products] = await pool.query(query);
        return products;
    }
    catch (err) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }
};


/**
 * Obtener la información de un producto específico desde la base de datos.
 * @param {Number} id ID del producto que se desea buscar en la base de datos.
 * @returns Array con un objeto que representa el producto devuelto desde la
 *          base de datos.
 */
async function getProductFromDB(id) {
    const query = `
    SELECT product_id,
           product_name,
           product_description,
           price,
           stock,
           discount,
           sku,
           dues,
           image_front,
           image_back,
           product.licence_id,
           licence.licence_name AS licence_name,
           product.category_id,
           category.category_name AS category_name
    FROM product
    INNER JOIN licence ON licence.licence_id = product.licence_id
    INNER JOIN category ON category.category_id = product.category_id
    WHERE product_id = ?`;

    try {
        const [product] = await pool.query(query, [id]);
        return product;
    }
    catch (err) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }
};


/**
 * Devolver todas las licencias desde la base de datos.
 * @returns Array de objetos donde cada objeto representa una licencia.
 */
async function getLicencesFromDB() {
    const query = `SELECT * FROM licence`;

    try {
        const [licences] = await pool.query(query);
        return licences;
    }
    catch (err) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }
};


/**
 * Devolver todas las categorías desde la base de datos.
 * @returns Array de objetos donde cada objeto representa una categoría.
 */
async function getCategoriesFromDB() {
    const query = `SELECT * FROM category`;

    try {
        const [categories] = await pool.query(query);
        return categories;
    }
    catch (err) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }
};


/**
 * Agregar un nuevo producto en la base de datos.
 * @param {Object} newProduct Objeto con la información del nuevo producto.
 * @returns {Boolean} Booleano que indica si se pudo o no agregar el nuevo
 *                    producto en la base de datos.
 */
async function createProductInDB(newProduct) {
    const query = `
    INSERT INTO product (product_id, product_name, product_description, price,
                         stock, discount, sku, dues, image_front, image_back,
                         licence_id, category_id)
    VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        newProduct.product_name,
        newProduct.product_description,
        newProduct.price,
        newProduct.stock,
        newProduct.discount,
        newProduct.sku,
        newProduct.dues,
        newProduct.image_front,
        newProduct.image_back,
        newProduct.licence_id,
        newProduct.category_id
    ];

    try {
        const [result] = await pool.query(query,  values);
        if (result.affectedRows > 0) {
            console.log("--> Se agregó un nuevo producto en la base de datos");
            return true;
        }
        else {
            console.log("--> No se ha agregado el nuevo producto en la base de datos");
            return false;
        }
    }
    catch (err) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }
};


/**
 * Actualizar la información de un producto específico en la base de datos.
 * @param {Object} product Objeto con la información del producto
 * @returns {Object} Objeto que contiene: una propiedad booleana (success) que
 *                   indica si la operación fue exitosa; y dos propiedades 
 *                   string (oldFrontImg y oldBackImg) que almacenan la rutas 
 *                   de la imágenes frontal y dorsal anteriores del producto,
 *                   que, si se modificaron, se deben eliminar del archivo de
 *                   carpetas.
 */
async function editProductInDB(product) {
    const query = `
    UPDATE product
    SET product_name = ?,
        product_description = ?,
        price = ?,
        stock = ?,
        discount = ?,
        sku = ?,
        dues = ?,
        image_front = ?,
        image_back = ?,
        licence_id = ?,
        category_id = ?
    WHERE product_id = ?`;

    const values = [
        product.product_name,
        product.product_description,
        product.price,
        product.stock,
        product.discount,
        product.sku,
        product.dues,
        product.image_front,
        product.image_back,
        product.licence_id,
        product.category_id,
        product.product_id
    ];

    try {
        const [modifiedProduct] = await getProductFromDB(product.product_id);
        const [result] = await pool.query(query, values);
        if (result.changedRows === 1) {
            console.log("--> Producto modificado con éxito en la base de datos");
            return {
                success: true,
                oldFrontImg: modifiedProduct.image_front,
                oldBackImg: modifiedProduct.image_back
            };
        }
        else {
            console.log("--> No se modificó el producto en la base de datos");
            return {
                success: false
            };
        }
    }
    catch (err) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }
}


/**
 * Eliminar un producto específico en la base de datos.
 * @param {Number} id ID del producto que se quiere eliminar de la base de datos.
 * @returns {Object} Objeto que contiene: una propiedad booleana (success) que
 *                   indica si la operación fue exitosa; y dos propiedades 
 *                   string (oldFrontImg y oldBackImg) que almacenan la rutas 
 *                   de la imágenes frontal y dorsal anteriores del producto,
 *                   que, si se modificaron, se deben eliminar del archivo de
 *                   carpetas.
 */
async function deleteProductInDB(id) {
    const query = `DELETE FROM product WHERE product_id = ?`;

    try {
        const [deletedProduct] = await getProductFromDB(id);
        const [result] = await pool.query(query, [id]);
        if (result.affectedRows > 0) {
            console.log("--> Se eliminó el producto seleccionado en la base de datos");
            return {
                success: true,
                oldFrontImg: deletedProduct.image_front,
                oldBackImg: deletedProduct.image_back
            };
        }
        else {
            console.log("--> No se ha podido eliminar el producto seleccionado en la base de datos");
            return {
                success: false
            };
        }
    }
    catch (err) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }
}


/* --- EXPORTS --- */
module.exports = {
    getProductsFromDB,
    getProductFromDB,
    getLicencesFromDB,
    getCategoriesFromDB,
    createProductInDB,
    editProductInDB,
    deleteProductInDB
}
