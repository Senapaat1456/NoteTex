const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json','utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToNotSheetName(row){
  return{
    noteSheetName:row.noteSheetName;
  }
}

app.get('/noteSheetList/:userName',(request, responce) => {
  const query = 'SELECT noteSheetName N FROM noteSheets JOIN users U ON N.userCreator = U.userId WHERE isDeleted = 0 AND U.userName = ?'
  const params = [request.params.userName];
  connection.query(query, params, (error, rows) => {
    responce.send({
      ok: true,
      memories: row.map(rowToObject)
    });
  });
});

const port = 443;
app.listen(port, () => {
  console.log("Running on port: " + port);
});
