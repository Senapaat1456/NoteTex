import React, {useState} from 'react';
export const Action = Object.freeze({
  BeginEdit: 'BeginEdit',
  EndEdit: 'EndEdit',
  LoadLine: 'LoadLine',
  IncrementLineCount: 'IncrementLineCount',
  AddNewLine:'AddNewLine',
  RemoveLine:'removeLine'
})

export function beginEdit(lineNumber){
  return{
    type: Action.BeginEdit,
    payload: lineNumber
  };
}

export function endEdit(noteLine){
  return{
    type: Action.EndEdit,
    payload: noteLine,
  };
}

export function addNewLine(location){
    return{
    type: Action.AddNewLine,
    payload: location,
  }
}

export function loadLine(noteLine){
  return {
    type: Action.LoadLine,
    payload: noteLine,
  };
}

export function incrementLineCount(){
  return{
    type: Action.IncrementLineCount,
    payload: null
  }
}

export function removeLine(noteLine){
  return{
    type: Action.RemoveLine,
    payload: noteLine
  }
}

/*export function newLine(noteLine){
  return {
    type: Action.LoadLine,
    payload: loadLine,
  };
}*/

/*export function newLine(){
  return dispatch => {
      dispatch(loadMemories(data.memories))
    }
  };
}*/
