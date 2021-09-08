import api from './financetracker-api.service';

export default class AuthService {     
    static signIn = (model) => {
        const url = '/auth/login'; 
        return api.post(url, model);
    }

    static signUp = (model) => {
        const url = '/auth/register'; 
        return api.post(url, model);
    }

    static sendPasswordResetEmail = (email) => {
        const url = `/auth/sendpasswordresetemail?email=${email}`; 
        return api.get(url);
    }
}