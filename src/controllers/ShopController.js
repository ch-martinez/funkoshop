// mainController.js
shopItems = [  ];
  
  let shoppingCart = [];
  

  const controller = {
    initialize: function() {
        console.log ("Cargando archivo")
        const fs = require('fs');
        const path = require('path');
        
        // Ruta al archivo JSON
        const jsonFilePath = path.join(__dirname + "/../models", 'db.json');
        
        // Lee el contenido del archivo JSON de forma sincrónica (puedes usar readFile para operación asíncrona)
        try {
          const jsonString = fs.readFileSync(jsonFilePath, 'utf-8');
          shopItems = JSON.parse(jsonString);
        
          // Ahora, `items` contiene la lista de artículos
          console.log(shopItems);
        } catch (error) {
          console.error('Error al leer el archivo JSON: %s' , jsonFilePath, error.message);
        }        
      },
    getShop: (req, res) => {
        console.log (this);
      console.log (shopItems)
      res.json(shopItems);
      //res.json("Shop");
    },
  
    getItem: (req, res) => {
      const itemId = parseInt(req.params.id);
      const item = shopItems.find((item) => item.producto_id === itemId);
  
      if (!item) {
        return res.status(404).json({ message: 'No se encontró el artículo' });
      }
  
      res.json(item);
    },
  
    addItemToShop: (req, res) => {
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
        res.json({ message: 'Se agregó el artículo al carrito', shopItems });
      }
    },
  
    getShoppingCart: (req, res) => {
      res.json(shoppingCart);
    },
  
    // Modificamos la función para agregar elementos al carrito en lugar de limpiarlo
    updateShoppingCart: (req, res) => {
        console.log ("actualizar Carrito con: ", req.body)
        const updatedCart = req.body;

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
  