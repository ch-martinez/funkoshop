const mainController= {
    home: (req, res) => res.render("shop/main"),
    contact: (req, res) => res.render("shop/contact"),
    about: (req, res) => res.render("shop/about"),
    faqs: (req, res) => res.render("shop/faqs"),
}

module.exports = mainController