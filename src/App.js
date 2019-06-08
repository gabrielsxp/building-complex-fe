import React from 'react';
import Routes from './routes';
//import {logout, getOutOfBuilding} from './services/auth';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      i: 0
    }
  }
  incrementServer = () => {
    this.setState({i: this.state.i + 1});
  }
  render() {
    return (
      <div className="App">
        <Routes i={this.state.i} increment={this.incrementServer}/>
      </div>
    )
  }
}

export default App;
