import api from './financetracker-api.service';

export default class CurrencyService {    
    static fetchCurrencies = () => {
        const url = '/currency/GetListOfCurrencies';
        return api.get(url);
    }
}