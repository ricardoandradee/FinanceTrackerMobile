import api from './financetracker-api.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CurrencyService {
    static currencyServiceInstance = null;
    static getInstance() {
        if (CurrencyService.currencyServiceInstance == null) {
            CurrencyService.currencyServiceInstance = new CurrencyService();
        }
        return this.currencyServiceInstance;
    }

    populateCurrencies = async() => {    
        await AsyncStorage.getItem('currenciesAvailable')
        .then((value) => {
            if (value === null) {
                const url = '/currency/GetListOfCurrencies';
                return api.get(url)
                    .then(response => {
                        if (response.status === 200) {
                            var allCurrencies = response.data.map((item, index) => {
                                return(
                                    { value: item.id, label: item.code }
                                )
                            });
                            console.log(allCurrencies);
                            AsyncStorage.setItem('currenciesAvailable', JSON.stringify(allCurrencies)); 
                        }
                    })
                    .catch(error => console.log(error));
            }
        });
    }
}