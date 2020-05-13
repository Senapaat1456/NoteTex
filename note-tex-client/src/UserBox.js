import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {beginLogin,beginNewUser,logout} from './UserActions.js';
import {loadLine} from './LineActions';
import {NoteSheet} from './NoteSheet';
import './UserBox.css';

export function UserBox(props){

  var userName = props.userName;
  const noteSheetList = useSelector(state => state.noteSheets  );
  //var noteSheetList = props.noteSheetList;
//      useEffect(() => { setNoteSheetList(props.noteSheetList) }, [props.noteSheetList]);

  const dispatch = useDispatch();

const processesKeyPress = (keyCode) =>{
  if(keyCode === 13){
    onLogin();
  }
}

const onLogin = () =>{
      if(userName == null || userName === ""){
        const box = document.getElementsByClassName('userNameBox');
        box[0].style.borderColor = "red";
      }else{
        dispatch(beginLogin(userName));
      }
}
const onNewUser = () =>{
  if(userName == null || userName === ""){
    const box = document.getElementsByClassName('userNameBox');
    box[0].style.borderColor = "red";
  }else{
    dispatch(beginNewUser(userName))
  }
}
const onLogout = () => {
  dispatch(logout());
  dispatch(loadLine({lineNumber: 1, lineContents: ""}))
}

  if(userName == null || userName === ""){
    return(
      <div className="loginBox">
        <div className="loginHeader">Login to Save and Load Note Sheets</div>
        <div className="userNameHeader">Username</div>
        <input className="userNameBox" onChange={e => userName = e.target.value} onKeyDown={event => processesKeyPress(event.keyCode)}/>
        <span className="buttonRow">
          <button className="loginButton" onClick={onLogin}>Login</button>
          <button className="newUserButton" onClick={onNewUser}>New User</button>
        </span>
      </div>

    )
  }else{
    return(
      <span className="listBox">
        <div className="noteListHeader">Saved Notes</div>
        <span className="listContainer">
          {noteSheetList.map(sheet => <NoteSheet key={sheet.noteSheetName} noteSheet={sheet} userName={userName}/>)}
        </span>
        <button className="deleteButton"> Delete </button>
        <button onClick={onLogout} className="logoutButton"> Logout </button>

      </span>
    )
  }
}
