import {Action} from './LineActions';
const initialState = {
  lineCount: 0,
  noteLines: [],
  currentLine: {lineContents:"temp"},
}

function noteLinesReducer(noteLinesArray, action){
  switch (action.type) {


    case Action.BeginEdit:
      return noteLinesArray.map(line =>{
        if(line.lineNumber === action.payload){
          return{...line, isEditing:true};
        }
        else{
          return line;
        }
      });


    case Action.EndEdit:
      return noteLinesArray.map(line =>{
           if(line.lineNumber === action.payload.lineNumber){
             return action.payload;
           }
           else{
             return line;
           }
         });



    case Action.LoadLine:
      return [action.payload, ...noteLinesArray]


    case Action.AddNewLine:
      //console.log("Old: "+ JSON.stringify(noteLinesArray))
      const oldList = noteLinesArray.map(line =>{

        //console.log("a Line: "+ JSON.stringify(line))

        if(line.lineNumber <= action.payload){

          return {lineContents:line.lineContents+"", lineNumber:line.lineNumber, marked:"under"}

        }
        else{

          return{lineContents:line.lineContents+"", lineNumber:line.lineNumber+1, marked:"Over"}

        }
      })
      const temp = {lineNumber:action.payload+1, lineContents:"", isEditing:true, marked:"new"}
      //console.log("New: "+ JSON.stringify([...oldList, temp].sort((a,b) => {return a.lineNumber - b.lineNumber})))
      return [...oldList, temp].sort((a,b) => {return a.lineNumber - b.lineNumber});

    default:
      return noteLinesArray;

  }
}

function lineCountReducer(lineCountVar, action){
  switch (action.type) {


    case Action.LoadLine:
      return (lineCountVar+1);


    case Action.AddNewLine:
      return (lineCountVar+1);


    default:
      return lineCountVar;
  }
}

function reducer(state = initialState, action){
    return{
      lineCount: lineCountReducer(state.lineCount, action),
      noteLines: noteLinesReducer(state.noteLines, action)
    };
}
export default reducer;
