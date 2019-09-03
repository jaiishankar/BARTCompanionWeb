import {Component} from 'react';
import ls from 'local-storage';
import BartAPIHelper from "./BartAPIHelper.js";

class APILoader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRoutesLoaded: false,
            routesdata: [],
            isStationsLoaded: false,
            stationdata: []

        };
    }

    componentDidMount() {
        this.loadRoutesMasterData();
        this.loadStationMasterData();
    }

    loadRoutesMasterData() {
        let apiurl = BartAPIHelper.getRoutesAPIURL();
        fetch(apiurl)
            .then(res => res.json())
            .then((data) => {
                this.setState({routesdata: data.root.routes.route, isRoutesLoaded: true})
            })
            .catch(console.log)
    }

    loadStationMasterData() {
        let apiurl = BartAPIHelper.getStationsAPIURL();
        fetch(apiurl)
            .then(res => res.json())
            .then((data) => {
                this.setState({stationdata: data.root.stations.station, isStationsLoaded: true})
            })
            .catch(console.log)
    }

    render() {
        if (this.state.isRoutesLoaded) {
            //will replace old data
            ls.set('routesdata', this.state.routesdata);
        }
        if (this.state.isStationsLoaded) {
            //will replace old data
            ls.set('stationsdata', this.state.stationdata);
        }
        // console.log(ls.get('stationsdata'));
        return null;
    }
}

export default APILoader;
