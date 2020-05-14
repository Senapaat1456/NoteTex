import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {startEdit, beginEndEdit, addNewLine, removeLine} from './LineActions'
import './css/noteLine.css';
import MathJax from 'react-mathjax';

export function NoteLine(props){
  const noteLine = props.noteLine;
  const dispatch = useDispatch();
  const [lineContents, setLineContents] = useState(noteLine.lineContents);
  const lineCount = props.lineCount

  const onStartEdit = () =>{
    dispatch(startEdit(noteLine.lineNumber));
  }

  const onEndEdit = (typeOfExit) =>{
    dispatch(beginEndEdit({lineNumber:noteLine.lineNumber, lineContents:lineContents},props.noteLines,lineCount,props.noteSheet_id,props.userName));
    if(lineContents !== "" && typeOfExit === "ENTER"){
      dispatch(addNewLine(noteLine.lineNumber));
    }
  }

  const onRemoveLine = () =>{
    if(lineCount > 1){
      dispatch(removeLine(noteLine));
    }
    if(noteLine.lineNumber > 1){
      dispatch(startEdit(noteLine.lineNumber - 1));
    }
  }

const onUpArrow = () => {
  if(noteLine.lineNumber !== 1){
    dispatch(beginEndEdit({lineNumber:noteLine.lineNumber, lineContents:lineContents}));
    dispatch(startEdit(noteLine.lineNumber - 1));
  }
}

const onDownArrow = () => {
  if(noteLine.lineNumber !== lineCount){
    dispatch(beginEndEdit({lineNumber:noteLine.lineNumber, lineContents:lineContents}));
    dispatch(startEdit(noteLine.lineNumber + 1));
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
  else if(keyCode === 8 && (lineContents === "" || lineContents == null)){
      onRemoveLine();
  }

}
  const input = 'This **textbolded** a header';
  if(noteLine.isEditing){
    return(
      <span className="lineArea">
        <input className="inputBox" value={lineContents} onBlur={() => onEndEdit("CURSER")} onKeyDown={event => processesKeyPress(event.keyCode)} onChange={e => {setLineContents(e.target.value)}} ref={input => input && input.focus()}/>
      </span>
    )
  }else{
    return(
      <span className="lineArea">
        {parseLine(noteLine.lineContents)}
      </span>
    )
  }

  function parseLine(lineContents){
    var parsedLineContents = lineContents;

    var fontSizeArray = [12,24,20,16]
    var headerLevel = 0;
    if(parsedLineContents[0] === '#'){
      headerLevel = 1;
      parsedLineContents = parsedLineContents.substr(1);
    }
    if(parsedLineContents[0] === '#'){
      headerLevel = 2;
      parsedLineContents = parsedLineContents.substr(1);
    }
    if(parsedLineContents[0] === '#'){
      headerLevel = 3;
      parsedLineContents = parsedLineContents.substr(1);
    }


    var finalStructure;
    var lineOutput;
    try{
      [finalStructure,] = markdownParser(parsedLineContents,null);
       lineOutput = <span onClick={onStartEdit} style={{fontSize:fontSizeArray[headerLevel]}} className ="noteText"> {finalStructure} </span>
    }catch(err){
      lineOutput = <span onClick={onStartEdit} style={{fontSize:fontSizeArray[headerLevel]}} className ="noteText"> {parsedLineContents} </span>

    }


    return lineOutput;
  }

  function markdownParser(lineContents, endSymbol){

    var text = lineContents;
    var stack = [];
    var finalStructure;
    while(text.length > 0 && text[0] !== endSymbol){
      stack.push(text[0]);
      text  = text.substr(1);
      if(endSymbol !== '$' && (stack[stack.length - 1] === '%' || stack[stack.length - 1] === '`' || stack[stack.length - 1] === '$')){

        var recursiveStructure;
        [recursiveStructure, text] = markdownParser(text,stack[stack.length - 1]);

        stack.pop(stack.length - 1)
        finalStructure = <span>{finalStructure}<span>{stack}</span><span>{recursiveStructure}</span></span>;
        stack = [];
        text  = text.substr(1);
      }
    }

    finalStructure = <span>{finalStructure}<span>{stack}</span></span>;


    if(text == null || text.length === 0){
      return [<span>{finalStructure}</span>,null];
    }else{

      if(endSymbol === '%'){
        return [<b>{finalStructure}</b>,text];

      }
      if(endSymbol === '`'){
        return [<i>{finalStructure}</i>,text];

      }
      if(endSymbol === '$'){

        var latexScript =stack.join('');
        return [<MathJax.Provider><MathJax.Node inline formula={latexScript} /></MathJax.Provider>,text];

      }
    }


    return ['','']
}

}
