// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const express = require('express')();

exports.sendMassgeOnOnOrder = functions.database.ref('/orders/anonymous/{pushId}')
  .onWrite(event => {


    // console.log('pushId', pushId);
    // Grab the current value of what was written to the Realtime Database.
    // const original = event.data.val();
    // const uppercase = original.orderBody.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return event.data
  });
