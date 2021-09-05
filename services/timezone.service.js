import api from './financetracker-api.service';
import TimeZone from '../models/timezone.model';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class TimeZoneService {
    static timeZoneServiceInstance = null;
    static getInstance() {
        if (TimeZoneService.timeZoneServiceInstance == null) {
            TimeZoneService.timeZoneServiceInstance = new TimeZoneService();
        }
        return this.timeZoneServiceInstance;
    }

    populateTimezones = async() => {
        await AsyncStorage.getItem('timezonesAvailable')
        .then((value) => {
            if (value === null) {
                const url = '/financetracker/GetListOfTimeZone';
                return api.get(url)
                    .then(response => {
                        if (response.status === 200) {
                            var allTimeZones = response.data.map((item, index) => {
                                return(
                                    { value: item.id, label: item.description }
                                )
                            });
                            console.log(allTimeZones);
                            AsyncStorage.setItem('timezonesAvailable', JSON.stringify(allTimeZones));
                        }
                    })
                    .catch(error => console.log(error));
            }
        });
    }
}