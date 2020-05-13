import React, {useState, getState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {checkForErrors} from './UserActions'

export const LineAction = Object.freeze({
  StartEdit: 'StartEdit',
  EndEdit: 'EndEdit',
  LoadLine: 'LoadLine',
  IncrementLineCount: 'IncrementLineCount',
  AddNewLine:'AddNewLine',
  RemoveLine:'removeLine'
})

const host = 'http://websystems.senapatiratne.com:1443';


export function startEdit(lineNumber){
  return{
    type: LineAction.StartEdit,
    payload: lineNumber
  };
}

export function beginEndEdit(noteLine, noteLines, currentLineCount, currentNoteSheet_id,currentUserName){
  if(currentUserName==null || currentUserName===""){
    alert("Not here")
    return dispatch => {
      dispatch(finishEndEdit(noteLine))
    }
  }else{
    alert("here")
    return dispatch => {
      const newBody = {editedLine:noteLine.contents,editedLineNumber:noteLine.lineNumber,lineCount:currentLineCount,noteSheet_id:currentNoteSheet_id,userName:currentUserName};
      const options = {method: 'PATCH', headers:{'Content-Type': 'application/json'}, body:JSON.stringify(newBody)};
      return dispatch => {
        fetch(`${host}/noteSheetEdit`,options)
          .then(responce => responce.json())
          .then(data => {
            if(data.ok){
              dispatch(finishEndEdit(noteLine))
            }
          })
          .catch(e => console.error(e));
      };
    };
  }
}



export function finishEndEdit(noteLine, noteLines, currentLineCount, currentNoteSheet_id,currentUserName){
  return{
    type: LineAction.EndEdit,
    payload: noteLine,
  };
}

export function addNewLine(location){
    return{
    type: LineAction.AddNewLine,
    payload: location,
  }
}

export function loadLine(noteLine){
  return {
    type: LineAction.LoadLine,
    payload: noteLine,
  };
}

export function incrementLineCount(){
  return{
    type: LineAction.IncrementLineCount,
    payload: null
  }
}

export function removeLine(noteLine){
  return{
    type: LineAction.RemoveLine,
    payload: noteLine
  }
}
