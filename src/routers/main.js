const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const validateForm = require('../middlewares/validateForm');

router.get('/', mainController.homePage);
router.post('/register', mainController.register);

module.exports = router;