import React, { Component } from 'react';
import Skjema from './components/skjema/skjema';

interface AppProps {
  fnr: string;
  enhet: string;
}

class App extends Component<AppProps> {
  render() {
      return (
          <div className="veilarbvedtaksstottefs">
            <Skjema />
          </div>
      );
  }
}

export default App;
