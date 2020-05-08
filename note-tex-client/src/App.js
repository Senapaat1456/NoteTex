import React, {useEffect} from 'react';
import './App.css';
import {useDispatch,useSelector} from 'react-redux';
import {NoteLine} from './NoteLine';
import {loadLine, endEdit, incrementLineCount} from './LineActions'



function App() {


  const noteLines = useSelector(state => state.noteLines);
  const currentLine = useSelector(state => state.currentLine);
  const lineCount = useSelector(state => state.lineCount);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(loadLine({lineNumber: 1}))
  },[dispatch]);

  //alert("Pre-sort:" + JSON.stringify(noteLines))
  const sortedLines = Object.values(noteLines).sort((a,b) => a.lineNumber - b.lineNumber);
  //alert("Post-sort:" + JSON.stringify(noteLines))
  return (
    <div className="App">

      <div className="header">
        <div className="title"> Note-Tex </div>
      </div>

      <div className="middle">

        <div className="leftMargin">
          {sortedLines.length}
        </div>

        <div className="body">
           {sortedLines.map(line => <NoteLine key={line.lineNumber} lineCount={lineCount} noteLine={line}/>)}
        </div>

        <div className="rightMargin">
          Number of Lines: {lineCount}
        </div>

      </div>

    </div>
  );
}

export default App;
