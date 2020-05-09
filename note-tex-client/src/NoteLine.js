import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {beginEdit, endEdit, addNewLine} from './LineActions'
import './noteLine.css';

export function NoteLine(props){
  //console.log("this line: " + JSON.stringify(props.noteLine) + ", Important: " + props.noteLine.lineContents)
  const noteLine = props.noteLine;
  const dispatch = useDispatch();
  const [lineContents, setLineContents] = useState(noteLine.lineContents);
  //console.log("actual: " + lineContents)
  //useEffect(() => doSth(lineContents))
  const lineCount = props.lineCount

  const onBeginEdit = () =>{
    //alert(lineContents + " , " + noteLine.lineContents)
    dispatch(beginEdit(noteLine.lineNumber));
  }

  const onEndEdit = (typeOfExit) =>{
    //alert(lineContents)
    dispatch(endEdit({lineNumber:noteLine.lineNumber, lineContents:lineContents}));
    //alert(lineContents)
    if(lineContents !== "" && typeOfExit === "ENTER"){
      dispatch(addNewLine(noteLine.lineNumber));
    }
  }

const onUpArrow = () => {
  if(noteLine.lineNumber != 1){
    dispatch(endEdit({lineNumber:noteLine.lineNumber, lineContents:lineContents}));
    dispatch(beginEdit(noteLine.lineNumber - 1));
  }
}

const onDownArrow = () => {
  if(noteLine.lineNumber != lineCount){
    dispatch(endEdit({lineNumber:noteLine.lineNumber, lineContents:lineContents}));
    dispatch(beginEdit(noteLine.lineNumber + 1));
  }
}


const processesKeyPress = (keyCode) =>{
  if(keyCode === 13){
    onEndEdit("ENTER");
  }
  else if(keyCode === 38){
    onUpArrow();
  }
  else if(keyCode === 40){
    onDownArrow();
  }

}

  if(noteLine.isEditing){
    return(
      <span className="lineArea">
        ><input className="lineBox" value={lineContents} onBlur={() => onEndEdit("CURSER")} onKeyDown={event => processesKeyPress(event.keyCode)} onChange={e => {setLineContents(e.target.value)}} ref={input => input && input.focus()}/>
      </span>
    )
  }else{
    return(
      <span className="lineArea">
        <div onClick={onBeginEdit} className="noteText">
          > {noteLine.lineContents}
        </div>
      </span>
    )
  }
}
