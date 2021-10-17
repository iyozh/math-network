const multer  = require('multer')
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const config = require('./mainConfig');
const path = require("path");

aws.config.update({
    secretAccessKey: config.s3.secretAccessKey,
    accessKeyId: config.s3.accessKeyId,
    region: 'us-east-1'
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'math-network',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
});


module.exports = upload;