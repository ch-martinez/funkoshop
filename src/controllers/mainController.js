const { getProductsFromDB } = require('../models/productModel')

const mainController = {
    home: async (req, res) => {
        const view = {
            title: 'FunkoShop',
            userName: req.session.userName,
            logged: req.session.isLog,
            admin: req.session.isAdmin,
            glide: true
        }
        try {
            const products = await getProductsFromDB()
            res.render('main', { view, products })
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
        res.render('contact', { view })
    },
    about: (req, res) =>{
        const view = {
            title: 'Sobre Nosotros - FS',
            userName: req.session.userName,
            logged: req.session.isLog,
            admin: req.session.isAdmin
        }
        res.render('about', {view})
    },
    faqs: (req, res) =>{
        const view = {
            title: 'FAQS - FS',
            userName: req.session.userName,
            logged: req.session.isLog,
            admin: req.session.isAdmin
        }
        res.render('faqs', {view})
    }
}

module.exports = mainController