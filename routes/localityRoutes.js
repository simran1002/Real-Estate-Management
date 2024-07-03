const express = require('express');
const router = express.Router();
const localityController = require('../controllers/localityController');

router.get('/fetch_all_localities', localityController.fetchAllLocalities);

module.exports = router;
