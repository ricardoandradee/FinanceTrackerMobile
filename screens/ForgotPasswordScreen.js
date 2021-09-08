import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../contexts/auth.context';
const validator = require('validator');

const ForgotPasswordScreen = ({navigation}) => {
    const {state, sendPasswordResetEmail} = React.useContext(AuthContext);

    const [data, setData] = React.useState({
        email: '',
        isEmailValid: false
    });

    const { colors } = useTheme();

    const isFormValid = () => {
        return data.isEmailValid && data.isPasswordValid;
    }

    const emailChanged = (email) => {      
        setData({
            ...data,
            email: email,
            isEmailValid: validator.isEmail(email)
        });
    }

    const handlePasswordReset = (email) => {
        sendPasswordResetEmail(email, () => { navigation.navigate('SignInScreen'); });
    }

    return (
      <View style={styles.container}>
      <StatusBar backgroundColor='#571089' barStyle="light-content"/>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
        <Text style={styles.label_input}>E-mail</Text>
        <View style={styles.action}>
            <FontAwesome 
                name="envelope-o"
                color="#47126b"
                size={20}
            />
            <TextInput 
                placeholder="E-mail"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(email) => emailChanged(email)}
            />
            {data.email && data.isEmailValid ? 
            <Animatable.View
                animation="bounceIn"
            >
                <Feather 
                    name="check-circle"
                    color="green"
                    size={18}
                />
            </Animatable.View>
            : null}
        </View>
        { data.email && !data.isEmailValid ?
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Email address is not valid.</Text>
            </Animatable.View> : null
        }
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.submit}
                    onPress={() => {data.isEmailValid && handlePasswordReset(data.email)}}
                >
                <LinearGradient
                    colors={data.isEmailValid ? ['#571089', '#571089'] : ['#e5e5e5', '#e5e5e5']}
                    style={styles.submit}
                >
                    <Text style={[styles.textSubmit, {
                        color:'#fff'
                    }]}>Submit</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    footer: {
        flex: Platform.OS === 'ios' ? 10 : 12,
        backgroundColor: '#fff',
        alignContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 150
    },
    label_input: {
        color: '#47126b',
        fontSize: 14
    },
    action: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#47126b',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    submit: {
        width: '100%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSubmit: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
