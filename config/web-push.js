const { readFileSync } = require('fs');
const { join } = require('path');
const webpush = require('web-push')


const vapidKeys = JSON.parse(readFileSync(join(__dirname, 'vapidKeys.json')).toString());

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

module.exports = webpush;
