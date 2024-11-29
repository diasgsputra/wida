const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController');
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); //Upload directory
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/vnd.ms-excel', // .xls
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only Excel files are allowed.'));
        }
    },
});

router.post('', upload.single('file'), (req, res, next) => {
    try {
        uploadFile(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
