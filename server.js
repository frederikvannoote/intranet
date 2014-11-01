var http = require('http');
var url = require('url');

var express = require('express'),
  messages = require('./backend/messages');
     
var app = express();
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var path = require('path');

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/messages', messages.findAll);
app.get('/messages/:id', messages.findById);
app.post('/messages', messages.addMessage);
app.put('/messages/:id', messages.updateMessage);
app.delete('/messages/:id', messages.deleteMessage);
 
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


http.createServer(function (request, response) {
  var uri = url.parse(request.url).pathname, query;
  if (uri == "/account")
  {
    request.setEncoding("utf8");
    request.content = "";
    
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Account');
  }
  else if (uri == "/gasverbruik")
  {
    var databaseUrl = "intranet"; // "username:password@example.com/intranet"
    var collections = ["gasverbruik", "users", "reports"]
    var db = require("mongojs").connect(databaseUrl, collections);        
    var str = '';
    
    // Create the listener for data being returned.
    response.on('data', function (chunk) {
      str += chunk;
    });
            
    // Create the listener for the end of the POST.
    response.on('end', function (){
      db.collection('gasverbruik').save(str, function(err, records) {
        if (err) throw err;
        console.log("record added");
      });
    });
  }
  else {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("<html>");
    response.write("<input");
    response.end('Hello World\n');
  }
});//.listen(1337);
//console.log('Server running at http://127.0.0.1:1337/');