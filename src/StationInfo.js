import React, {Component} from 'react';
import ls from 'local-storage';
import RealTimeSchedule from './RealTimeSchedule.js';

class StationInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stationcode: props.stationcode,
            isLoaded: false,
            stationinfo: null,
            northroutes: [],
            southroutes: []
        };
    }

    loadData(stncode) {
        this.setState({isLoaded: false, stationinfo: null, stationcode:stncode});
        this.forceUpdate();
        fetch('http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=' + stncode + '&key=MW9S-E7SL-26DU-VV8V&json=y')
            .then(res => res.json())
            .then((data) => {
                this.setState({stationinfo: data.root.stations.station, isLoaded: true})
            })
            .catch(console.log);
        this.loadRouteDetails();
    }

    loadRouteDetails() {
        if (this.state.isLoaded && this.state.stationinfo) {
            //get the north routes
            let nroutes = this.state.stationinfo.north_routes.route;
            let routes = ls.get('routesdata');
            let data = [];
            for (let i = 0; i < nroutes.length; i++) {
                let found = routes.filter(function (r) {
                    return r.routeID === nroutes[i];
                });
                data.push(found);
            }
            this.setState({northroutes: data});

            let sroutes = this.state.stationinfo.south_routes.route;
            data = [];
            for (let i = 0; i < sroutes.length; i++) {
                let found = routes.filter(function (r) {
                    return r.routeID === sroutes[i];
                });
                data.push(found);
            }
            this.setState({southroutes: data});
        }
    }

    componentDidMount() {
        this.loadData("12th");
        this.loadRouteDetails();
    }

    render() {
        return (
            this.state.isLoaded && this.state.stationinfo ?
                <div className="card text-center  border border-dark">
                    <div className="card-header  border border-dark">
                        <h1>Station Information</h1>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title"><u>{this.state.stationinfo.name}</u></h5>
                        <p className="card-text">{this.state.stationinfo.intro["#cdata-section"]}</p>

                        <div className="card-group  border border-dark">
                            <div className="card">
                                <ul className="list-group">
                                    <li className="list-group-item bg-info">
                                        <h3>North Routes</h3>
                                        <h5>Platform - {this.state.stationinfo.north_platforms.platform[0]}</h5>
                                    </li>
                                    {this.state.northroutes.map((data, index) => {
                                        return <li className="list-group-item list-group-item-danger"
                                                   key={data[0].number}>{data[0].name}</li>
                                    })}
                                </ul>
                            </div>
                            <br/>
                            <div className="card">
                                <ul className="list-group">
                                    <li className="list-group-item bg-info">
                                        <h3>South Routes</h3>
                                        <h5>Platform - {this.state.stationinfo.south_platforms.platform[0]}</h5>
                                    </li>
                                    {this.state.southroutes.map((data, index) => {
                                        return <li className="list-group-item list-group-item-warning"
                                                   key={data[0].number}>{data[0].name}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <RealTimeSchedule ref={(schlinfo) => {this.schlinfo = schlinfo}} stationcode={this.state.stationcode}/>
                        <br/>
                        <a href={this.state.stationinfo.link["#cdata-section"]} className="btn btn-primary">Go to Bart
                            station page</a>
                    </div>
                    <div className="card-footer text-muted  border border-dark">
                        address:
                        <a href={"http://www.google.com/maps/place/" + this.state.stationinfo.gtfs_latitude + "," + this.state.stationinfo}>{this.state.stationinfo.address},{this.state.stationinfo.city},{this.state.stationinfo.state},{this.state.stationinfo.zipcode}</a>
                    </div>
                </div>
                :
                <div className="col-sm">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
        );
    }
}

export default StationInfo;
