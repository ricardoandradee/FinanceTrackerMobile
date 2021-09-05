import api from './financetracker-api.service';

export default class AuthService {
    static authServiceInstance = null;
    static getInstance() {
        if (AuthService.authServiceInstance == null) {
            AuthService.authServiceInstance = new AuthService();
        }
        return this.authServiceInstance;
    }

    signIn(model) {
        return api.post('/auth/login', model);
    }

    signUp(model) {
        return api.post('/auth/register', model);
    }
}