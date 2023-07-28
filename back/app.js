const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./queries')

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors({
    origin: '*'
}));

app.get('/getChannels', db.getChannels);
app.get('/getChannelParams', db.getChannelParams);
app.get('/getButtons', db.getButtons);
app.post('/addButton', db.addButton);
app.post('/saveChannels', db.saveChannels);
app.delete('/deleteButton', db.deleteButton);

app.listen(3001);