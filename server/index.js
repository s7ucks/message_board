const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const messages = require('./db/message.model.js');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: "Full stack messageboard",
  });
});

app.get('/messages', (req, res) => {
  messages.getAll().then(messages => {
    res.json(messages);
  });
});

app.post('/messages', async (req, res) => {
  try {
    const insertedMessage = await messages.createMessage(req.body);
    console.log(insertedMessage);
    res.json(insertedMessage);
  } catch (error) {
    res.status(500).json(error);
  }

});


app.listen(3000, (req, res) => {
  console.log("Your server has started! ");
});