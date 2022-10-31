import React from 'react';
import { TextArea } from './comment-widget/TextArea';

function App() {
  return (
    <div className="App">
      <section>
        <p className="text-center">Comment widget:</p>
        <TextArea loadUsers={() => fetch('/users.json').then(res => res.json())} />
      </section>
    </div>
  );
}

export default App;
