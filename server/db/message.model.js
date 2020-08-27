const e = require('express');
const Joi = require('joi');
const db = require('./connection.js');

const messageSchema = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  subject: Joi.string().required(),
  message: Joi.string().max(1000).required(),
  imageUrl: Joi.string().uri({
                              scheme: [
                                /https?/
                              ],
                            }),
});

const messages = db.get('messages');

function getAll(){
  return messages.find();
}

function createMessage(message){
  if (!message.username) message.username = 'Anonymous';
  if (!message.subject) message.subject = 'No subject';

  const result = messageSchema.validate(message);
  if (!result.error) {
    message.createMessage = new Date();
    return messages.insert(message);
  } else {
    return Promise.reject(result.error);
  }
}

module.exports = {
  getAll,
  createMessage,
}