require('dotenv').config();

const sms = require('./sendsms');
sms.sendMessage(process.env.PHONE, 'Sending to Guest');
