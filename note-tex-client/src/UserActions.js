import React, {useState} from 'react';
export const UserAction = Object.freeze({
  BeginLogin: 'BeginLogin',
  FinishLogin: 'FinishLogin',
  Logout: 'Logout',
  BeginNewUser: 'BeginNewUser',
  BeginLoadSheet:'BeginLoadSheet',
  FinishLoadSheet:'FinishLoadSheet',
  FinishNewNoteSheet:'FinishNewNoteSheet',
  FinishDelete:'FinishDelete',
})

const host = 'http://websystems.senapatiratne.com:1443';

export function checkForErrors(responce){
  if(!responce.ok){
    throw Error(`${responce.status}:${responce.statusText}`);
  }
  return responce;
}

export function beginNewNoteSheet(newNoteSheetName,userName){
  return dispatch => {
    const newBody = {userName:userName,sheetName:newNoteSheetName};
    const options = {method: 'POST', headers:{'Content-Type': 'application/json'}, body:JSON.stringify(newBody)};
    fetch(`${host}/noteSheetList`,options)
      .then(checkForErrors)
      .then(responce => responce.json())
      .then(data => {
        if(data.ok){
          dispatch(finishNewNoteSheet(newNoteSheetName));
        }

      })
      .catch(e => console.error(e));
  }
}

export function finishNewNoteSheet(newNoteSheetName){
  return{
    type:UserAction.FinishNewNoteSheet,
    payload:{noteSheetName:newNoteSheetName}
  }
}


export function beginDelete(userName,currentNoteSheet_id){
  return dispatch => {
      const newBody = {userName:userName,noteSheet_id:currentNoteSheet_id};
      const options = {method: 'DELETE', headers:{'Content-Type': 'application/json'}, body:JSON.stringify(newBody)};
      fetch(`${host}/noteSheet`,options)
        .then(checkForErrors)
        .then(responce => responce.json())
        .then(data => {
          if(data.ok){
            dispatch(finishDelete(currentNoteSheet_id));
          }

        })
        .catch(e => console.error(e));
  };
}

export function finishDelete(currentNoteSheet_id){
  return{
    type: UserAction.FinishDelete,
    payload: currentNoteSheet_id
  }
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
            alert("Login Failed. Try Again. Click 'New User' if making you are making a new acount.");
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
