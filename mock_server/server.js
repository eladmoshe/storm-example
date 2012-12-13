var connect = require('connect');
var PORT = 1234;
var path = require('path');
var directory = path.join(__dirname ,"..","public");
console.log("Server started. Open your browser at <http://localhost:"+PORT+ "> to view the application");
connect.createServer(
   connect.static(directory)
).listen(PORT);