const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

const api = require('./api')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(api);

app.listen(8080, () => {
  console.log('RUNNING!');
});
