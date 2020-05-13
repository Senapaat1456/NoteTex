import React, {useState} from 'react';
export const UserAction = Object.freeze({
  BeginLogin: 'BeginLogin',
  FinishLogin: 'FinishLogin',
  Logout: 'Logout',
  BeginNewUser: 'BeginNewUser',
  BeginLoadSheet:'BeginLoadSheet',
  FinishLoadSheet:'FinishLoadSheet',
  BeginNewNoteSheet:'BeginNewNoteSheet',
})

const host = 'http://websystems.senapatiratne.com:1443';

export function checkForErrors(responce){
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
  const newBody = {userName:userName};
  const options = {method: 'POST', headers:{'Content-Type': 'application/json'}, body:JSON.stringify(newBody)};
  return dispatch => {
    fetch(`${host}/users`,options)
      .then(checkForErrors)
      .then(responce => responce.json())
      .then(data => {
        if(data.ok){
          dispatch(beginLogin(userName));
        }
      })
      .catch(e => console.error(e));
  };
}

export function beginLoadSheet(userName, noteSheet){
  return dispatch => {
      fetch(`${host}/noteSheetFind/${userName}/${noteSheet.noteSheetName}`).then(checkForErrors).then(responce => responce.json()).then(data => {
          if(data.ok){
            alert(JSON.stringify(data.requestedNoteSheet[0]))
            dispatch(finishLoadSheet(data.requestedNoteSheet[0]))
          }
        }).catch(e => console.error(e));
  }
}

export function finishLoadSheet(noteSheet){
  return{
    type:UserAction.FinishLoadSheet,
    payload:noteSheet
  }
}

export function logout(){
  return{
    type:UserAction.Logout,
    payload:null
  }
}
