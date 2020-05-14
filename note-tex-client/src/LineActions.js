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
    return dispatch => {
      dispatch(finishEndEdit(noteLine))
    }
  }else{
      const combinedContents = noteLines.map(line =>{
        if(line.lineNumber === noteLine.lineNumber){
          return noteLine;
        }
        else{
          return line;
        }
      });
      const newBody = {contents:JSON.stringify(combinedContents),lineCount:currentLineCount,noteSheet_id:currentNoteSheet_id,userName:currentUserName};
      const options = {method: 'PATCH', headers:{'Content-Type': 'application/json'}, body:JSON.stringify(newBody)};
      return dispatch => {
        dispatch(finishEndEdit(noteLine)) //I know this is out of order, the reason being, if the user has to wait for the server before continuing writing, it can ruin the flow, so its more important to let the user keep working then to make sure the server is perfectly sinked
        fetch(`${host}/noteSheetEdit`,options)
          .then(checkForErrors)

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
