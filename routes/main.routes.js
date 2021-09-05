import React from 'react';
import {AuthContext} from '../contexts/auth.context';
import { Text, StyleSheet } from 'react-native';

import AuthStackScreen from '../screens/AuthStackScreen';

const Routes = () => {
    const { state } = React.useContext(AuthContext);
    return state.userToken !== null ?
            <Text style={styles.content}>You are Logged In!</Text> :
            <AuthStackScreen/>;
};

const styles = StyleSheet.create({
    content: {
        fontFamily: 'Ubuntu-Light',
        fontWeight: '300'
    }
  });

export default Routes;