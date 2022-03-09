const { readFileSync } = require('fs');
const { join } = require('path');
const webpush = require('web-push')


const vapidKeys = JSON.parse(readFileSync(join(__dirname, 'vapidKeys.json')).toString());

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const notify = async (strapi, data) => {
  const users = await strapi.entityService.findMany(
    'api::user-notification-key.user-notification-key', {
    filters: {
      subscription: {
        $notNull: true
      }
    }
  });

  users.forEach(user => {
    setTimeout(() => {
      webpush.sendNotification(
        user.subscription,
        JSON.stringify(data)
      ).catch(console.error)
    } , 6000)
  })
}

module.exports = {
  webpush, 
  notify,
};
