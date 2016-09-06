import amqp from 'amqplib/callback_api';

export default class Listener {
  constructor(config) {
    this.config = config;
  }
  connect() {
    amqp.connect(this.config.hostname, (err, connection) => {
      if(err) {
        console.log('rabbitmq connection error' + err);
        return;
      }

       console.log('rabbitmq connected!')
    });
  }
}