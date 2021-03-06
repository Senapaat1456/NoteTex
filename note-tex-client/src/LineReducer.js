import {LineAction} from './LineActions';
import {UserAction} from './UserActions'
const initialState = {
  lineCount: 0,
  noteLines: [],
  userName:"",
  noteSheets:[],
  noteSheet_id:0,
  isWaiting:false,
}

function noteLinesReducer(noteLinesArray, action){
  switch (action.type) {


    case UserAction.FinishDelete:
      return [];


    case LineAction.StartEdit:
      return noteLinesArray.map(line =>{
        if(line.lineNumber === action.payload){
          return{...line, isEditing:true};
        }
        else{
          return line;
        }
      });


    case LineAction.EndEdit:
      return noteLinesArray.map(line =>{
           if(line.lineNumber === action.payload.lineNumber){
             return action.payload;
           }
           else{
             return line;
           }
         });

     case UserAction.Logout:
      return [];



    case LineAction.LoadLine:
      return [action.payload, ...noteLinesArray]


    case LineAction.AddNewLine:
      const oldList = noteLinesArray.map(line =>{


        if(line.lineNumber <= action.payload){

          return {lineContents:line.lineContents+"", lineNumber:line.lineNumber, marked:"under"}

        }
        else{

          return{lineContents:line.lineContents+"", lineNumber:line.lineNumber+1, marked:"Over"}

        }
      })
      const temp = {lineNumber:action.payload+1, lineContents:"", isEditing:true, marked:"new"}
      return [...oldList, temp].sort((a,b) => {return a.lineNumber - b.lineNumber});


    case LineAction.RemoveLine:
      const newList = noteLinesArray.filter(line => line.lineNumber !== action.payload.lineNumber).map(line =>{


        if(line.lineNumber <= action.payload.lineNumber ){

          return {lineContents:line.lineContents+"", lineNumber:line.lineNumber, marked:"under"}

        }
        else{

          return{lineContents:line.lineContents+"", lineNumber:line.lineNumber-1, marked:"Over"}

        }
      })
      return newList.sort((a,b) => {return a.lineNumber - b.lineNumber});


    case UserAction.FinishLoadSheet:
      return JSON.parse(action.payload.contents)
    default:
      return noteLinesArray;

  }
}

function lineCountReducer(lineCountVar, action){
  switch (action.type) {


    case UserAction.FinishDelete:
      return 0;


    case LineAction.LoadLine:
      return (lineCountVar+1);


    case LineAction.AddNewLine:
      return (lineCountVar+1);


    case LineAction.RemoveLine:
      return (lineCountVar-1)


    case UserAction.FinishLoadSheet:
      return action.payload.lineCount;


    case UserAction.Logout:
      return 0;


    default:
      return lineCountVar;
  }
}

function userNameReducer(userNameVar, action){
  switch (action.type){


    case UserAction.FinishLogin:
      return action.payload.userName;


    case UserAction.Logout:
      return "";

    default:
      return userNameVar;

  }
}

function noteSheetsReducer(noteSheetsArray, action){
  switch (action.type){


    case UserAction.FinishNewNoteSheet:
      return[...noteSheetsArray, action.payload]


    case UserAction.FinishDelete:
      return noteSheetsArray.filter(sheet => !sheet.isActive);


    case UserAction.BeginNewNoteSheet:
      return [...noteSheetsArray,{noteSheetName:"new sheet"}]


    case UserAction.FinishLogin:
      return action.payload.noteSheetList;


    case UserAction.FinishLoadSheet:
      return noteSheetsArray.map(sheet =>{
        if(sheet.noteSheetName === action.payload.noteSheetName){
          return{...sheet, isActive:true};
        }
        else{
          return{...sheet, isActive:false};
        }
      });


      case UserAction.Logout:
        return [];

    default:
      return noteSheetsArray;
  }
}

function noteSheet_idReducer(oldId, action){
  switch (action.type){


    case UserAction.FinishLoadSheet:
      return action.payload.noteSheet_id;

    default:
      return oldId;
  }
}

function isWaitingReducer(oldState, action){
  switch (action.type) {


    case UserAction.StartWaiting:
      return true;


    case UserAction.StopWaiting:
      return false;


    default:
      return oldState;
  }
}

function reducer(state = initialState, action){
    return{
      isWaiting: isWaitingReducer(state.isWaiting, action),
      lineCount: lineCountReducer(state.lineCount, action),
      noteLines: noteLinesReducer(state.noteLines, action),
      userName: userNameReducer(state.userName, action),
      noteSheets: noteSheetsReducer(state.noteSheets, action),
      noteSheet_id: noteSheet_idReducer(state.noteSheet_id, action),
    };
}
export default reducer;
