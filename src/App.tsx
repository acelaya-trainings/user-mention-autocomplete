import React from 'react';
import { CommentBoxWrapper } from './CommentBoxWrapper';

function App() {
  return (
    <div className="App">
      <section>
        <p className="text-center">Comment widget:</p>
        <CommentBoxWrapper loadUsers={() => fetch('/users.json').then(res => res.json())} />
      </section>
    </div>
  );
}

export default App;
