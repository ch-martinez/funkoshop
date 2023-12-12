const { getProductsFromDB } = require('../models/productModel')

const mainController = {
    home: async (req, res) => {
        const view = {
            title: 'FunkoShop',
            logged: req.session.isLog,
            userName: req.session.userName,
            glide: true
        }
        try {
            const products = await getProductsFromDB()
            res.render('shop/main', { view, products })
        } catch (error) {
            console.log(`Error getting products: ${error}`)
            res.status(500).res(`Internal server error ${error}`)
        }
    },
    contact: async (req, res) => {
        const view = {
            title: 'Contacto',
            logged: req.session.isLog,
            userName: req.session.userName,
        }
        res.render('shop/contact', { view })
    },
    about: (req, res) => res.send("Route for About View"),
    faqs: (req, res) => res.render("shop/faqs"),
}

module.exports = mainController