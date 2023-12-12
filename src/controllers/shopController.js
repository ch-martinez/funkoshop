// mainController.js
/* --- MODEL --- */
const { 
    getProductsFromDB,
    getProductFromDB
} = require("../models/productModel");
  

// Mostrar la tienda
const getShop = async (req, res) => {
    try {
        const shopProducts = await getProductsFromDB();
        if (!shopProducts) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        res.render('shop/shop', { shopItems: shopProducts } );
    }
    catch (err) {
        console.error(`* Error al obtener los productos para el shop: ${err}`);
        res.status(404).send("Productos no encontrados en la base de datos.");
    }
}


// Mostrar la vista item
const getItem = async (req, res) => {
    try {
        const [product] = await getProductFromDB(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'No se encontró el artículo' });
        }
        res.render('shop/item', { item: product } );
    }
    catch (err) {
        console.error(`* Error al obtener el producto para item: ${err}`);
        res.status(404).send("Producto no encontrado en la base de datos.");
    }
}

// Agregar un producto al carrito del cliente
const addProductToCart = async (req, res) => {
    // Lógica para agregar un producto al carrito
    try {
        const products = req.session.cart;
        const repeated = products.find(product => product.product_id == req.params.id);
        // Si el producto agregado no está en el carrito se agrega.
        if (!repeated) {
            const [product] = await getProductFromDB(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'No se encontró el artículo' });
            }
            product.quantity = parseInt(req.body.quantity);
            req.session.cart.push(product);
            res.redirect("/shop/cart");
        }
        // Si ya está, solo se redirige a /shop/cart
        else {
            res.redirect("/shop/cart")
        }
    }
    catch (err) {
        console.error(`* Error al agregar el producto al carrito: ${err}`);
        res.status(404).send("Producto no agregado al carrito.");
    }
}


// Eliminar un producto específico del carrito del cliente.
const removeProductInCart = async (req, res) => {
    req.session.cart = req.session.cart.filter(product => product.product_id != req.params.id);
    res.redirect("/shop/cart");
}


// Mostrar la vista del carrito con los productos seleccionados por el cliente.
const getShoppingCart = (req, res) => {
    res.render("shop/cart", {
        products: req.session.cart
    });
}

// Mostrar vista de compra exitosa
const purchase = (req, res) => {
    // Se vacía el carrito porque ya se realizó la compra.
    req.session.cart = [];
    res.send("Compra realizada con éxito!");
}


module.exports = {
    getShop,
    getItem,
    addProductToCart,
    removeProductInCart,
    getShoppingCart,
    purchase
}
