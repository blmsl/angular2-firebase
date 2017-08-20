var express = require("express");
var app = express();
app.use(express.static('dist'));
app.all('/portal/*', (req, res) => {
  res.status(200).sendfile('./dist/');
});

var port = '4300';
app.listen(port, function() {
  console.log("Listening on " + port);
});
