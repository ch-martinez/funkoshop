// mainController.js
/* --- MODEL --- */
const { 
  getProductsFromDB,
  getProductFromDB
 } = require("../models/productModel");
  
let shoppingCart = [];
  

const controller = {
     getShop: async function (req, res)  {
        const shopItems = await getProductsFromDB();
        if (!shopItems) { 
            res.status(404).send("Productos no encontrados en la base de datos.");
        }
        const view = {
            title: 'FunkoShop',
            logged: req.session.isLog,
            userName: req.session.userName,
            glide: true
        }
        res.render('shop/shop', { shopItems, view } );
    },
  
     getItem: async function (req, res)  {
      const [item] = await getProductFromDB(req.params.id);
      const products = await getProductsFromDB();
      if (!item) {
        return res.status(404).json({ message: 'No se encontró el artículo' });
      }
      const view = await {
        title: `${item.product_name} - FS`,
        logged: req.session.isLog,
        userName: req.session.userName,
        glide: true
    }
      res.render('shop/item', { item, view, products } );
    },
  
    addItemToShop: async function (req, res)  {
      const itemId = parseInt(req.params.id);
      newItem = req.body;
      console.log ("body:  ", req.body)
      console.log ("Agrega Item al shop")     
      console.log(newItem);
      const item = shopItems.find((item) => item.producto_id === itemId);
  
      if (item) {
        return res.status(400).json({ message: 'El artículo ya existe' });
      }
      else {
        shopItems.push(newItem);
        // Retorna la pagina del shop luego de agregar el item
        res.render("shop", shopItems );
      }
    },
  
      getShoppingCart: async function (req, res)  {
      res.json(shoppingCart);
    },
  
    // Modificamos la función para agregar elementos al carrito en lugar de limpiarlo
      updateShoppingCart: async function (req, res)  {
        console.log ("actualizar Carrito con: ", req.body)
        const updatedCart = req.body;

        // Puedes hacer validaciones o modificaciones adicionales aquí

        shoppingCart = updatedCart;
            res.json({ message: 'Se actualizó el carrito', cart: shoppingCart });
    },

     clearShoppingCart: async function (req, res) {
      shoppingCart = [];
      res.json({ message: 'Se eliminó el artículo del carrito', cart: shoppingCart });
    }
  
}
module.exports = controller;
