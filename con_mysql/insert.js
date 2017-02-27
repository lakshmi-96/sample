var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql=require('mysql')
var pg = require('pg');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'))


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sample'
});

app.get('/',function(req,res,next){
res.sendfile('index.html');
});

app.post('/myaction', function(req, res) {
res.writeHead(200, { 'Content-Type': 'text/html'});
console.log('req.body');
console.log(req.body);
res.write('Your name "' + req.body.name+'".\n');
res.write('Your Reg.no "' + req.body.reg+'".\n');
res.write('Your course"' + req.body.course+'".\n');
var insert=req.body.insert;
var update=req.body.update;
var del=req.body.delete;
var sel=req.body.select;
if(insert)
{
connection.query("Insert into task1 (name,reg_no,course) VALUES ('"+req.body.name+"','"+req.body.reg+"','"+req.body.course+"')",function(err, result)      
{                                                      
  if (err)
     throw err;
});
}
else if(sel)
{
connection.query("SELECT * from `task1` ",function(err, rows)	
{                                                      
  if (err){
     throw err;}
 else{
 	 
                res.write(JSON.stringify(rows));
 }
});
}
else if(update)
{
connection.query("UPDATE `task1` SET `name`='"+req.body.name+"',course='"+req.body.course+"'  where `reg_no`='"+req.body.reg+"' ",function(err, result)	
{                                                      
  if (err)
     throw err;
});
}
else if(del)
{
connection.query("DELETE from `task1`  where `reg_no`='"+req.body.reg+"' ",function(err, result)	
{                                                      
  if (err)
     throw err;
});
}
});
app.listen(8080);
console.log('Example app listening at port:8080');