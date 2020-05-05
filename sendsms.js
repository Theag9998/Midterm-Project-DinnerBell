const accountSid = 'AC374bb6cd27fbae9a937c7526526c433e';
const authToken = '965169039fd80dbc5f4ef68bbaab44d5';

const client = require ('twilio') (accountSid, authToken);

//SMS to Customer
client.messages.create({
  to: +7783192221,
  from: '+15153163985',
  body: 'Order received. Your order will be ready in 30 minutes. Please pick up at Papa Joe\'s Restaurant at 7:30pm.'
})
.then((message) => console.log(message.sid));

//SMS to Restaurant
client.messages.create({
  to: +17783192221,
  from: '+15153163985',
  body: 'New order received!'
})
.then((message) => console.log(message.sid));
