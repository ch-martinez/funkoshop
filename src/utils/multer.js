const multer = require("multer");
const path = require("node:path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const license = req.body.itemLicense;
        let destination = "public/img/default";

        if (license === "1") {
            destination = 'public/img/pokemon';
        } 
        else if (license === "2") {
            destination = 'public/img/star-wars';
        } 
        else if (license === "3") {
            destination = 'public/img/harry-potter';
        } 

        cb(null, destination);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({storage});

module.exports = upload;
