import React, {Component} from 'react';

class RealTimeSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {schinfo: [], isLoaded: false};
    }

    render() {
        return (
            this.state.isLoaded && this.state.schinfo ?
                <div>
                    <div> Live Schedule for {this.state.schinfo[0].name} </div>
                    <div>
                        <ul>
                            <p>Destination: {this.state.schinfo[0].etd[0].destination}</p>
                            {this.state.schinfo[0].etd[0].estimate.map((data, index) => {
                                return <li key={index}>{data.length} car leaves in  {data.minutes} mins</li>
                            })}
                        </ul>
                    </div>
                </div>
                :
                <div>Schedule not available</div>
        );
    }

    updateSchedule(stncode) {
        fetch('http://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + stncode + '&key=MW9S-E7SL-26DU-VV8V&json=y')
            .then(res => res.json())
            .then((data) => {
                this.setState({schinfo: data.root.station, isLoaded: true})
            })
            .catch(console.log);
    }

    componentDidMount() {
        console.log(this.props.stationcode);
        fetch('http://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + this.props.stationcode + '&key=MW9S-E7SL-26DU-VV8V&json=y')
            .then(res => res.json())
            .then((data) => {
                this.setState({schinfo: data.root.station, isLoaded: true})
            })
            .catch(console.log);
        //this.interval = setInterval(() => this.updateSchedule(this.props.stationcode), 60000);
    }

    componentWillUnmount() {
        //clearInterval(this.interval);
    }
}

export default RealTimeSchedule;