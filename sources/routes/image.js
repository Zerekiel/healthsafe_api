var express = require('express');
var router = express.Router();
const imgModel = require('../models/image');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
const modelDrProfile = require('../models/modelDrProfile');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/paradis/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

// Retriving the image
router.get('/', (req, res) => {
    imgModel.modelImage.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
		// res.render('image', { items: items });
                res.status(200).send(items)
        }
    });

});

// Uploading the image
router.post('/', upload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join('/home/paradis/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }

    imgModel.modelImage.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect('/api/image');
        }
    });

});

module.exports = router;
