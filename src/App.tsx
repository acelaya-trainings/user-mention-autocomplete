import React from 'react';
import './App.css';
import { MentionTextArea } from './MentionTextArea';

function App() {
  return (
    <div className="App">
      <section>
        <p>Write a comment:</p>
        <MentionTextArea />
      </section>
    </div>
  );
}

export default App;
