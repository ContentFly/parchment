var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// POST method route
router.post('/generate', function(req, res) {
    console.log("Generate called")

    let prompt = req.body.prompt.trim()
    let lengths = [0,40,150,300]

    
    console.log(prompt)
    console.log(lengths[req.body.len])
    fetch('https://api.cohere.ai/baseline-orca/generate', {
            method: 'POST',
            headers: {
                'Authorization': 'BEARER d7Sj4SyRmMOWXs1QcFnbRa4VRDR1M0Qb2vr85vn9',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "prompt": prompt, "max_tokens": lengths[req.body.len], "temperature": 1.2, "k": 0, "p": 0.75 })
        }).then(response => response.text())
        .then(text => { console.log(text); res.send(JSON.parse(text).text) }).catch(error => console.log('Error! '));



    // res.send('POST request to the homepage')
})

module.exports = router;