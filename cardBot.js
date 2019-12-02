const WebexChatBot = require('node-sparkbot');
const bot = new WebexChatBot();

const SparkAPIWrapper = require("node-sparkclient");
const client = new SparkAPIWrapper(process.env.ACCESS_TOKEN);

attachment = {
  contentType: 'application/vnd.microsoft.card.adaptive',
  content: {
    type: 'AdaptiveCard',
    version: '1.0',
    body: [
    {
      type: 'TextBlock',
      text: 'Tell me your name',
      separation: 'none'
    },
    { type: 'Input.Text', id: 'name' }
    ],
    actions: [{
      type: 'Action.Submit',
      title: 'Send'
    }]
  }
};

bot.onCommand("sendCard", function (command) {
  client.createMessage(command.message.roomId, 'Card message', { attachments: attachment }, function(err, message) {
    if (err) {
          console.log("WARNING: could not post message to room: " + command.message.roomId);
          console.log(err);
          return;
      }
    else {
      console.log('Sent a card to room: ' + command.message.roomId);
    }
  });
});

console.log(`Hi ! running bot on port 8080..`);
