const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.generateThumbnail = functions.storage.object().onChange(event => {
  
  const object = event.data; // The Storage object.
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const scale = object.metadata.scale;
  
  // Get the file name.
  const fileName = filePath.split('/').pop();
  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = `/tmp/${fileName}`;
 
// Exit if the image is already a thumbnail.
  if (fileName.startsWith('thumb_')) {
    return;
  }

  return bucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => {
    
    return spawn('convert', [tempFilePath, '-thumbnail', `${scale}>`, tempFilePath]).then(() => {
      
      const thumbFilePath = filePath.replace(/(\/)?([^\/]*)$/, `$1thumb_$2`);

      // admin.database().ref('/log').push({
      //   thumbFilePath:thumbFilePath,
      //   tempFilePath:tempFilePath,
      //   fileBucket:fileBucket,
      //   event:event
      // });
      
      // Uploading the thumbnail.
       return bucket.upload(tempFilePath, {
        destination: `${object.metadata.parentFolder}/${scale}/${object.metadata.fileName}`
      });
      
    });
   
  });
  
});


