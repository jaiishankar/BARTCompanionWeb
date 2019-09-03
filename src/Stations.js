import React, {Component} from 'react';
import ls from 'local-storage';
import StationInfo from './StationInfo.js';

class Stations extends Component {

    state = {
        stations: [],
        selectedStation: "12th"
    }

    reloadStationInfo() {
        this.setState((state) => {
            return {stationcode: state.selectedStation}
        })
    }

    componentDidMount() {

        // now Load it from the local store.
        let stns = ls.get('stationsdata') || [];
        if (stns && stns.length > 0) {
            this.setState({stations: stns});
        }

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        {this.state.stations.map((stn, i) => (
                            <div className="container" key={stn.abbr}>
                                <button className="btn btn-outline-primary btn-block" key={stn.abbr}
                                        buttontext={stn.abbr} onClick={this.handleClick.bind(this, stn.abbr)}>
                                    {stn.name}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="col-sm">
                        <StationInfo ref={(stninfo) => {
                            this.stninfo = stninfo
                        }} stationcode={this.state.selectedStation}
                                     reloadStationInfoHandler={this.reloadStationInfo.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }

    handleClick(stncode, data) {
        this.stninfo.loadData(stncode);
    }
}

export default Stations;
