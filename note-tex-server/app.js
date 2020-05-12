const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('../note-tex-database/credentials.json','utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToNoteSheetName(row){
  return{
    noteSheetName:row.noteSheetName
  }
}

function rowToUserId(row){
  return{
    userId:row.userId
  }
}

app.get('/noteSheetList/:userName',(request, responce) => {
  const query = 'SELECT noteSheetName FROM noteSheets JOIN users ON userCreator = userId WHERE isDeleted = 0 AND userName = ?';
  const params = [request.params.userName];
  connection.query(query, params, (error, rows) => {
    responce.send({
      ok: true,
      usersNoteSheets: rows.map(rowToNoteSheetName)
    });
  });
});

//note, the sheet must be owned by the user
app.get('/noteSheet/:userName/:sheetName',(request, responce) => {
  const query = 'SELECT noteSheetName FROM noteSheets JOIN users ON userCreator = userId WHERE isDeleted = 0 AND userName = ? AND noteSheetName = sheetName';
  const params = [request.params.userName];
  connection.query(query, params, (error, rows) => {
    responce.send({
      ok: true,
      usersNoteSheets: rows
    });
  });
});

app.post('/noteSheetList',(request, responce) => {
  console.log("received request: " + JSON.stringify(request.body));
  const userIdQuery = 'SELECT userId FROM users WHERE userName = ?';
  const userIdParms = [request.body.userName];
  console.log("userName: " + request.body.userName);
  var userId = -1;
  userId = connection.query(userIdQuery,userIdParms, (errors,rows) =>{
    console.log(rows[0]);
    console.log(typeof(rows[0].userId));
    userId = rows[0].userId;
    console.log("type of userId: "  + typeof(userId));
  
    console.log("fain: " + userId)
    const query = 'INSERT INTO noteSheets (noteSheetName, userCreator, lineCount, contents) values (?,?,?,?)';
    const params = [request.body.sheetName,userId,request.body.lineCount,request.body.contents];
      connection.query(query, params, (error, result) => {
        console.log(error);
    	responce.send({
      	  ok: true,
      	  id: result.insertId,
      });
    });
  });
});

const port = 1443;
app.listen(port, () => {
  console.log("Running on port: " + port);
});
