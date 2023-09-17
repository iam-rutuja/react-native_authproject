import React, { useState } from 'react'
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import Colors from '../../constants/Colors'


const Login = ({ navigation }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const { email, password } = values;
    const handleChange = (value, name) => {
        setValues({ ...values, [name]: value })
    }
    const clickSubmit = () => {

        axios({
            method: 'POST',
            url: `http://10.0.2.2:5000/api/signin`,
            data: { email, password }
        }).then(async (res) => {
            await AsyncStorage.setItem('token', res.data.token)
            navigation.replace('ApiList')
            Alert.alert(res.data.message)
            setValues({ ...values, name: '', email: '', password: '' })

        }).catch((error) => {
            console.log('Login ERROR', error)
             Alert.alert(error.response.data.error)
            setValues({ ...values })
        })

    }
    return (
        <KeyboardAwareScrollView>
            <SafeAreaView>
                <View
                    style={{
                        padding: Spacing * 2,
                    }}
                >

                    <View
                        style={{
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                color: Colors.primary,
                                fontWeight: 'bold',
                                marginVertical: Spacing * 3,
                            }}
                        >
                            Login page
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                color: Colors.text,
                                maxWidth: "60%",
                                textAlign: "center"

                            }}
                        >
                            Welcome to Login Page
                        </Text>
                    </View>


                    <View
                        style={{
                            marginVertical: Spacing * 3,
                        }}
                    >
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor={Colors.darkText}
                            onChangeText={value => handleChange(value, "email")}
                            value={email}
                            style={{
                                fontSize: FontSize.small,
                                padding: Spacing * 1.5,
                                backgroundColor: Colors.lightPrimary,
                                borderRadius: Spacing,
                                marginVertical: Spacing
                            }}
                        />
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor={Colors.darkText}
                            onChangeText={value => handleChange(value, "password")}
                            value={password}
                            secureTextEntry
                            style={{
                                fontSize: FontSize.small,
                                padding: Spacing * 1.5,
                                backgroundColor: Colors.lightPrimary,
                                borderRadius: Spacing,
                                marginVertical: Spacing
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        style={{
                            padding: Spacing * 1.5,
                            backgroundColor: Colors.primary,
                            marginVertical: Spacing * 3,
                            borderRadius: Spacing,
                        }}
                    >
                        <Text
                            onPress={clickSubmit}
                            style={{
                                fontWeight: 800,
                                textAlign: "center",
                                color: Colors.onPrimary,
                                fontSize: FontSize.large
                            }}>
                            Sign in
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => navigation.replace('Signup')}
                        style={{
                            padding: Spacing,
                        }}>
                        <Text
                            style={{
                                color: Colors.text,
                                fontSize: FontSize.small,
                                textAlign: "center"
                            }}
                        >Create new account</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default Login