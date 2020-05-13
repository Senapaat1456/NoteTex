import React, {useState} from 'react';
export const LineAction = Object.freeze({
  BeginEdit: 'BeginEdit',
  EndEdit: 'EndEdit',
  LoadLine: 'LoadLine',
  IncrementLineCount: 'IncrementLineCount',
  AddNewLine:'AddNewLine',
  RemoveLine:'removeLine'
})

export function beginEdit(lineNumber){
  return{
    type: LineAction.BeginEdit,
    payload: lineNumber
  };
}

export function endEdit(noteLine){
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
