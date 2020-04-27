const bodyParser = require('body-parser');
const express = require('express');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {});
