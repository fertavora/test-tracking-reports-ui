/**
 * Created by tavete on 11/10/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use('/', express.static('./app'));
app.listen(process.env.SITE_PORT || 5000);