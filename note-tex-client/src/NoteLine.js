import React, {useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {beginEdit, endEdit, addNewLine} from './LineActions'
import './noteLine.css';

export function NoteLine(props){
  const noteLine = props.noteLine;
  const dispatch = useDispatch();
  const [lineContents, setLineContents] = useState(noteLine.lineContents);
  const lineCount = props.lineCount

  const onBeginEdit = () =>{
    dispatch(beginEdit(noteLine.lineNumber));
  }

  const onEndEdit = (typeOfExit) =>{
    dispatch(endEdit({lineNumber:noteLine.lineNumber, lineContents:lineContents}));
    if(lineContents !== "" && typeOfExit === "ENTER"){
      dispatch(addNewLine(noteLine.lineNumber));
    }
  }



const processesKeyPress = (keyCode) =>{
  if(keyCode === 13){
    onEndEdit("ENTER");
  }
}

  if(noteLine.isEditing){
    return(
      <span className="lineArea">
        <input className="lineBox" default={lineContents} onBlur={() => onEndEdit("CURSER")} onKeyDown={event => processesKeyPress(event.keyCode)} onChange={e => {setLineContents(e.target.value)}} ref={input => input && input.focus()}/>
      </span>
    )
  }else{
    return(
      <span className="lineArea">
        <div onClick={onBeginEdit} className="noteText">
          {lineContents} : {noteLine.lineNumber} / {lineCount}
        </div>
      </span>
    )
  }
}
