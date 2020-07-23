const fs = require('fs');
const router = require('express').Router();
const multer = require('multer');
const Surveys = require('./');
const { sendResponse } = require('../utils/express-sugar');

const DIR = `${__dirname}/../../uploads`;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, `${Surveys.generateHashString()}-${fileName}`)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .gif, .jpg and .jpeg format allowed!'));
        }
    }
});

/**
 * @api {post} /api/uploads/surveys/:surveyId Upload file
 * @apiDescription Uploads a file to a survey. It expects Multipart form data as an input. Additionally, it only accepts PNG, JPEG and GIF file formats.
 * @apiName Upload
 * @apiGroup Survey
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 * @apiError {String} 403 The logged in user does not have access to this survey
 */
router.post('/surveys/:surveyId', upload.single('logoImg'), (req, res, next) => {

    return Surveys.findByIdAndOwner(req.user.email, req.params.surveyId).then((survey) => {
        if (!survey || !survey.surveyId) {
            return sendResponse(res, 403, 'unauthorized');
        }

        const targetDirBase = `${DIR}/${survey.hash_string}`;
        const imagePath = Surveys.generateHashString();
        const targetDir = `${targetDirBase}/${imagePath}`;
        let exists = false;

        try {
            const stats = fs.statSync(`${targetDir}`);
            exists = stats.isDirectory();
        } catch { /* do nothing. this means the directory does not exist so no change to status quo */ }

        if (!exists) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        
        fs.renameSync(`${DIR}/${req.file.filename}`, `${targetDir}/${req.file.filename}`);

        return Surveys.saveOrUpdate(req.user.email, {...survey, logo: `${imagePath}/${req.file.filename}` }).then(d => {
            return res.send({ message: 'OK' })
        });
    });
});

module.exports = router;