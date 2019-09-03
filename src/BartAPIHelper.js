import {Component} from 'react';

class BartAPIHelper extends Component {
    static API_KEY = "ZHMV-5R5H-9IKT-DWE9";
    static BASE_URL = "http://api.bart.gov/api/";
    static ROUTES_PARAMS = "route.aspx?cmd=routes&json=y";
    static STATIONS_PARAMS = "stn.aspx?cmd=stns&json=y";

    static getRoutesAPIURL() {
        return BartAPIHelper.BASE_URL + BartAPIHelper.ROUTES_PARAMS + "&key=" + BartAPIHelper.API_KEY;
    }

    static getStationsAPIURL() {
        return BartAPIHelper.BASE_URL + BartAPIHelper.STATIONS_PARAMS + "&key=" + BartAPIHelper.API_KEY;
    }

    render() {
        return null;
    }
}

export default BartAPIHelper;
