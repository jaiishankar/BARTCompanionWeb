import React, {Component} from 'react';
import Stations from './Stations.js';
import './App.css';
import APILoader from './APILoader.js';

class App extends Component {
    render() {
        return (

            <div className="container">
                <APILoader/>
                <Stations/>
            </div>
        )
    }
}

export default App;
