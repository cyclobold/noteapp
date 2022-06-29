var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register', { 
                title: 'Register Account' 
            }
    
    );
});

module.exports = router;