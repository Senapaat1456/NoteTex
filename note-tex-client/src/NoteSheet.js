import React from 'react';
import {useDispatch} from 'react-redux';
import {beginLoadSheet} from './UserActions.js'
import './css/NoteSheet.css';


export function NoteSheet(props){
  const userName = props.userName;
  const noteSheet = props.noteSheet;
  const dispatch = useDispatch();

  const onLoadNoteSheet = () =>{
    dispatch(beginLoadSheet(userName, noteSheet));
  }


  if(noteSheet.isActive){
    return(
      <div className="noteSheetNameActive" onClick={onLoadNoteSheet}>{noteSheet.noteSheetName}</div>
    )
  }else{
    return(
      <div className="noteSheetName" onClick={onLoadNoteSheet} > {noteSheet.noteSheetName} </div>
    );
  }
}
