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
    // Función para realizar la inserción en la tabla productos
    async function insertarProducto(producto) {
   
        try {
        const sql = `
            INSERT INTO productos (
            product,
            product_name,
            product_description,
            price,
            stock,
            discount,
            sku,
            dues,
            image_front,
            image_back,
            licence_id,
            category_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
    
        const values = [
            producto.product,
            producto.product_name,
            producto.product_description,
            producto.price,
            producto.stock,
            producto.discount,
            producto.sku,
            producto.dues,
            producto.image_front,
            producto.image_back,
            producto.licence_id,
            producto.category_id,
        ];
    
            await pool.query(sql, values, (queryError, results) => {
        
                if (queryError) {
                console.error('Error al ejecutar la consulta:', queryError);
                } else {
                console.log('Inserción exitosa. ID del nuevo producto:', results.insertId);
                }
            });
        }
        catch (err) {
            console.error(`Error en la consulta a la base de datos: ${err}`);
            throw err;
        }
    };




/* --- EXPORTS --- */
module.exports = {
    getShopFromDB
}
