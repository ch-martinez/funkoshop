// mainController.js
const shopItems = [
    // Elementos del shop
    { id: 1, name: 'Funko Gadget', price: 1200 },
    { id: 2, name: 'Funko Remera', price: 5400 },
    // ... más elementos
  ];
  
  let shoppingCart = [];
  
  const controller = {
    getShop: (req, res) => {
      res.json(shopItems);
    },
  
    getItem: (req, res) => {
      const itemId = parseInt(req.params.id);
      const item = shopItems.find((item) => item.id === itemId);
  
      if (!item) {
        return res.status(404).json({ message: 'No se encontro el articulo' });
      }
  
      res.json(item);
    },
  
    addItemToCart: (req, res) => {
      const itemId = parseInt(req.params.id);
      const itemToAdd = shopItems.find((item) => item.id === itemId);
  
      if (!itemToAdd) {
        return res.status(404).json({ message: 'No se encontro el articulo' });
      }
  
      shoppingCart.push(itemToAdd);
      res.json({ message: 'Se agrego el articulo al carrito', cart: shoppingCart });
    },
  
    getShoppingCart: (req, res) => {
      res.json(shoppingCart);
    },
  
    // Modificamos la función para agregar elementos al carrito en lugar de limpiarlo
    updateShoppingCart: (req, res) => {
        const updatedCart = req.body.cart;

        // Puedes hacer validaciones o modificaciones adicionales aquí

        shoppingCart = updatedCart;
            res.json({ message: 'Se actualizó el carrito', cart: shoppingCart });
    },

    clearShoppingCart: (req, res) => {
      shoppingCart = [];
      res.json({ message: 'Se elimino el articulo del carrito', cart: shoppingCart });
    },
  };
  
  module.exports = controller;
  