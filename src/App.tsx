import React from 'react';
import { MentionTextArea } from './comment-widget/MentionTextArea';

function App() {
  return (
    <div className="App">
      <section>
        <p className="text-center">Write a comment:</p>
        <MentionTextArea loadDataSet={() => fetch('/users.json').then(res => res.json())} />
      </section>
    </div>
  );
}

export default App;
