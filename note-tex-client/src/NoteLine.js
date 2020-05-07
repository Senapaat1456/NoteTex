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

  const onEndEdit = (keyCode) =>{

    if(keyCode === 13){
      dispatch(endEdit({lineNumber:noteLine.lineNumber, lineContents:lineContents}));
      if(noteLine.lineNumber === lineCount && lineContents !== ""){
        dispatch(addNewLine(lineCount))
        dispatch(beginEdit(lineCount+1))
      }
    }
  }

  if(noteLine.isEditing){
    return(
      <span className="lineArea">
        <input className="lineBox" value={lineContents} onBlur={() => onEndEdit(13)} onKeyDown={event => onEndEdit(event.keyCode)} onChange={e => {setLineContents(e.target.value)}} ref={input => input && input.focus()}/>
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
