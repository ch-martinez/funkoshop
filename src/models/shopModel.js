/* --- DATABASE CONFIGURATION --- */
const pool = require("../config/database");


/**
 * Obtener la información de todos los productos desde la base de datos.
 * @returns Array de objetos donde cada objeto representa un producto devuelto
 *          desde la tabla 'product' en la base de datos.
 */
async function getShopFromDB() {
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
        console.log(products[0]); // Para visualizar el objeto.
        return products;
    }
    catch (err) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }
}



/* --- EXPORTS --- */
module.exports = {
    getShopFromDB
}
