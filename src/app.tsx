import React, { Component } from 'react';

interface AppProps {
  fnr: string;
  enhet: string;
}

class App extends Component<AppProps> {
  render() {
    return (
      <div>
        <p>Hello world</p>
      </div>
    );
  }
}

export default App;
