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

function rowToNoteSheet(row){
  return{
    noteSheet_id:row.noteSheet_id,
    lineCount:row.lineCount,
    contents:row.contents,
    updatedAt:row.updatedAt
  }
}

//gets list of note sheets owned by a user
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

//get a noteSheet that belong to a user
//note, the sheet must be owned by the user
app.get('/noteSheet/:userName',(request, responce) => {
  console.log(request.params.userName + " , " + request.body.sheetName);
  const query = 'SELECT noteSheet_id, lineCount, contents, updatedAt FROM noteSheets JOIN users ON userCreator = userId WHERE isDeleted = 0 AND userName = ? AND noteSheetName = ?';
  const params = [request.params.userName, request.body.sheetName];
  connection.query(query, params, (error, rows) => {
    console.log(error);
    console.log(rows);
    responce.send({
      ok: true,
      requestedNoteSheet: rows.map(rowToNoteSheet)
    });
  });
});

//new note sheet
app.post('/noteSheetList',(request, responce) => {
  const userIdQuery = 'SELECT userId FROM users WHERE userName = ?';
  const userIdParms = [request.body.userName];
  var userId = -1;
  userId = connection.query(userIdQuery,userIdParms, (errors,rows) =>{
    userId = rows[0].userId;
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

app.post('/users', (request, responce) => {
  const newUserInsert = "INSERT INTO users (userName) VALUES (?)";
  const newUserParams = [request.body.userName];
  connection.query(newUserInsert, newUserParams, (error, result) => {
    console.log(error);
    responce.send({
      ok:true,
      id: result.insertId
    });
  });
});

app.patch('/noteSheet', (request, responce) => {
  const userIdQuery = 'SELECT userId FROM users WHERE userName = ?';
  const userIdParms = [request.body.userName];
  var userId = -1;
  userId = connection.query(userIdQuery,userIdParms, (errors,rows) =>{
    userId = rows[0].userId;
    const noteSheetUpdate = 'UPDATE noteSheets SET contents = ?, lineCount = ?, updatedAt = CURRENT_TIMESTAMP WHERE noteSheet_id = ? AND userCreator = ?'
    const params = [request.body.contents,request.body.lineCount,request.body.noteSheet_id, userId];
      connection.query(noteSheetUpdate, params, (error, result) => {
        console.log(error);
      responce.send({
          ok: true,
      });
    });
  });
  });

  app.delete('/noteSheet', (request, responce) =>{
    const userIdQuery = 'SELECT userId FROM users WHERE userName = ?';
    const userIdParms = [request.body.userName];
    var userId = -1;
    userId = connection.query(userIdQuery,userIdParms, (errors,rows) =>{
      console.log("Error spot 1: " + errors);
      userId = rows[0].userId;
      console.log("Id: " + userId);
      const noteSheetDelete = 'UPDATE noteSheets SET isDeleted = 1, updatedAt = CURRENT_TIMESTAMP WHERE noteSheet_id = ? AND userCreator = ?'
      const params = [request.body.noteSheet_id, userId];
        connection.query(noteSheetDelete, params, (error, result) => {
          console.log("Error Log 2: " + error);
        responce.send({
            ok: true,
        });
      });
    });
  });


const port = 1443;
app.listen(port, () => {
  console.log("Running on port: " + port);
});
