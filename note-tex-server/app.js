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

const port = 1443;
app.listen(port, () => {
  console.log("Running on port: " + port);
});
