const express = require('express'),
    app = express(),
    hateoasLinker = require('express-hateoas-links'),
    port = 4000,
    fs = require('fs')

// replace standard express res.json with the new version
app.use(hateoasLinker);

// standard express route
app.get('/', function(req, res) {

    // create an example JSON Schema
    var personSchema = {
        "name": "Person",
        "description": "This JSON Schema defines the paramaters required to create a Person object",
        "properties": {
            "name": {
                "title": "Name",
                "description": "Please enter your full name",
                "type": "string",
                "maxLength": 30,
                "minLength": 1,
                "required": true
            },
            "jobTitle": {
                "title": "Job Title",
                "type": "string"
            },
            "telephone": {
                "title": "Telephone Number",
                "description": "Please enter telephone number including country code",
                "type": "string",
                "required": true
            }
        }
    };

    // call res.json as normal but pass second param as array of links
    res.json(personSchema, [
        { rel: "self", method: "GET", href: 'http://127.0.0.1' },
        { rel: "create", method: "POST", title: 'Create Person', href: 'http://127.0.0.1/person' }
    ]);
});

app.get('/inputs', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    fs.readFile('./inputs.html', null, (err, data) => {
        if (err) {
            // res.writeHead(404)
            // res.write(err)
        } else {
            res.write(data)
        }
        res.end()
    })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))