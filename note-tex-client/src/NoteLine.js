import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {beginEdit, endEdit, addNewLine} from './LineActions'

export function NoteLine(props){
  const noteLine = props.noteLine;
  const dispatch = useDispatch();
  const [lineContents, setLineContents] = useState(noteLine.lineContents);
  const [lineCount, setlineCount] = useState(props.lineCount);

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
      <textarea value={lineContents} onKeyDown={event => onEndEdit(event.keyCode)} onChange={e => {setLineContents(e.target.value)}} classname="lineBox" ref={input => input && input.focus()}/>
    )
  }else{
    return(
      <button onClick={onBeginEdit} className="NoteLine">
        {lineContents}
      </button>
    )
  }
}
