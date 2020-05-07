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


    case Action.AddNewLine:
      return{
        ...state,
         noteLines: [...state.noteLines, {lineNumber:state.lineCount+1,lineContents:""}],
         lineCount:state.lineCount+1
      }


    default:
      return state;
  }
}
export default reducer;
