import React, { Component } from 'react';
import Skjema from './components/skjema/skjema';

interface AppProps {
  fnr: string;
  enhet: string;
}

class App extends Component<AppProps> {
  render() {
    return (<Skjema />);
  }
}

export default App;
