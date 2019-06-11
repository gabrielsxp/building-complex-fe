import React from 'react';
import Routes from './routes';
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
//import {logout, getOutOfBuilding} from './services/auth';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      i: 0
    }
  }
  componentDidMount() {
    Events.scrollEvent.register('begin', function (to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function (to, element) {
      console.log("end", arguments);
    });

    scrollSpy.update();
  }
  scrollToTop() {
    console.log('Executei essa porra ');
    scroll.scrollToTop();
  }
  incrementServer = () => {
    this.setState({i: this.state.i + 1});
  }
  render() {
    return (
      <div className="App">
        <Routes scrollTop={this.scrollToTop} i={this.state.i} increment={this.incrementServer}/>
      </div>
    )
  }
}

export default App;
