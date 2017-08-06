// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const express = require('express')();

exports.sendMassgeOnOnOrder = functions.database.ref('/orders/anonymous/{pushId}')
  .onWrite(event => {

    const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
        user: 'poehaly.com@gmail.com',
        pass: 'poehaly1234'
      }
    });
    let dataValue = event.data.val();
    let mailLayout = `
    <h4>Вам поступила заявка!</h4>
    <br>
    <p><strong>Название гостиници: </strong>${dataValue.tourName}</p>
    <p><strong>Имя клиента: </strong>${dataValue.customersName}</p>
    <p><strong>ID заявки: </strong>${dataValue.orderId}</p>
    <p><strong>Номер телефона: </strong>${dataValue.telephoneNumber}</p>
    <p><strong>Тело заказа: </strong>${dataValue.orderBody}</p>`;

// setup email data with unicode symbols
    let mailOptions = {
      from: 'poehaly.com@gmail.com', // sender address
      to: 'vat@poehaly.com.ua', // list of receivers
      subject: `Заявка (Тур: ${dataValue.tourName}) (Заказчик: ${dataValue.customersName})`, // Subject line
      text: dataValue.orderBody, // plain text body
      html: mailLayout // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });



    // console.log('pushId', pushId);
    // Grab the current value of what was written to the Realtime Database.
    // const original = event.data.val();
    // const uppercase = original.orderBody.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return event.data
  });
