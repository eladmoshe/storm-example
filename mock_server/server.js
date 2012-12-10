var connect = require('connect');
var PORT = 1234;
var directory = __dirname + "/../public/";
console.log("Server started. Open your browser at <http://localhost:"+PORT+ "> to view the application");
connect.createServer(
   connect.static(directory)
).listen(PORT);