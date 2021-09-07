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

const SignInScreen = ({navigation}) => {
    const {state, signIn} = React.useContext(AuthContext);

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isPasswordValid: false,
        isEmailValid: false,
    });

    const { colors } = useTheme();

    const isFormValid = () => {
        return data.isEmailValid && data.isPasswordValid;
    }

    const passwordChanged = (val) => {
        setData({
            ...data,
            password: val,
            isPasswordValid: val.trim().length >= 8
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const emailChanged = (val) => {      
        setData({
            ...data,
            email: val,
            isEmailValid: validator.isEmail(val)
        });
    }

    const handleSignIn = () => {
        const model = { Email: data.email, Password: data.password };
        signIn(model)
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
                marginTop: 20
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#47126b"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => passwordChanged(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.password && !data.isPasswordValid ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                </Animatable.View> : null
            }

            <TouchableOpacity>
                <Text style={{color: '#571089', marginTop:10}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.logIn}
                    onPress={() => {isFormValid() && handleSignIn()}}
                >
                <LinearGradient
                    colors={isFormValid() ? ['#571089', '#571089'] : ['#e5e5e5', '#e5e5e5']}
                    style={styles.logIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Log In</Text>
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
                    Don't you have an account yet? 
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text style={styles.signUp_link}>
                        Create an account
                    </Text>
                </TouchableOpacity>
            </View>
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
        paddingVertical: 150
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
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
    logIn: {
        width: '100%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    line: {
        height: 1,
        width: 130,
        backgroundColor: '#a5a5a5'
    },
    view_line: {        
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    view_signUp: {        
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 20,
    },
    signUp_text: {
        color: '#a5a5a5',
        fontWeight: 'bold',
        marginRight: 7
    },
    signUp_link: {
        color: '#571089'
    }
  });
