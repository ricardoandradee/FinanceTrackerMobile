import createDataContext from './create.data.context';

import { Alert } from 'react-native';

import AuthService from '../services/auth.service';

const authReducer = (state, action) => {
    switch(action.type) {
      case 'SIGNIN': 
        return {
          ...state,
          email: action.id,
          userToken: action.token,
        };
      case 'SIGNOUT': 
        return {
          ...state,
          email: null,
          userToken: null,
        };
        default:
          return state;
    }
};

const signUp = dispatch => {
  return (model, callback) => {
    AuthService.signUp(model).then((response) => {
        if (response.status === 200) {
            const data = response.data;
            if (data.ok) {
                Alert.alert('Success!', data.data, [{text: 'Okay'}]);
                callback();
            } else {
                Alert.alert('Error!', data.message, [{text: 'Okay'}]);
            }
        } else {
            Alert.alert('Server error!', 'An error occured while registering user, please try again later!', [
                {text: 'Okay'}
            ]);
        }
    });
  };
};

const signIn = dispatch => {
  return (model) => {    
    AuthService.signIn(model).then((response) => {
        if (response.status === 200) {
            const data = response.data;
            if (data.user.ok) {                
                const userToken = String(data.token);
                const email = data.user.data.email; 
                // AsyncStorage.setItem('userToken', userToken);
                dispatch({
                    type: 'SIGNIN',
                    payload: {
                        token: userToken,
                        email,
                    },
                });
            } else {
                Alert.alert('Invalid credentials!', data.user.message, [
                    {text: 'Okay'}
                ]);
            }
        } else {
            Alert.alert('Server error!', 'An error occured while signing in user, please try again later!', [
                {text: 'Okay'}
            ]);
        }
    });
  };
};

const signOut = dispatch => {
  return () => {
    //   AsyncStorage.removeItem('userToken');
    dispatch({ type: 'SIGNOUT' });
  };
};

export const {AuthProvider, AuthContext} = createDataContext(
  authReducer,
  {signIn, signOut, signUp},
  { userToken: null, email: '' },
);