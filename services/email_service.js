const AWS = require('aws-sdk');
require('dotenv').config(); // .env dosyasını yükle

class EmailService {
  constructor() {
    this.sqs_url = process.env.SQS_URL;
    this.sqs_region = process.env.AWS_REGION;

    AWS.config.update({
      region: this.sqs_region,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    this.sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
  }

  async sendMessage(email, subject, message) {
    if (!email || !subject || !message) {
      throw new Error('email, subject ve message zorunludur');
    }

    if (email !== "zegasega11@gmail.com") {
      throw new Error('Email is not registered');
    }

    const params = {
      QueueUrl: this.sqs_url,
      MessageBody: JSON.stringify({ email, subject, message }),
    };
    console.log("params", params);
    try {
      const data = await this.sqs.sendMessage(params).promise();
      return data.MessageId;


    } catch (err) {
      throw new Error('Mesaj gönderilemedi: ' + err.message);
    }
  }
}

module.exports = new EmailService();
