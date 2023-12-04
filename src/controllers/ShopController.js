// mainController.js
const shopItems = [
    // Elementos del shop
    { id: 1, name: 'Funko Gadget', price: 1200 },
    { id: 2, name: 'Funko Remera', price: 5400 },
    // ... más elementos
  ];
  
  let shoppingCart = [];
  

  const controller = {
      constructor(){
        const fs = require('fs');
        const path = require('path');
        
        // Ruta al archivo JSON
        const jsonFilePath = path.join(__dirname + "../models", 'db.json');
        
        // Lee el contenido del archivo JSON de forma sincrónica (puedes usar readFile para operación asíncrona)
        try {
          const jsonString = fs.readFileSync(jsonFilePath, 'utf-8');
          this.shopItems = JSON.parse(jsonString);
        
          // Ahora, `items` contiene la lista de artículos
          console.log(this.shopItems);
        } catch (error) {
          console.error('Error al leer el archivo JSON: %s' , jsonfilePath, error.message);
        }        
      },
    getShop: (req, res) => {
      res.json(this.shopItems);
    },
  
    getItem: (req, res) => {
      const itemId = parseInt(req.params.id);
      const item = this.shopItems.find((item) => item.id === itemId);
  
      if (!item) {
        return res.status(404).json({ message: 'No se encontró el artículo' });
      }
  
      res.json(item);
    },
  
    addItemToCart: (req, res) => {
      const itemId = parseInt(req.params.id);
      const itemToAdd = this.shopItems.find((item) => item.id === itemId);
  
      if (!itemToAdd) {
        return res.status(404).json({ message: 'No se encontró el articulo' });
      }
  
      shoppingCart.push(itemToAdd);
      res.json({ message: 'Se agregó el artículo al carrito', cart: shoppingCart });
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
      res.json({ message: 'Se eliminó el artículo del carrito', cart: shoppingCart });
    },
  };
  
  module.exports = controller;
  