import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {beginEdit, endEdit, addNewLine} from './LineActions'
import ReactDOMServer from 'react-dom/server';
import './noteLine.css';
import MathJax from 'react-mathjax';
//import {parseLine} from './lineParser'



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
  const input = 'This **textbolded** a header';
  if(noteLine.isEditing){
    return(
      <span className="lineArea">
        ><input className="lineBox" contentEditable="true"  value={lineContents} onBlur={() => onEndEdit("CURSER")} onKeyDown={event => processesKeyPress(event.keyCode)} onChange={e => {setLineContents(e.target.value)}} ref={input => input && input.focus()}/>
      </span>
    )
  }else{
    return(
      <span className="lineArea">
        {parseLine(noteLine.lineContents)}
      </span>
    )
  }
  //
  //<ReactMarkdown source={input}/>


  function parseLine(lineContents){
    var parsedLineContents = lineContents;

    //parsing header info
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


    /*do{
      var tracker = parsedLineContents;

    }while(tracker != parsedLineContents)
    */

    //parsedLineContents = parsedLineContents.replace("**" , "<b>");
    var finalStructure, x;
    //var ReactDOMServer = require('react-dom/server');
    [finalStructure, x] = markdownParser(parsedLineContents,null);
       //alert(lineContents + " : " + ReactDOMServer.renderToStaticMarkup(finalStructure))
    var lineOutput = <div onClick={onBeginEdit}> > <span onClick={onBeginEdit} style={{fontSize:fontSizeArray[headerLevel]}} className ="noteText"> {finalStructure} </span> </div>



    return lineOutput;
  }

  function markdownParser(lineContents, endSymbol){
    //var ReactDOMServer = require('react-dom/server');

    var text = lineContents;
    var stack = [];
    var finalStructure;
    while(text.length > 0 && text[0] !== endSymbol){
      //alert("Char: " +   text[0]);
      stack.push(text[0]);
      text  = text.substr(1);
      //alert("Char: " + stack[stack.length - 1]);
      if(endSymbol !== '$' && (stack[stack.length - 1] === '%' || stack[stack.length - 1] === '`' || stack[stack.length - 1] === '$')){
        //alert("pound found");

        var recursiveStructure;
        [recursiveStructure, text] = markdownParser(text,stack[stack.length - 1]);

        //alert("Sending: " + text + ", looking for:" + stack[stack.length - 1])
        stack.pop(stack.length - 1)
        finalStructure = <span>{finalStructure}<span>{stack}</span><span>{recursiveStructure}</span></span>;
        //alert("Final Structre: " + ReactDOMServer.renderToStaticMarkup(finalStructure))
        stack = [];
        text  = text.substr(1);
        //alert("Text at end: " +    text);
      }
    }

    finalStructure = <span>{finalStructure}<span>{stack}</span></span>;


    if(text == null || text.length === 0){
      //alert("returning: " +  ReactDOMServer.renderToStaticMarkup(<span> {finalStructure} </span>))
      return [<span>{finalStructure}</span>,null];
    }else{

      if(endSymbol === '%'){
        //alert("returning: " +  ReactDOMServer.renderToStaticMarkup(<b>{finalStructure}</b>) + ", with left overs: " + text)
        return [<b>{finalStructure}</b>,text];

      }
      if(endSymbol === '`'){
        //alert("returning: " +  ReactDOMServer.renderToStaticMarkup(<i>{finalStructure}</i>) + ", with left overs: " + text)
        return [<i>{finalStructure}</i>,text];

      }
      if(endSymbol === '$'){
        //alert(stack.join(''))

        var latexScript =stack.join('');
        //alert("Latex String = " + latexScript)
        //     alert("returning: " +  ReactDOMServer.renderToStaticMarkup(<Latex>{latexScript}</Latex>) + ", with left overs: " + text)
        return [<MathJax.Provider><MathJax.Node inline formula={latexScript} /></MathJax.Provider>,text];

      }
    }


    return ['','']
}

  /*function markdownParserRecursive(lineContents,endSymbol){
    var returnStack = []
    while(lineContents.length > 0 && lineContents[0] != endSymbol){

    }
  }*/

}
