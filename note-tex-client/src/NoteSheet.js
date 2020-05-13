import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {beginLoadSheet} from './UserActions.js'

export function NoteSheet(props){
  const userName = props.userName;
  const noteSheet = props.noteSheet;
  const dispatch = useDispatch();

  const onLoadNoteSheet = () =>{
    dispatch(beginLoadSheet(userName, noteSheet));
  }


  if(noteSheet.isActive){
    return(
      <div className="noteSheetName" onClick={onLoadNoteSheet} style={{fontSize:20}}>{noteSheet.noteSheetName}</div>
    )
  }else{
    return(
      <div className="noteSheetName" onClick={onLoadNoteSheet} > {noteSheet.noteSheetName} </div>
    );
  }
}
