var express = require("express");
var compression = require('compression');
var app = express();
app.use(compression());
app.use(express.static('dist'));

app.all('/portal/*', (req, res) => {
  res.sendfile('dist/');
});

var port = '80';
app.listen(port, function() {
  console.log("Listening on " + port);
});
