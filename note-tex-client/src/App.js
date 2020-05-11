import React, {useEffect} from 'react';
import './App.css';
import {useDispatch,useSelector} from 'react-redux';
import {NoteLine} from './NoteLine';
import {loadLine, endEdit, beginEdit} from './LineActions';
import {store} from './LineStore';
import MathJax from 'react-mathjax';

function App() {
  window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+0008'||e.keyIdentifier=='Backspace'||e.keyCode==8){if(e.target==document.body){e.preventDefault();return false;}}},true);

  const noteLines = useSelector(state => state.noteLines);
  const lineCount = useSelector(state => state.lineCount);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(loadLine({lineNumber: 1, lineContents: ""}))
    dispatch(beginEdit(1))
  },[]);

  //console.log("Pre-sort:" + JSON.stringify(noteLines))
  //console.log(store.getState())
  //const sortedLines = Object.values(noteLines).sort((a,b) => a.lineNumber - b.lineNumber);
  //console.log("Post-sort:" + JSON.stringify(noteLines))
  return (
    <div className="App">

      <div className="header">
        <div className="title"> Note-Tex </div>
      </div>

      <div className="middle">

        <div className="leftMargin">
          {noteLines.length}
        </div>

        <div className="body">
           {noteLines.map(line => <NoteLine key={line.lineNumber + line.lineContents}lineCount={lineCount} noteLine={line}/>)}
        </div>

        <div className="rightMargin">
            fsf
        </div>

      </div>

    </div>
  );
}

export default App;
