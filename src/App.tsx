import React from 'react';
import { TextAreaWrapper } from './TextAreaWrapper';

function App() {
  return (
    <div className="App">
      <section>
        <p className="text-center">Comment widget:</p>
        <TextAreaWrapper loadUsers={() => fetch('/users.json').then(res => res.json())} />
      </section>
    </div>
  );
}

export default App;
