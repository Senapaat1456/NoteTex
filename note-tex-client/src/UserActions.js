import React, {useState} from 'react';
export const UserAction = Object.freeze({
  BeginLogin: 'BeginLogin',
  FinishLogin: 'FinishLogin',
  BeginLogout: 'BeginLogout',
  BeginNewUser: 'BeginNewUser',
  BeginLoadDocumentList: 'BeginLoadDocumentList',
  FinishLoadDocumentList:'FinishLoadDocumentList',
  BeginLoadDocument:'BeginLoadDocument',
  BeginNewNoteSheet:'BeginNewNoteSheet',
})

const host = 'http://websystems.senapatiratne.com:1443';

function checkForErrors(responce){
  if(!responce.ok){
    throw Error(`${responce.status}:${responce.statusText}`);
  }
  return responce;
}

export function beginLogin(userName){
  return dispatch => {
      fetch(`${host}/noteSheetList/${userName}`)
        .then(checkForErrors)
        .then(responce => responce.json())
        .then(data => {
          if(data.ok){
            dispatch(finishLogin(data.usersNoteSheets,userName));
          }
          else{
            alert("Login Failed");
          }
        })
        .catch(e => console.error(e));
  };
}


export function finishLogin(usersNoteSheets, userName){
  return{
    type: UserAction.FinishLogin,
    payload: {noteSheetList:usersNoteSheets, userName:userName}
  };
}

export function beginNewNoteSheet(){
  return{
    type: UserAction.BeginNewNoteSheet,
    payload:1
  }
}

export function beginNewUser(userName){
  const options = {method: 'POST',headers:{'Content-Type': 'application/json',},body:{"userName":userName},}
  return dispatch => {
    fetch(`${host}/users`,options)
      .then(checkForErrors)
      .then(responce => responce.json())
      .then(data => {
        if(data.ok){
          beginLogin(userName);
          beginNewNoteSheet();
        }
      })
      .catch(e => console.error(e));
  };
}
