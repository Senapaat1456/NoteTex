import {Action} from './LineActions';
const initialState = {
  lineCount: 1,
  noteLines: [],
  currentLine: {lineContents:"temp"},
}
function reducer(state = initialState, action){
  switch (action.type) {

    case Action.BeginEdit:
      return{
         ...state, currentLine:action.payload,
         noteLines: state.noteLines.map(line =>{
           if(line.lineNumber === action.payload){
             return{...line, isEditing:true};
           }
           else{
             return line;
           }
         })
       }


    case Action.EndEdit:
      return{
         ...state,
         noteLines: state.noteLines.map(line =>{
           if(line.lineNumber === action.payload.lineNumber){
             return{...line, isEditing:false};
           }
           else{
             return line;
           }
         })
       }


     case Action.LoadLine:
       return{
         ...state,
         noteLines: [action.payload, ...state.noteLines],
       }


     case Action.IncrementLineCount:
      return{
        ...state, lineCount:Action.IncrementLineCount+1
      }


    /*case Action.AddNewLine:
    const temp = {lineNumber:action.payload+1, lineContents:"New Line...", isEditing:true}
      return{
        ...state,
         noteLines:[(state.noteLines.map(line =>{
           if(line.lineNumber <= action.payload){
             return{...line, lineNumber:line.lineNumber}
           }
           else{
             return{...line, lineNumber:line.lineNumber+1}
           }
         })).push(temp)
         ,lineCount:state.lineCount+1
      }*/

      case Action.AddNewLine:
        console.log("Old: " + JSON.stringify(state.noteLines) + ", type: " + typeof(state.noteLines));
        const temp = {lineNumber:action.payload+1, lineContents:"", isEditing:true, marked:"new"}
        const oldList = state.noteLines.map(line =>{

          console.log("a Line: "+ JSON.stringify(line))

          if(line.lineNumber <= action.payload){

              var ii = line.lineNumber;
            var contents = line.lineContents;
            return {lineContents:contents, lineNumber:ii, marked:"under"}

          }
          else{

            var ii = line.lineNumber+1;
            var contents = line.lineContents;
            return{lineContents:contents, lineNumber:ii, marked:"Over"}

          }
        })
        console.log("New: " + JSON.stringify(oldList) + ", type: " + typeof(oldList));
        console.log("final: " + JSON.stringify(([oldList,temp]).flat()))
        return{
          ...state,
           noteLines:([oldList,temp]).flat()
           ,lineCount:state.lineCount+1
        }


    default:
      return state;
  }
}
export default reducer;
