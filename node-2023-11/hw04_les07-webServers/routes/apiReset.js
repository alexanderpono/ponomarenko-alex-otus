var express = require('express');
var router = express.Router();
const apiResetController = require('../controllers/apiReset.controller');

router.post('/', apiResetController.post);

module.exports = router;
