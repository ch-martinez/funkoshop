const mainController= {
    home: (req, res) => res.render("shop/main"),
    contact: (req, res) => res.render("shop/contact"),
    about: (req, res) => res.send("Route for About View"),
    faqs: (req, res) => res.send("Route for faqs View"),
}

module.exports = mainController