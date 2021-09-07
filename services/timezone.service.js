import api from './financetracker-api.service';


export default class TimeZoneService {    
    static fetchTimezones = () => {
        const url = '/financetracker/GetListOfTimeZone'; 
        return api.get(url);
    }
}