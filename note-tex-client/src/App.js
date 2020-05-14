import React, {useEffect} from 'react';
import './css/App.css';
import {useDispatch,useSelector} from 'react-redux';
import {NoteLine} from './NoteLine';
import {UserBox} from './UserBox';
import {loadLine,startEdit} from './LineActions';
import MathJax from 'react-mathjax';

function App() {

  //full credit for this line goes to the user on stack overflow that I found on a question I could not refind to credit, I couldn't figure out how to not have to the page go to the previous page when erasing with the backspace key, and I tried this code and it worked perfectly
  window.addEventListener('keydown',function(e){if(e.keyIdentifier==='U+0008'||e.keyIdentifier==='Backspace'||e.keyCode===8){if(e.target===document.body){e.preventDefault();return false;}}},true);

  const noteLines = useSelector(state => state.noteLines);
  const lineCount = useSelector(state => state.lineCount);
  const currentUserName = useSelector(state => state.userName);
  const currentNoteSheet_id = useSelector(state => state.noteSheet_id);
  const dispatch = useDispatch();
  const isWaiting = useSelector(state => state.isWaiting)

  useEffect(() =>{
    dispatch(loadLine({lineNumber: 1, lineContents: ""}));
    dispatch(startEdit(1));
  },[dispatch]);

  return (
    <div className="App">
      {isWaiting && <div className="waitingWheel"> <div className="innerWheel"> <div className="innerInnerWheel"/> </div></div>}
      <div className="header">
        <div className="title"> Note-Tex </div>
      </div>

      <div className="middle">

        <div className="leftMargin">
          <div className="mainTipBox">
            <div className="tipTitle">
              Tips
            </div>
            <div className="tipBox">
              <div className="tipHeading">
                Bold
              </div>
              %text% -> <b>text</b>
            </div>
            <div className="tipBox">
              <div className="tipHeading">
                Italic
              </div>
              'text' -> <i>text</i>
            </div>
            <div className="tipBox">
              <div className="tipHeading">
                LaTex
              </div>
                $x^2$ -> <MathJax.Provider><MathJax.Node inline formula={'x^2'} /></MathJax.Provider>
            </div>
            <div className="tipBox">
              <div className="tipHeading">
                Headings
              </div>
                <div>#text -> <span style={{fontSize:24}} >text</span></div>
                <div>##text -> <span style={{fontSize:20}} >text</span></div>
                <div>##text -> <span style={{fontSize:16}} >text</span></div>
            </div>
            <div className="tipBox">
              <div className="tipHeading">
                Mix and Match
              </div>
                #$x^2$ -> <span style={{fontSize:24}}><MathJax.Provider><MathJax.Node inline formula={'x^2'} /></MathJax.Provider></span>
            </div>
          </div>
        </div>

          <div className="body">
           {noteLines.map(line => <NoteLine key={line.lineNumber + line.lineContents} lineCount={lineCount} noteLine={line} userName={currentUserName} noteSheet_id={currentNoteSheet_id} noteLines={noteLines}/>)}
        </div>

        <div className="rightMargin">
          <UserBox userName={currentUserName} currentNoteSheet_id={currentNoteSheet_id}/>
        </div>

      </div>

    </div>
  );
}

export default App;
