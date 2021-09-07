import React, { useEffect } from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { AsyncStoragePicker } from '../components/picker.component';

import {currencies} from '../data/currency.data';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../contexts/auth.context';

const validator = require('validator');

const SignInScreen = ({navigation}) => {    
  const {state, signUp} = React.useContext(AuthContext);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    const [data, setData] = React.useState({
        email: '',
        password: '',
        fullName: '',
        confirm_password: '',
        currency: '',
        timeZone: '',
        isEmailValid: false,
        isFullNameValid: false,
        passwordsEqual: false,
        isPasswordRuleMatched: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const isFormValid = () => {
        return data.isEmailValid
        && data.passwordsEqual
        && data.isFullNameValid
        && data.isPasswordRuleMatched;
    }

    const emailChanged = (val) => { 
        setData({
            ...data,
            email: val,
            isEmailValid: validator.isEmail(val)
        });
    }

    const fullNameChanged = (val) => { 
        setData({
            ...data,
            fullName: val,
            isFullNameValid: val.length >= 4
        });
    }

    const currencyChanged = (val) => {
        setData({
            ...data,
            currency: val
        });
    }

    const timeZoneChanged = (val) => {
        setData({
            ...data,
            timeZone: val
        });
    }

    const passwordChanged = (val) => {
        setData({
            ...data,
            password: val,
            passwordsEqual: val === data.confirm_password,
            isPasswordRuleMatched: passwordRegex.test(val)
        });
    }

    const confirmPasswordChanged = (val) => {
        setData({
            ...data,
            confirm_password: val,
            passwordsEqual: val === data.password
        });
    }

    const hidePassword = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const hidePasswordConfirmation = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const handleSignUp = () => {
        const model = {
            FullName: data.fullName,
            Email: data.email,
            CurrencyId: data.currency,
            StateTimeZoneId: data.timeZone,
            CreatedDate: new Date(),
            Password: data.password
        };
        signUp(model, () => { navigation.navigate('SignInScreen'); });
    }
    
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#571089' barStyle="light-content"/>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.label_input}>E-mail</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="envelope-o"
                    color="#47126b"
                    size={18}
                />
                <TextInput 
                    placeholder="Your E-mail"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => emailChanged(val)}
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
            
            <Text style={[styles.label_input, {
                marginTop: 10
            }]}>Full Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#47126b"
                    size={18}
                />
                <TextInput 
                    placeholder="Your Full Name"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="sentences"
                    onChangeText={(val) => fullNameChanged(val)}
                />
            </View>
            { data.fullName && !data.isFullNameValid ? 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Full Name must be at least 4 characters long.</Text>
            </Animatable.View> : null
            }
            <Text style={[styles.label_input, {
                marginTop: 10
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#47126b"
                    size={18}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => passwordChanged(val)}
                />
                <TouchableOpacity
                    onPress={hidePassword}>
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={18}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={18}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.password && !data.isPasswordRuleMatched ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>
                        Password should be at least 8 characters long, contain upper and lower cased letter and a number.
                    </Text>
                </Animatable.View> : null
            }

            <Text style={[styles.label_input, {
                marginTop: 10
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#47126b"
                    size={18}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => confirmPasswordChanged(val)}
                />
                <TouchableOpacity
                    onPress={hidePasswordConfirmation}>
                    {data.confirm_secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={18}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={18}
                    />
                    }
                </TouchableOpacity>
            </View>
            { (data.confirm_password || data.password) && !data.passwordsEqual ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Password should match password confirmation.</Text>
                </Animatable.View> : null
            }
            <Text style={[styles.label_input, {
                marginTop: 10
            }]}>Currency</Text>
            <View style={styles.action}>                
                <AsyncStoragePicker
                    storageKey={'currenciesAvailable'}
                    onPickerChange={currencyChanged}
                ></AsyncStoragePicker>
            </View>         
            <Text style={[styles.label_input, {
                marginTop: 10
            }]}>Time Zone</Text>
            <View style={styles.action}>                
                <AsyncStoragePicker
                    storageKey={'timezonesAvailable'}
                    onPickerChange={timeZoneChanged}
                ></AsyncStoragePicker>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    
                    style={styles.signUp}
                    onPress={() => {isFormValid() && handleSignUp()}}
                >
                <LinearGradient
                    colors={isFormValid() ? ['#571089', '#571089'] : ['#e5e5e5', '#e5e5e5']}
                    style={styles.signUp}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Submit</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
            <View
                style={styles.view_line}>
                <View style={styles.line}></View>
                <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>OR</Text>
                <View style={styles.line}></View>
            </View>
            <View
                style={styles.view_signUp}>
                <Text style={styles.signUp_text}>
                    Already on SpendWise? 
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                    <Text style={styles.signUp_link}>
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    footer: {
        flex: Platform.OS === 'ios' ? 10 : 12,
        backgroundColor: '#fff',
        alignContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 70
    },
    text_header: {
        color: '#571089',
        fontWeight: 'bold',
        fontSize: 22
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
        paddingLeft: 10,
        color: '#47126b',
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signUp: {
        width: '100%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    line: {
        height: 1,
        width: 130,
        backgroundColor: '#a5a5a5'
    },
    view_line: {        
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    view_signUp: {        
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 15,
    },
    signUp_text: {
        color: '#a5a5a5',
        fontWeight: 'bold',
        marginRight: 7
    },
    signUp_link: {
        color: '#571089'
    },
    view_picker: {
        flex: 1,
      width: '100%'
    },
    picker_component: {
      width: 350
    },
    selected_text: {
      fontWeight: 'bold',
      fontSize: 20,
      padding: 10
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
  });
