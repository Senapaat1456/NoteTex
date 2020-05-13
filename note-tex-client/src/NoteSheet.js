import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';

export function NoteSheet(props){

  const noteSheet = props.noteSheet
  const dispatch = useDispatch();


  return(
    <div className="noteSheetName">{noteSheet.noteSheetName}</div>
  );
}
